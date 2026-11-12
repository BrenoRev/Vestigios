# Arquitetura

> **Árvore congelada.** Pasta nova só com autorização registrada em `.memory/decisions.md`. Regras de uso de cada pasta em `CLAUDE.md`.

```text
├── .claude/
│   ├── agents/            # agentes de revisão: editorial, técnico e fidelidade (ADR-010)
│   └── skills/            # uma skill por etapa do plano (ADR-010)
├── .github/
│   └── workflows/
│       └── validacao.yml  # validação de PR: tipos, lint, formatação, build e conteúdo (ADR-008)
├── .memory/
│   ├── agent_state.md     # estado vivo do projeto; lido e atualizado por todo agente
│   ├── decisions.md       # ADRs
│   └── figma_specs.md     # medidas, telas, estados e padrões extraídos do Figma
├── docs/
│   ├── direito-de-resposta.md
│   ├── fontes.md          # única fonte de verdade para src/content/
│   └── metodologia.md     # vira a página de metodologia do site
├── public/
│   ├── data/              # dados tratados e leves servidos ao site (JSON, GeoJSON)
│   └── fonts/
├── scripts/
│   └── check-conteudo.mjs # bloqueia a build de produção com pendências editoriais
├── src/
│   ├── assets/
│   │   ├── images/        # fotos; crédito e licença registrados em src/content
│   │   └── textures/      # texturas e fundos exportados do Figma em WebP/AVIF
│   ├── components/
│   │   ├── layout/        # Header, Footer, Container, Grid
│   │   ├── sections/      # seções da reportagem, uma por bloco do protótipo
│   │   └── ui/            # componentes reutilizáveis do protótipo
│   ├── content/           # textos, dados, fontes e créditos em TS tipado
│   ├── hooks/
│   ├── pages/             # páginas conforme o protótipo
│   ├── routes/
│   ├── styles/
│   │   ├── global.css
│   │   └── tokens.css     # @theme do Tailwind v4
│   ├── types/
│   │   └── content.ts
│   ├── App.tsx
│   └── main.tsx
├── .cursorrules
├── .nvmrc
├── AGENTS.md
├── ARCHITECTURE.md
├── CLAUDE.md
├── DESIGN_SYSTEM.md
├── README.md
└── vercel.json            # fallback de rotas da SPA
```

## Arquivos que existem na Fase 1 além da árvore

Não são pastas novas; são arquivos de configuração das ferramentas da stack ou o mínimo da Fase 1.

| Arquivo                               | Papel                                                            |
| ------------------------------------- | ---------------------------------------------------------------- |
| `package.json`, `package-lock.json`   | Dependências e scripts.                                          |
| `tsconfig.json`                       | TypeScript (configuração única: ver ADR-002).                    |
| `vite.config.ts`                      | Vite com os plugins de React e Tailwind v4.                      |
| `eslint.config.js`                    | ESLint flat config, com as travas editoriais e de design system. |
| `.prettierrc.json`, `.prettierignore` | Prettier.                                                        |
| `.gitignore`                          | Git.                                                             |
| `index.html`                          | Ponto de entrada do Vite.                                        |
| `src/content/pendente.ts`             | Função `pendente()` e guarda `ehPendente()`.                     |
| `src/content/site.ts`                 | Nome do produto.                                                 |
| `src/components/ui/BlocoPendente.tsx` | Bloco tarjado que renderiza uma pendência.                       |
| `src/pages/Inicio.tsx`                | Rota mínima da Fase 1.                                           |
| `src/routes/index.tsx`                | Definição das rotas (React Router v7, `createBrowserRouter`).    |

## Fluxo de dados

```text
docs/fontes.md ──(equipe de Jornalismo confirma)──> src/content/*.ts ──props──> src/components/** ──> src/pages/** ──> src/routes
                                                         │
                                                         └── pendente(...) ──> BlocoPendente (dev/preview) / build de produção bloqueada
```

- Componentes não importam texto editorial de lugar nenhum além das props; páginas e seções importam de `src/content/` e repassam.
- Estilo: utilitários do Tailwind que consomem os tokens de `src/styles/tokens.css`.
- Rotas: SPA com `createBrowserRouter`; em produção, `vercel.json` reescreve qualquer caminho para `index.html`.
