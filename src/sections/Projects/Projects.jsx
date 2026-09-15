import { projects } from '../../data/projects';
import ProjectEntry from '../../components/ProjectEntry/ProjectEntry';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Projects.module.css';

export default function Projects() {
  const revealRef = useScrollReveal();

  return (
    <section id="projetos" className={styles.projects}>
      <div className="container">
        <p className={styles.label}>// projetos</p>
        <h2 className={styles.heading}>Histórico de versões</h2>
        <p className={styles.intro}>
          Cada projeto abaixo é tratado como uma versão lançada, ordenada pela progressão
          técnica do curso — da arquitetura mais avançada aos fundamentos.
        </p>

        <div ref={revealRef} className="reveal">
          {projects.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
