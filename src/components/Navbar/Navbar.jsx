import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const LINKS = [
  { href: '/#sobre', label: '/sobre' },
  { href: '/#projetos', label: '/projetos' },
  { href: '/#habilidades', label: '/habilidades' },
  { href: '/#contato', label: '/contato' },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={styles.navbar}>
      <div className={`${styles.inner} container`}>
        <Link to="/" className={styles.brand}>
          matheushang<span className={styles.brandAccent}>@</span>portfolio
          <span className={styles.brandCursor}>:~$</span>
        </Link>

        {/* Em páginas de detalhe, os links de âncora voltam para a home */}
        <nav className={styles.links} aria-label="Navegação principal">
          {LINKS.map((link) => (
            <a key={link.href} href={isHome ? link.href.replace('/', '') : link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
