import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Desmonta a árvore entre testes para um teste não herdar o DOM do anterior.
afterEach(() => {
  cleanup();
});
