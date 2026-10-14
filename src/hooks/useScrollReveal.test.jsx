import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useScrollReveal } from './useScrollReveal';

let observers = [];

class FakeIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
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

function Harness() {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal" data-testid="alvo">
      conteúdo
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

describe('useScrollReveal', () => {
  it('revela o elemento quando ele entra na viewport e para de observá-lo', () => {
    render(<Harness />);
    const alvo = screen.getByTestId('alvo');
    expect(alvo).not.toHaveClass('isVisible');

    act(() => observers[0].callback([{ isIntersecting: true, target: alvo }]));

    expect(alvo).toHaveClass('isVisible');
    expect(observers[0].targets.has(alvo)).toBe(false);
  });

  it('mantém o elemento escondido enquanto ele não entra na viewport', () => {
    render(<Harness />);
    const alvo = screen.getByTestId('alvo');

    act(() => observers[0].callback([{ isIntersecting: false, target: alvo }]));

    expect(alvo).not.toHaveClass('isVisible');
  });

  it('mostra direto quando o usuário pede movimento reduzido', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    render(<Harness />);

    expect(observers).toHaveLength(0);
    expect(screen.getByTestId('alvo')).toHaveClass('isVisible');
  });

  it('mostra direto onde IntersectionObserver não existe', () => {
    delete globalThis.IntersectionObserver;
    render(<Harness />);

    expect(screen.getByTestId('alvo')).toHaveClass('isVisible');
  });
});
