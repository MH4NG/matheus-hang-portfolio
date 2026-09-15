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
| `npm test`          | Roda a suíte de testes (Vitest)              |
| `npm run test:watch`| Testes em modo watch                         |

## Testes e CI

25 testes em Vitest + Testing Library, cobrindo três frentes:

- **`src/data/projects.test.js`** — busca por slug e integridade dos dados
  (slugs únicos, URLs reais sem placeholder, datas no formato mês/ano)
- **`src/components/ProjectEntry`** — renderização dos campos, seção "Fixed"
  condicional, link de demo omitido quando não há `demoUrl`
- **`src/components/ContactForm`** — validação, montagem do `mailto:` e a
  acessibilidade (`aria-invalid`, `aria-describedby`, `role="alert"`,
  região `aria-live`)

O workflow em `.github/workflows/ci.yml` roda `lint → test → build` a cada
push e pull request na `main`.

## Estrutura de pastas

\`\`\`
src/
├── components/     # Componentes reutilizáveis (Navbar, Footer, ProjectEntry, SkillBadge, ContactForm, VersionTag, ScrollToTop)
├── sections/       # Seções da home (Hero, About, Projects, Skills, Contact)
├── pages/          # Páginas roteadas (Home, ProjectDetail, NotFound)
├── data/           # Dados dos projetos e habilidades (projects.js, skills.js)
├── hooks/          # Hooks customizados (useScrollReveal)
└── styles/         # Tokens de design e reset global (globals.css)
\`\`\`

Cada componente/seção tem seu próprio arquivo `.module.css` ao lado do `.jsx`,
seguindo o padrão de CSS Modules (estilos com escopo local, sem conflito de nomes).

## Projetos em destaque

Cada projeto listado no portfólio tem repositório e demo publicados:

| Versão | Projeto | Repositório | Demo | Concluído |
| --- | --- | --- | --- | --- |
| v4.0.0 | tarefas-app | github.com/MH4NG/tarefas-app | tarefas-app-h4-ng.vercel.app | jul/2026 |
| v3.0.0 | diario-de-bordo | github.com/MH4NG/diario-de-bordo | diario-de-bordo-h4-ng.vercel.app | ago/2026 |
| v2.0.0 | micro-frontends | github.com/MH4NG/micro-frontends-module-federation | micro-frontends-h4-ng.vercel.app | ago/2026 |
| v1.0.0 | todolist-recoil | github.com/MH4NG/todolist-recoil | todolist-recoil-h4-ng.vercel.app | abr/2026 |

As datas vêm do último push de cada repositório. Note que a numeração de versões
reflete a **progressão técnica** do curso, não a ordem cronológica: o
micro-frontends é o repositório mais recente, mas aparece como v2.0.0.

## Pendências

- **Texto de apresentação**: o parágrafo do "Sobre" em `src/sections/About/About.jsx`
  ainda está marcado com `TODO` para personalização

## Deploy

Publicado no Vercel (projeto `portfolio`, escopo `h4-ng`) com o repositório
conectado pela integração Git. O deploy é automático:

| Evento | Resultado |
| --- | --- |
| push na `main` | deploy de **produção** |
| push em qualquer outra branch | **preview** com URL própria |

Não é preciso rodar nada localmente — e, por isso, não é preciso ter a CLI
autenticada em cada máquina. Em caso de problema, *Instant Rollback* no painel
volta para o deployment anterior.

O `vercel.json` na raiz reescreve todas as rotas para `index.html`. Sem isso,
as rotas do React Router (`/projetos/:slug`) respondem 404 quando acessadas
diretamente, em vez de navegando pelo app.

Alternativas gratuitas, caso queira migrar:

**Netlify** — Build command: `npm run build` · Publish directory: `dist`

**GitHub Pages**
1. Instale o pacote de deploy: `npm install --save-dev gh-pages`
2. Em `vite.config.js`, defina `base: '/nome-do-repositorio/'`
3. Adicione ao `package.json`: `"deploy": "vite build && gh-pages -d dist"`
4. Rode `npm run deploy`

## Tecnologias

React · React Router · Vite · CSS Modules
