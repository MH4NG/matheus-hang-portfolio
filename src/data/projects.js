/**
 * Dados dos projetos, organizados como "versões" de um changelog.
 * Ordem: da mais antiga (v1.0.0) para a mais recente (v4.0.0),
 * refletindo a evolução técnica ao longo do curso.
 *
 * TODO (Hang): ajustar `date`, `repoUrl`, `demoUrl` e `image`/`screenshots`
 * conforme os links e capturas de tela reais forem enviados.
 */

export const projects = [
  {
    slug: 'tarefas-app',
    version: 'v4.0.0',
    name: 'Tarefas App',
    date: '2026', // TODO: mês/ano de conclusão
    tagline: 'Task app com pipeline de CI/CD completo',
    description:
      'Aplicação de gerenciamento de tarefas construída com Next.js 16 e TypeScript, com cobertura de testes consistente e deploy automatizado via GitHub Actions.',
    longDescription:
      'O projeto mais completo do curso em termos de ciclo de vida de desenvolvimento: da arquitetura de componentes até a esteira de integração e entrega contínua. O estado das tarefas é centralizado em um hook customizado (useContadorDeTarefas), que serve como fonte única de verdade e evita dessincronizações entre componentes — um bug real identificado e corrigido durante o desenvolvimento. A página principal é um Server Component, enquanto o formulário de criação de tarefas é um Client Component controlado.',
    tech: ['Next.js 16', 'TypeScript', 'App Router', 'Jest', 'Testing Library', 'GitHub Actions'],
    added: [
      'Arquitetura em App Router com Server e Client Components',
      'Hook customizado useContadorDeTarefas como fonte única de estado',
      'Suíte de testes com Jest e Testing Library, espelhando a estrutura de código',
      'Pipeline de CI/CD: lint → test → build → deploy automático na Vercel',
    ],
    fixed: ['Dessincronização de estado entre componentes (dual-state bug)'],
    repoUrl: 'https://github.com/MH4NG/tarefas-app',
    demoUrl: 'https://tarefas-app-h4-ng.vercel.app',
    image: '/images/projects/tarefas-app-cover.webp',
    screenshots: [
      '/images/projects/tarefas-app-cover.webp',
      '/images/projects/tarefas-app-concluida.webp',
      '/images/projects/tarefas-app-pendentes.webp',
    ],
  },
  {
    slug: 'diario-de-bordo',
    version: 'v3.0.0',
    name: 'Diário de Bordo',
    date: '2026', // TODO
    tagline: 'PWA offline-first com foco em performance',
    description:
      'Progressive Web App para registro de atividades diárias, instalável e funcional offline, posteriormente auditado e otimizado com Chrome DevTools e Lighthouse.',
    longDescription:
      'Aplicação que funciona como um diário de atividades (título, descrição e data), com listagem e remoção de entradas persistidas em localStorage. Implementa manifest.json e service worker próprios, com suporte a instalação via evento beforeinstallprompt e funcionamento offline. Em uma etapa posterior, o projeto foi auditado com Lighthouse e otimizado: conversão de imagens para formatos modernos, lazy loading, minificação de assets e remoção de código não utilizado — com os ganhos documentados no README.',
    tech: ['JavaScript', 'PWA', 'Service Worker', 'localStorage', 'Lighthouse'],
    added: [
      'Manifest e ícones para instalação como app (192×192 e 512×512)',
      'Service worker com cache offline',
      'Persistência de entradas via localStorage',
      'Layout responsivo mobile-first',
    ],
    fixed: [
      'Otimizações de performance guiadas por Lighthouse (imagens, lazy loading, minificação)',
    ],
    repoUrl: 'https://github.com/MH4NG/diario-de-bordo',
    demoUrl: 'https://diario-de-bordo-h4-ng.vercel.app',
    image: '/images/projects/diario-de-bordo-cover.jpg',
    screenshots: [
      '/images/projects/diario-de-bordo-cover.jpg',
      '/images/projects/diario-de-bordo-01.jpg',
      '/images/projects/diario-de-bordo-02.png',
    ],
  },
  {
    slug: 'micro-frontends',
    version: 'v2.0.0',
    name: 'Micro Frontends — Cardápio & Pedido',
    date: '2026', // TODO
    tagline: 'Arquitetura de micro frontends com Module Federation',
    description:
      'Aplicação dividida em um container e dois micro frontends independentes (Cardápio e Pedido), integrados em tempo de execução via Webpack Module Federation.',
    longDescription:
      'Projeto de prática de arquitetura avançada: em vez de um monólito front-end, a aplicação é composta por três projetos React independentes — um container que orquestra a navegação e dois micro frontends (Cardápio e Pedido) — carregados dinamicamente via Module Federation. A comunicação entre os micros acontece por eventos globais (window.dispatchEvent), sem acoplamento direto entre os times/módulos.',
    tech: ['React', 'Webpack 5', 'Module Federation', 'JavaScript'],
    added: [
      'Container de orquestração com carregamento remoto dos micro frontends',
      'Micro frontend de Cardápio',
      'Micro frontend de Pedido',
      'Comunicação entre micros via eventos globais (window.dispatchEvent)',
    ],
    repoUrl: 'https://github.com/MH4NG/micro-frontends-module-federation',
    demoUrl: '#', // TODO: link do deploy
    image: '/images/projects/micro-frontends-cover.jpg',
    screenshots: [
      '/images/projects/micro-frontends-cover.jpg',
      '/images/projects/micro-frontends-container.jpg',
      '/images/projects/micro-frontends-cardapio.jpg',
      '/images/projects/micro-frontends-pedido.jpg',
    ],
  },
  {
    slug: 'todolist-recoil',
    version: 'v1.0.0',
    name: 'Lista de Tarefas — Recoil',
    date: '2026', // TODO
    tagline: 'Estado global com Recoil (atoms & selectors)',
    description:
      'Lista de tarefas com prioridades, filtros e progresso em tempo real, construída para aplicar na prática os conceitos centrais de gerenciamento de estado global do Recoil.',
    longDescription:
      'Primeiro projeto da lista, focado em fundamentos de gerenciamento de estado: átomos (atom) guardam o estado global das tarefas e do filtro ativo, enquanto seletores (selector) derivam automaticamente a lista filtrada sempre que um átomo do qual dependem muda. Toda a árvore de componentes é envolvida por um RecoilRoot, e os componentes usam useRecoilState, useRecoilValue e useSetRecoilState conforme precisam ler e/ou escrever o estado.',
    tech: ['React', 'Vite', 'Recoil'],
    added: [
      'Átomos (atom) para o estado global de tarefas e filtro ativo',
      'Seletor (selector) que deriva a lista de tarefas filtradas',
      'Adição de tarefas com prioridade (Alta / Média / Baixa)',
      'Filtro por Todas / Pendentes / Concluídas e barra de progresso em tempo real',
    ],
    repoUrl: 'https://github.com/MH4NG/todolist-recoil',
    demoUrl: 'https://todolist-recoil-h4-ng.vercel.app',
    image: '/images/projects/todolist-recoil-cover.jpg',
    screenshots: [
      '/images/projects/todolist-recoil-cover.jpg',
      '/images/projects/todolist-recoil-prioridade.jpg',
      '/images/projects/todolist-recoil-pendentes.jpg',
    ],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
