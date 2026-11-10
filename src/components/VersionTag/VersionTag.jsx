import styles from './VersionTag.module.css';

/**
 * Etiqueta numerada no estilo "git tag", elemento de assinatura visual
 * do portfólio. Reutilizada nos cards de projeto e na página de detalhe.
 */
export default function VersionTag({ version }) {
  return <span className={styles.tag}>{version}</span>;
}
