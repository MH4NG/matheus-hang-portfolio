import styles from './SkillBadge.module.css';

export default function SkillBadge({ name }) {
  return <li className={styles.badge}>{name}</li>;
}
