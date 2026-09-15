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

        {/* A pontuação de JSON é decoração visual: aria-hidden evita que o
            leitor de tela leia "abre chave", "abre colchete" a cada grupo.
            O nome da categoria vive dentro dessa pontuação, então ele é
            preservado como nome acessível da lista. */}
        <div ref={revealRef} className={`reveal ${styles.panel}`}>
          <p className={styles.panelLine} aria-hidden="true">
            {'{'}
          </p>
          {skillGroups.map((group) => (
            <div key={group.category} className={styles.group}>
              <p className={styles.groupLabel} aria-hidden="true">
                &quot;{group.label}&quot;: [
              </p>
              <ul className={styles.badgeList} aria-label={group.label}>
                {group.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </ul>
              <p className={styles.groupLabel} aria-hidden="true">
                ],
              </p>
            </div>
          ))}
          <p className={styles.panelLine} aria-hidden="true">
            {'}'}
          </p>
        </div>
      </div>
    </section>
  );
}
