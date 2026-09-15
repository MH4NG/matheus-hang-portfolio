import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

function enviar() {
  return screen.getByRole('button', { name: /enviar mensagem/i });
}

/**
 * O componente navega via `window.location.href = 'mailto:…'`, que o jsdom
 * não implementa. Interceptamos a atribuição para não poluir a saída com
 * "Not implemented: navigation" — e para poder afirmar o que foi montado.
 * ContactForm não usa o router, então substituir location aqui é seguro.
 */
const locationOriginal = window.location;
let hrefAtribuido;

beforeEach(() => {
  hrefAtribuido = vi.fn();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      get href() {
        return '';
      },
      set href(valor) {
        hrefAtribuido(valor);
      },
    },
  });
});

afterEach(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: locationOriginal,
  });
});

describe('ContactForm — validação', () => {
  it('acusa os três campos vazios ao enviar', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(enviar());

    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument();
    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument();
    expect(screen.getByText('Escreva uma mensagem.')).toBeInTheDocument();
  });

  it('rejeita e-mail em formato inválido', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('email'), 'nao-e-um-email');
    await user.click(enviar());

    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument();
  });

  it('não acusa erro quando tudo está preenchido corretamente', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('nome'), 'Matheus');
    await user.type(screen.getByLabelText('email'), 'matheus@exemplo.com');
    await user.type(screen.getByLabelText('mensagem'), 'Olá!');
    await user.click(enviar());

    expect(screen.queryByText('Informe seu nome.')).not.toBeInTheDocument();
    expect(screen.queryByText('Informe um e-mail válido.')).not.toBeInTheDocument();
    expect(screen.queryByText('Escreva uma mensagem.')).not.toBeInTheDocument();
  });

  it('monta o mailto com destinatário, assunto e corpo codificados', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('nome'), 'Matheus');
    await user.type(screen.getByLabelText('email'), 'matheus@exemplo.com');
    await user.type(screen.getByLabelText('mensagem'), 'Olá & bom dia');
    await user.click(enviar());

    expect(hrefAtribuido).toHaveBeenCalledTimes(1);
    const url = hrefAtribuido.mock.calls[0][0];

    expect(url).toMatch(/^mailto:matheush4ng@gmail\.com\?/);
    // o "&" da mensagem precisa vir escapado, ou quebraria a query string
    expect(url).toContain(encodeURIComponent('Olá & bom dia'));
    expect(url).toContain(encodeURIComponent('Contato via portfólio — Matheus'));
    expect(url).toContain(encodeURIComponent('matheus@exemplo.com'));
  });

  it('limpa os campos e confirma o envio ao visitante', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('nome'), 'Matheus');
    await user.type(screen.getByLabelText('email'), 'matheus@exemplo.com');
    await user.type(screen.getByLabelText('mensagem'), 'Olá!');
    await user.click(enviar());

    expect(screen.getByLabelText('nome')).toHaveValue('');
    expect(screen.getByLabelText('mensagem')).toHaveValue('');

    // o endereço aparece como alternativa, caso o mailto não abra nada
    expect(screen.getByRole('status')).toHaveTextContent(/Abrindo seu cliente de e-mail/);
    expect(screen.getByRole('link', { name: 'matheush4ng@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:matheush4ng@gmail.com'
    );
  });
});

describe('ContactForm — acessibilidade', () => {
  it('liga cada erro ao seu campo via aria-describedby e aria-invalid', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(enviar());

    const nome = screen.getByLabelText('nome');
    expect(nome).toHaveAttribute('aria-invalid', 'true');

    // o id apontado precisa existir e conter a mensagem
    const erroId = nome.getAttribute('aria-describedby');
    expect(erroId).toBeTruthy();
    expect(document.getElementById(erroId)).toHaveTextContent('Informe seu nome.');
  });

  it('anuncia os erros com role="alert"', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(enviar());

    expect(screen.getAllByRole('alert')).toHaveLength(3);
  });

  it('limpa o erro do campo ao digitar, sem afetar os outros', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(enviar());
    await user.type(screen.getByLabelText('nome'), 'Matheus');

    // o campo corrigido deixa de estar inválido...
    expect(screen.getByLabelText('nome')).not.toHaveAttribute('aria-invalid');
    expect(screen.queryByText('Informe seu nome.')).not.toBeInTheDocument();

    // ...e os que continuam vazios seguem acusados
    expect(screen.getByLabelText('email')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument();
  });

  it('expõe autocomplete em nome e e-mail', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('nome')).toHaveAttribute('autocomplete', 'name');
    expect(screen.getByLabelText('email')).toHaveAttribute('autocomplete', 'email');
  });

  it('mantém uma região aria-live no DOM antes de haver mensagem', () => {
    // Se a região só aparecesse junto com o texto, o leitor de tela
    // não anunciaria a mudança.
    render(<ContactForm />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
