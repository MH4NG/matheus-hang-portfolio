import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';
import VersionTag from '../components/VersionTag/VersionTag';
import NotFound from './NotFound';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  // Slug inexistente: a rota casa, mas o projeto não existe. Mostra o 404
  // em vez de redirecionar em silêncio para a home.
  if (!project) {
    return <NotFound />;
  }

  const { version, name, date, tagline, longDescription, tech, added, fixed, repoUrl, demoUrl, screenshots } =
    project;

  return (
    <article className={styles.detail}>
      {/* React 19 iça <title>/<meta> para o <head> sem biblioteca externa */}
      <title>{`${name} ${version} — Matheus Hang`}</title>
      <meta name="description" content={tagline} />

      <div className="container">
        <Link to="/#projetos" className={styles.back}>
          ← voltar para /projetos
        </Link>

        <header className={styles.header}>
          <div className={styles.titleRow}>
            <VersionTag version={version} />
            <span className={styles.date}>{date}</span>
          </div>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.tagline}>{tagline}</p>
        </header>

        <p className={styles.longDescription}>{longDescription}</p>

        <ul className={styles.techList}>
          {tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className={styles.diff}>
          <p className={styles.diffTitle}>Added</p>
          <ul>
            {added.map((item) => (
              <li key={item} className={styles.added}>
                <span>+</span> {item}
              </li>
            ))}
          </ul>

          {fixed?.length > 0 && (
            <>
              <p className={styles.diffTitle}>Fixed</p>
              <ul>
                {fixed.map((item) => (
                  <li key={item} className={styles.fixed}>
                    <span>−</span> {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {screenshots.length > 0 && (
          <div className={styles.screenshots}>
            {screenshots.map((src) => (
              <img key={src} src={src} alt={`Captura de tela de ${name}`} loading="lazy" />
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <a href={repoUrl} target="_blank" rel="noreferrer" className={styles.primaryCta}>
            ver repositório →
          </a>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noreferrer" className={styles.secondaryCta}>
              ver demonstração
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
