import { Link, useLocation } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className={styles.notFound}>
      <title>Rota não encontrada — Matheus Hang</title>

      <div className="container">
        <p className={styles.label}>// 404</p>

        <pre className={styles.terminal}>
          <code>
            <span className={styles.prompt}>$</span> git show HEAD:{pathname}
            {'\n'}
            <span className={styles.fatal}>
              fatal: path &apos;{pathname}&apos; does not exist in &apos;HEAD&apos;
            </span>
          </code>
        </pre>

        <h1 className={styles.heading}>Rota não encontrada</h1>
        <p className={styles.summary}>
          Essa página não faz parte do portfólio — o link pode estar desatualizado ou
          ter sido digitado errado.
        </p>

        <div className={styles.ctas}>
          <Link to="/" className={styles.primaryCta}>
            voltar para a home →
          </Link>
          <Link to="/#projetos" className={styles.secondaryCta}>
            ver projetos
          </Link>
        </div>
      </div>
    </section>
  );
}
