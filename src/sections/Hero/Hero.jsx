import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Hero.module.css';

export default function Hero() {
  const revealRef = useScrollReveal();

  return (
    <section className={styles.hero}>
      <div className="container">
        <p className={styles.eyebrow}># CHANGELOG</p>

        <div ref={revealRef} className={`reveal ${styles.entry}`}>
          <h1 className={styles.heading}>
            <span className={styles.hash}>##</span> Unreleased — Matheus Hang
          </h1>
          <p className={styles.role}>Desenvolvedor Front-end em formação</p>
          <p className={styles.summary}>
            Construo interfaces com React e Next.js, do protótipo ao deploy — passando por
            testes automatizados, performance e arquitetura de front-end.
            <span className={`${styles.blinkCursor} blinkCursor`} aria-hidden="true" />
          </p>

          <div className={styles.ctas}>
            <a href="#projetos" className={styles.primaryCta}>
              ver projetos →
            </a>
            <a href="#contato" className={styles.secondaryCta}>
              entrar em contato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
