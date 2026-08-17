import { Link } from 'react-router-dom';
import VersionTag from '../VersionTag/VersionTag';
import styles from './ProjectEntry.module.css';

export default function ProjectEntry({ project }) {
  const { slug, version, name, date, tagline, description, tech, added, fixed, repoUrl, demoUrl, image } =
    project;

  return (
    <article className={styles.entry}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <VersionTag version={version} />
          <h3 className={styles.name}>{name}</h3>
        </div>
        <span className={styles.date}>{date}</span>
      </header>

      <p className={styles.tagline}>{tagline}</p>

      {image && (
        <Link to={`/projetos/${slug}`} className={styles.coverLink}>
          <img
            src={image}
            alt={`Captura de tela de ${name}`}
            className={styles.cover}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.closest('a').style.display = 'none';
            }}
          />
        </Link>
      )}

      <p className={styles.description}>{description}</p>

      <ul className={styles.techList} aria-label="Tecnologias usadas">
        {tech.map((item) => (
          <li key={item} className={styles.techItem}>
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.diff}>
        <p className={styles.diffTitle}>Added</p>
        <ul>
          {added.map((item) => (
            <li key={item} className={styles.added}>
              <span className={styles.diffMark}>+</span> {item}
            </li>
          ))}
        </ul>

        {fixed?.length > 0 && (
          <>
            <p className={styles.diffTitle}>Fixed</p>
            <ul>
              {fixed.map((item) => (
                <li key={item} className={styles.fixed}>
                  <span className={styles.diffMark}>−</span> {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <footer className={styles.actions}>
        <Link to={`/projetos/${slug}`} className={styles.detailsLink}>
          Ver detalhes →
        </Link>
        <span className={styles.externalLinks}>
          <a href={repoUrl} target="_blank" rel="noreferrer">
            repositório
          </a>
          {demoUrl && demoUrl !== '#' && (
            <a href={demoUrl} target="_blank" rel="noreferrer">
              demo
            </a>
          )}
        </span>
      </footer>
    </article>
  );
}
