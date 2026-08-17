import { skillGroups } from '../../data/skills';
import SkillBadge from '../../components/SkillBadge/SkillBadge';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Skills.module.css';

export default function Skills() {
  const revealRef = useScrollReveal();

  return (
    <section id="habilidades" className={styles.skills}>
      <div className="container">
        <p className={styles.label}>// habilidades</p>
        <h2 className={styles.heading}>package.json</h2>

        <div ref={revealRef} className={`reveal ${styles.panel}`}>
          <p className={styles.panelLine}>{'{'}</p>
          {skillGroups.map((group) => (
            <div key={group.category} className={styles.group}>
              <p className={styles.groupLabel}>&quot;{group.label}&quot;: [</p>
              <ul className={styles.badgeList}>
                {group.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </ul>
              <p className={styles.groupLabel}>],</p>
            </div>
          ))}
          <p className={styles.panelLine}>{'}'}</p>
        </div>
      </div>
    </section>
  );
}
