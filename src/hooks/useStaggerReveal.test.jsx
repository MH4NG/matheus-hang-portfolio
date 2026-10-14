import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useStaggerReveal } from './useStaggerReveal';

/** Observers criados durante o teste, para disparar as entradas na mão. */
let observers = [];

class FakeIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.targets = new Set();
    observers.push(this);
  }
  observe(node) {
    this.targets.add(node);
  }
  unobserve(node) {
    this.targets.delete(node);
  }
  disconnect() {
    this.targets.clear();
  }
}

/** Entrada do IntersectionObserver com o mínimo que o hook consome. */
function entry(target, top, isIntersecting = true) {
  return { target, isIntersecting, boundingClientRect: { top } };
}

function Harness({ count = 3, options }) {
  const ref = useStaggerReveal(options);
  return (
    <div ref={ref}>
      {Array.from({ length: count }, (_, index) => (
        <article key={index} className="reveal" data-testid={`item-${index}`}>
          item {index}
        </article>
      ))}
    </div>
  );
}

beforeEach(() => {
  observers = [];
  globalThis.IntersectionObserver = FakeIntersectionObserver;
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});

afterEach(() => {
  delete globalThis.IntersectionObserver;
});

describe('useStaggerReveal', () => {
  it('observa cada filho individualmente, não o container', () => {
    render(<Harness count={3} />);
    expect(observers).toHaveLength(1);
    expect(observers[0].targets.size).toBe(3);
  });

  it('revela sem atraso o item que entra sozinho', () => {
    render(<Harness count={3} />);
    const item = screen.getByTestId('item-1');

    act(() => observers[0].callback([entry(item, 400)]));

    expect(item).toHaveClass('isVisible');
    expect(item.style.transitionDelay).toBe('0ms');
  });

  it('escalona os itens que entram juntos, de cima para baixo', () => {
    render(<Harness count={3} />);
    const [first, second, third] = [0, 1, 2].map((i) => screen.getByTestId(`item-${i}`));

    // Entregues fora de ordem de propósito: o hook ordena pela posição na tela.
    act(() => observers[0].callback([entry(third, 900), entry(first, 100), entry(second, 500)]));

    expect(first.style.transitionDelay).toBe('0ms');
    expect(second.style.transitionDelay).toBe('90ms');
    expect(third.style.transitionDelay).toBe('180ms');
  });

  it('limita o atraso ao teto quando a leva é grande', () => {
    render(<Harness count={5} options={{ step: 90, maxDelay: 240 }} />);
    const items = [0, 1, 2, 3, 4].map((i) => screen.getByTestId(`item-${i}`));

    act(() => observers[0].callback(items.map((item, i) => entry(item, i * 100))));

    expect(items.map((item) => item.style.transitionDelay)).toEqual([
      '0ms',
      '90ms',
      '180ms',
      '240ms',
      '240ms',
    ]);
  });

  it('ignora as entradas que saíram da viewport', () => {
    render(<Harness count={2} />);
    const [first, second] = [0, 1].map((i) => screen.getByTestId(`item-${i}`));

    act(() => observers[0].callback([entry(first, 100, false), entry(second, 500, true)]));

    expect(first).not.toHaveClass('isVisible');
    expect(second).toHaveClass('isVisible');
    // O que entrou deixa de ser observado; o que não entrou continua.
    expect(observers[0].targets.has(second)).toBe(false);
    expect(observers[0].targets.has(first)).toBe(true);
  });

  it('mostra tudo direto quando o usuário pede movimento reduzido', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    render(<Harness count={3} />);

    expect(observers).toHaveLength(0);
    [0, 1, 2].forEach((i) => expect(screen.getByTestId(`item-${i}`)).toHaveClass('isVisible'));
  });

  it('mostra tudo direto onde IntersectionObserver não existe', () => {
    delete globalThis.IntersectionObserver;
    render(<Harness count={3} />);

    [0, 1, 2].forEach((i) => expect(screen.getByTestId(`item-${i}`)).toHaveClass('isVisible'));
  });
});
