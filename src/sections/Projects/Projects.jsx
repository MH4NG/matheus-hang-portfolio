import { projects } from '../../data/projects';
import ProjectEntry from '../../components/ProjectEntry/ProjectEntry';
import { useStaggerReveal } from '../../hooks/useStaggerReveal';
import styles from './Projects.module.css';

export default function Projects() {
  const staggerRef = useStaggerReveal();

  return (
    <section id="projetos" className={styles.projects}>
      <div className="container">
        <p className={styles.label}>// projetos</p>
        <h2 className={styles.heading}>Projetos em destaque</h2>
        <p className={styles.intro}>
          Cada projeto abaixo é independente, com objetivo e stack próprios. A ordem segue
          a progressão técnica — da arquitetura mais avançada aos fundamentos.
        </p>

        {/* Cada entrada se revela ao entrar na viewport, em vez de a lista
            inteira animar de uma vez quando o topo aparece. */}
        <div ref={staggerRef}>
          {projects.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
