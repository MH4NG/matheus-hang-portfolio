import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 * Adiciona a classe "isVisible" ao elemento quando ele entra na viewport,
 * usando IntersectionObserver. Usado junto da classe utilitária ".reveal"
 * definida em src/styles/globals.css.
 *
 * Retorna um ref que deve ser anexado ao elemento a ser revelado.
 */
export function useScrollReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respeita a preferência de movimento reduzido: mostra direto, sem animação.
    // O mesmo caminho serve de rede de segurança onde IntersectionObserver não
    // existe — sem ele nada adicionaria "isVisible", e ".reveal" começa com
    // opacity 0, ou seja, a seção simplesmente nunca apareceria.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      node.classList.add('isVisible');
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('isVisible');
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
