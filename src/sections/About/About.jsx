import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './About.module.css';

export default function About() {
  const revealRef = useScrollReveal();

  return (
    <section id="sobre" className={styles.about}>
      <div className="container">
        <p className={styles.label}>// sobre</p>

        <div ref={revealRef} className={`reveal ${styles.content}`}>
          <div className={styles.photoFrame}>
            <img
              src="/images/profile/foto.jpg"
              alt="Foto de perfil de Matheus Hang"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div className={styles.text}>
            {/* TODO (Hang): personalizar o texto de apresentação */}
            <p>
              Sou estudante de desenvolvimento front end web, estou construíndo este portfólio como projeto
              final do curso. Ao longo da minha formação, passei por projetos que vão de fundamentos
              de React e TypeScript até arquitetura de micro frontends, PWAs offline-first e
              pipelines de CI/CD — sempre documentando o processo e testando na prática cada
              conceito aprendido.
            </p>
            <p>
              Gosto de entender o "porquê" por trás de cada ferramenta antes de usá-la, e de
              deixar isso registrado em código limpo e bem organizado.
            </p>

            <ul className={styles.contactList}>
              <li>
                <span>email</span>
                <a href="mailto:matheush4ng@gmail.com">matheush4ng@gmail.com</a>
              </li>
              <li>
                <span>github</span>
                <a href="https://github.com/MH4NG" target="_blank" rel="noreferrer">
                  github.com/MH4NG
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
