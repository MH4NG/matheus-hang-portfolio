/**
 * Habilidades agrupadas por categoria — exibidas como uma lista de
 * "dependências" no estilo package.json, reforçando o conceito visual
 * do portfólio (changelog / ferramentas de desenvolvedor).
 */

export const skillGroups = [
  {
    category: 'frontend',
    label: 'frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Vite'],
  },
  {
    category: 'estilizacao',
    label: 'estilização',
    skills: ['CSS Modules', 'Emotion', 'CSS Responsivo'],
  },
  {
    category: 'estado-dados',
    label: 'estado & dados',
    skills: ['Recoil', 'Hooks customizados', 'Integração com APIs REST'],
  },
  {
    category: 'testes',
    label: 'testes & qualidade',
    skills: ['Vitest', 'Jest', 'Testing Library'],
  },
  {
    category: 'devops',
    label: 'devops & deploy',
    skills: ['GitHub Actions (CI/CD)', 'Vercel', 'Git'],
  },
  {
    category: 'performance-arquitetura',
    label: 'performance & arquitetura',
    skills: ['Lighthouse / Chrome DevTools', 'PWA (Service Worker)', 'Module Federation'],
  },
];
