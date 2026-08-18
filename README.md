# Portfólio — Matheus Hang

Portfólio pessoal desenvolvido em React (Vite) + CSS Modules, como projeto final do curso.
Apresenta os principais projetos, habilidades e formas de contato no formato de um
"changelog de desenvolvedor": cada projeto é tratado como uma versão lançada, com
tecnologias marcadas no estilo diff (`+ adicionado` / `− corrigido`).

🔗 **Ao vivo:** https://portfolio-h4-ng.vercel.app
📦 **Repositório:** https://github.com/MH4NG/matheus-hang-portfolio

## Como rodar localmente

\`\`\`bash
npm install
npm run dev
\`\`\`

Acesse `http://localhost:5173`.

## Scripts disponíveis

| Comando           | Descrição                                  |
| ------------------ | ------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento com hot reload  |
| `npm run build`     | Build de produção (pasta `dist/`)           |
| `npm run preview`   | Serve o build de produção localmente         |
| `npm run lint`      | Roda o linter (oxlint)                       |

## Estrutura de pastas

\`\`\`
src/
├── components/     # Componentes reutilizáveis (Navbar, Footer, ProjectEntry, SkillBadge, ContactForm, VersionTag)
├── sections/       # Seções da home (Hero, About, Projects, Skills, Contact)
├── pages/          # Páginas roteadas (Home, ProjectDetail)
├── data/           # Dados dos projetos e habilidades (projects.js, skills.js)
├── hooks/          # Hooks customizados (useScrollReveal)
└── styles/         # Tokens de design e reset global (globals.css)
\`\`\`

Cada componente/seção tem seu próprio arquivo `.module.css` ao lado do `.jsx`,
seguindo o padrão de CSS Modules (estilos com escopo local, sem conflito de nomes).

## Projetos em destaque

Cada projeto listado no portfólio tem repositório e demo publicados:

| Projeto | Repositório | Demo |
| --- | --- | --- |
| tarefas-app | github.com/MH4NG/tarefas-app | tarefas-app-h4-ng.vercel.app |
| diario-de-bordo | github.com/MH4NG/diario-de-bordo | diario-de-bordo-h4-ng.vercel.app |
| micro-frontends | github.com/MH4NG/micro-frontends-module-federation | micro-frontends-h4-ng.vercel.app |
| todolist-recoil | github.com/MH4NG/todolist-recoil | todolist-recoil-h4-ng.vercel.app |

## Pendências

- **Link do LinkedIn**: ainda como placeholder em `src/sections/About/About.jsx` (marcado com `TODO`)

## Deploy

Já publicado no Vercel (link no topo deste README). Para republicar após novas
alterações:

\`\`\`bash
vercel --prod
\`\`\`

Alternativas gratuitas, caso queira migrar:

**Netlify** — Build command: `npm run build` · Publish directory: `dist`

**GitHub Pages**
1. Instale o pacote de deploy: `npm install --save-dev gh-pages`
2. Em `vite.config.js`, defina `base: '/nome-do-repositorio/'`
3. Adicione ao `package.json`: `"deploy": "vite build && gh-pages -d dist"`
4. Rode `npm run deploy`

## Tecnologias

React · React Router · Vite · CSS Modules
