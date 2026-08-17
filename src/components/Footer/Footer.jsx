import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p className={styles.line}>
          <span className={styles.prompt}>$</span> build --react --vite · deploy: vercel · © {year} Matheus Hang
        </p>
      </div>
    </footer>
  );
}
