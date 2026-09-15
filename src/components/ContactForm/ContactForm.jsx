import { useState } from 'react';
import styles from './ContactForm.module.css';

const INITIAL_STATE = { name: '', email: '', message: '' };

const CONTACT_EMAIL = 'matheush4ng@gmail.com';

// mailto: tem limite prático de tamanho de URL; acima disso alguns
// clientes truncam a mensagem em silêncio.
const MAX_MESSAGE = 1200;

/**
 * Formulário de contato controlado, sem backend próprio: ao enviar,
 * monta um link "mailto:" com os dados preenchidos e abre o cliente
 * de e-mail do visitante. Caso queira receber as mensagens direto em
 * um servidor, dá para trocar o handleSubmit por uma chamada a um
 * serviço gratuito como Formspree ou EmailJS.
 */
export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpa o erro do campo enquanto o visitante corrige, em vez de
    // deixá-lo na tela até o próximo submit.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Informe seu nome.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    if (!form.message.trim()) nextErrors.message = 'Escreva uma mensagem.';
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Contato via portfólio — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setSent(true);
    setForm(INITIAL_STATE);
  }

  /** Atributos de acessibilidade compartilhados pelos três campos. */
  function fieldProps(name) {
    return {
      id: name,
      name,
      value: form[name],
      onChange: handleChange,
      'aria-invalid': errors[name] ? true : undefined,
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
    };
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">nome</label>
        <input type="text" autoComplete="name" {...fieldProps('name')} />
        {errors.name && (
          <span id="name-error" className={styles.error} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">email</label>
        <input type="email" autoComplete="email" {...fieldProps('email')} />
        {errors.email && (
          <span id="email-error" className={styles.error} role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">mensagem</label>
        <textarea rows={5} maxLength={MAX_MESSAGE} {...fieldProps('message')} />
        {errors.message && (
          <span id="message-error" className={styles.error} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <button type="submit" className={styles.submit}>
        enviar mensagem →
      </button>

      {/* aria-live para o leitor de tela anunciar o resultado. O endereço
          aparece como alternativa: se o visitante não tiver cliente de
          e-mail configurado, o mailto: não abre nada e a mensagem sozinha
          seria enganosa. */}
      <p className={styles.success} role="status" aria-live="polite">
        {sent ? (
          <>
            Abrindo seu cliente de e-mail… Se nada acontecer, escreva direto para{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </>
        ) : (
          ''
        )}
      </p>
    </form>
  );
}
