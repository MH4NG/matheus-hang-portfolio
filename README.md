# Portfólio — Matheus Hang

Portfólio pessoal desenvolvido em React (Vite) + CSS Modules, como projeto final do curso.
Apresenta os principais projetos, habilidades e formas de contato no formato de um
"changelog de desenvolvedor": cada projeto é tratado como uma versão lançada, com
tecnologias marcadas no estilo diff (`+ adicionado` / `− corrigido`).

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

## Pendências para você preencher (marcadas com `TODO` no código)

- **Foto de perfil**: adicionar em `public/images/profile/foto.jpg` (referenciada em `src/sections/About/About.jsx`)
- **Informações de contato**: e-mail, LinkedIn e demais redes em `src/sections/About/About.jsx` e `src/components/ContactForm/ContactForm.jsx` (constante `CONTACT_EMAIL`)
- **Links dos projetos**: `repoUrl` e `demoUrl` de cada projeto em `src/data/projects.js`
- **Imagens/capturas de tela dos projetos**: adicionar em `public/images/projects/` e referenciar em `src/data/projects.js` (campos `image` e `screenshots`)
- **Datas dos projetos**: campo `date` em `src/data/projects.js`

## Deploy gratuito

### Vercel (recomendado, mesma stack usada no tarefas-app)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

Ou, pelo site: importe o repositório do GitHub em vercel.com/new — o Vercel detecta
automaticamente que é um projeto Vite.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

1. Instale o pacote de deploy: `npm install --save-dev gh-pages`
2. Em `vite.config.js`, defina `base: '/nome-do-repositorio/'`
3. Adicione ao `package.json`: `"deploy": "vite build && gh-pages -d dist"`
4. Rode `npm run deploy`

## Tecnologias

React · React Router · Vite · CSS Modules
