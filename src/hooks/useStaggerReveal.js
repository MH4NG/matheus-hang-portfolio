import { useEffect, useRef } from 'react';

/**
 * useStaggerReveal
 * Revela os filhos diretos de um container conforme cada um entra na
 * viewport, escalonando apenas os que entram no mesmo instante.
 *
 * O escalonamento é o ponto delicado. Atrasar por índice na lista (1º = 0ms,
 * 2º = 90ms, 3º = 180ms…) só funciona quando a lista inteira aparece de uma
 * vez; para quem rola a página, o último item ficaria esperando quase 300ms
 * depois de já estar à vista. Aqui o atraso vem da posição dentro da leva que
 * disparou junto, não do índice na lista — então quem entra sozinho, na
 * rolagem normal, anima na hora.
 *
 * Retorna um ref para o container. Os filhos devem ter a classe ".reveal",
 * definida em src/styles/globals.css.
 */
export function useStaggerReveal(options = {}) {
  const { threshold = 0.15, step = 90, maxDelay = 240 } = options;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.children);
    if (items.length === 0) return;

    // Respeita a preferência de movimento reduzido: mostra direto, sem animação.
    // O mesmo caminho serve de rede de segurança onde IntersectionObserver não
    // existe — sem ele nada adicionaria "isVisible", e ".reveal" começa com
    // opacity 0, ou seja, os projetos simplesmente nunca apareceriam.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      items.forEach((item) => item.classList.add('isVisible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((entry) => entry.isIntersecting);

        // A ordem em que o observer entrega as entradas não é garantida, e o
        // que se espera ver é de cima para baixo.
        entering.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        entering.forEach((entry, index) => {
          // O teto impede que uma leva grande deixe o último item esperando
          // tempo demais — o atraso cresce até maxDelay e para por ali.
          const delay = Math.min(index * step, maxDelay);
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('isVisible');

          // Limpa o atraso depois da entrada, para não penalizar qualquer
          // outra transição de opacidade/transform que o elemento venha a ter.
          entry.target.addEventListener(
            'transitionend',
            () => {
              entry.target.style.transitionDelay = '';
            },
            { once: true }
          );

          observer.unobserve(entry.target);
        });
      },
      { threshold }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}
