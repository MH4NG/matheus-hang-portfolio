import { useState } from 'react';
import styles from './ContactForm.module.css';

const INITIAL_STATE = { name: '', email: '', message: '' };

const CONTACT_EMAIL = 'matheush4ng@gmail.com';

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

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">nome</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">mensagem</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
        />
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>

      <button type="submit" className={styles.submit}>
        enviar mensagem →
      </button>

      {sent && <p className={styles.success}>Abrindo seu cliente de e-mail…</p>}
    </form>
  );
}
