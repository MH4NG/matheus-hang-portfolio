import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectEntry from './ProjectEntry';

const projectBase = {
  slug: 'projeto-teste',
  version: 'v2.1.0',
  name: 'Projeto de Teste',
  date: 'mai/2026',
  tagline: 'Tagline do projeto',
  description: 'Descrição curta do projeto.',
  tech: ['React', 'Vite'],
  added: ['Primeira funcionalidade', 'Segunda funcionalidade'],
  repoUrl: 'https://github.com/MH4NG/projeto-teste',
  demoUrl: 'https://projeto-teste.vercel.app',
  image: '/images/projects/capa.jpg',
};

/** ProjectEntry usa <Link>, então precisa de um Router em volta. */
function renderEntry(overrides = {}) {
  return render(
    <MemoryRouter>
      <ProjectEntry project={{ ...projectBase, ...overrides }} />
    </MemoryRouter>
  );
}

describe('ProjectEntry', () => {
  it('exibe versão, nome, data e tagline', () => {
    renderEntry();
    expect(screen.getByText('v2.1.0')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Projeto de Teste' })).toBeInTheDocument();
    expect(screen.getByText('mai/2026')).toBeInTheDocument();
    expect(screen.getByText('Tagline do projeto')).toBeInTheDocument();
  });

  it('lista as tecnologias numa lista com nome acessível', () => {
    renderEntry();
    const lista = screen.getByRole('list', { name: 'Tecnologias usadas' });
    expect(lista).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });

  it('marca os itens de "added" com +', () => {
    renderEntry();
    expect(screen.getByText('Added')).toBeInTheDocument();
    expect(screen.getByText(/Primeira funcionalidade/)).toBeInTheDocument();
  });

  it('só mostra a seção "Fixed" quando há correções', () => {
    renderEntry();
    expect(screen.queryByText('Fixed')).not.toBeInTheDocument();

    renderEntry({ fixed: ['Um bug corrigido'] });
    expect(screen.getByText('Fixed')).toBeInTheDocument();
    expect(screen.getByText(/Um bug corrigido/)).toBeInTheDocument();
  });

  it('aponta "Ver detalhes" para a rota do projeto', () => {
    renderEntry();
    expect(screen.getByRole('link', { name: /Ver detalhes/ })).toHaveAttribute(
      'href',
      '/projetos/projeto-teste'
    );
  });

  it('esconde o link de demo quando não há demoUrl', () => {
    renderEntry({ demoUrl: null });
    expect(screen.queryByRole('link', { name: 'demo' })).not.toBeInTheDocument();
    // o repositório continua sempre presente
    expect(screen.getByRole('link', { name: 'repositório' })).toBeInTheDocument();
  });

  it('mostra o link de demo quando há demoUrl', () => {
    renderEntry();
    expect(screen.getByRole('link', { name: 'demo' })).toHaveAttribute(
      'href',
      'https://projeto-teste.vercel.app'
    );
  });

  it('dá texto alternativo à capa', () => {
    renderEntry();
    expect(screen.getByAltText('Captura de tela de Projeto de Teste')).toBeInTheDocument();
  });
});
