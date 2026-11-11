# Estado do projeto

> Todo agente lê este arquivo no início e o atualiza ao fim de cada tarefa. Manter curto e atual; histórico fica no Git e em `decisions.md`.

**Fase atual:** 1, estrutura e governança (concluída localmente, aguardando autorização para push e confirmação para a Fase 2).
**Última atualização:** 2026-11-11

## Feito

- Setup: Vite 8 + React 19 + TypeScript 6.0 (strict, `noUncheckedIndexedAccess`), Tailwind CSS v4 via `@tailwindcss/vite`, React Router v7, Motion, Phosphor Icons, ESLint (flat config) e Prettier. Versões e motivos em ADR-001 e ADR-002.
- Tipos de conteúdo (`src/types/content.ts`), função `pendente` (`src/content/pendente.ts`) e `BlocoPendente`. ADR-005.
- `scripts/check-conteudo.mjs`, ligado ao `npm run build`. ADR-004.
- Travas de lint contra texto editorial em componente e valor arbitrário de Tailwind. ADR-006.
- `vercel.json` com fallback da SPA; rota mínima `/` renderizando o nome do produto. ADR-007.
- Governança: `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md` (só estrutura), `README.md`, `.memory/`, `docs/` (esqueletos).
- Verificado: `tsc --noEmit`, `eslint .`, `check-conteudo` e `vite build` passam.

## Em andamento

- Nada.

## Bloqueado por decisão

- **Acesso ao Figma** (Fase 2 inteira depende disso).
- **Push para `origin/main`** e primeiro deploy na Vercel: aguardando autorização.
- **Configuração do projeto na Vercel:** confirmar que o Framework Preset é Vite, o Build Command é `npm run build`, o Output é `dist` e a versão de Node é compatível com `.nvmrc` (22). Não foi possível conferir daqui (CLI da Vercel deslogado).
- **About e Topics do GitHub:** texto e comando entregues; aguardando autorização para `gh repo edit`.
- **Nome com ou sem acento:** "Vestigios" (BASE.MD) ou "Vestígios"? O arquivo do Figma se chama "Vestigio — Deterioração do Recife".
- **Créditos:** nomes, cursos e funções dos 15 integrantes.
- **Mapas e gráficos:** técnica ou biblioteca (só depois de ver o protótipo).
- **Fontes tipográficas:** `public/fonts/` ou `@fontsource/*` (Fase 2).
- **Página 404:** não está no Figma.
- **Tema padrão do Tailwind:** zerar os tokens padrão (`--*: initial`) na Fase 2 para que só existam tokens do Figma?
- **Meta de LCP** (2,5 s em 4G): validar com a equipe.
- **`BASE.MD`:** versionar no repositório ou manter fora? Hoje está fora do Git.

## Próximo passo

1. Responsável autoriza o push; conferir o deploy de produção e o preview na Vercel.
2. Com acesso ao Figma, iniciar a Fase 2: extrair tokens para `DESIGN_SYSTEM.md`, `src/styles/tokens.css` e `.memory/figma_specs.md`.
