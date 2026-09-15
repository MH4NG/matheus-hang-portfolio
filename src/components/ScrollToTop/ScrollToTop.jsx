import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * O React Router não restaura o scroll nem rola até âncoras de hash na
 * troca de rota. Este componente cobre os dois casos:
 *
 * - rota sem hash  → volta para o topo (ex.: abrir /projetos/:slug)
 * - rota com hash  → rola até a seção correspondente (ex.: "/#projetos")
 *
 * O scroll é instantâneo de propósito: o `scroll-behavior: smooth` do
 * globals.css é para cliques em âncoras na mesma página, e animar uma
 * página inteira recém-montada parece defeito, não transição.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
