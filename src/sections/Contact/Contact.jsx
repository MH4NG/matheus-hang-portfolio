import ContactForm from '../../components/ContactForm/ContactForm';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
  const revealRef = useScrollReveal();

  return (
    <section id="contato" className={styles.contact}>
      <div className="container">
        <p className={styles.label}>// contato</p>
        <h2 className={styles.heading}>
          <span className={styles.prompt}>$</span> contato --enviar-mensagem
        </h2>
        <p className={styles.intro}>
          Aberto a oportunidades, projetos e conversas sobre desenvolvimento front-end.
        </p>

        <div ref={revealRef} className="reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
