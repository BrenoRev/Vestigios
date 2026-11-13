# Estado do projeto

> Todo agente lê este arquivo no início e o atualiza ao fim de cada tarefa. Manter curto e atual; histórico fica no Git e em `decisions.md`.

**Fase atual:** 2, Figma e design tokens (extração parcial feita a partir do `.fig`; aguardando respostas do Design para tipografia, raios, breakpoints e movimento).
**Última atualização:** 2026-11-13

## Feito

- Setup: Vite 8 + React 19 + TypeScript 6.0 (strict, `noUncheckedIndexedAccess`), Tailwind CSS v4 via `@tailwindcss/vite`, React Router v7, Motion, Phosphor Icons, ESLint (flat config) e Prettier. Versões e motivos em ADR-001 e ADR-002.
- Tipos de conteúdo (`src/types/content.ts`), função `pendente` (`src/content/pendente.ts`) e `BlocoPendente`. ADR-005.
- `scripts/check-conteudo.mjs`, ligado ao `npm run build`. ADR-004.
- Travas de lint contra texto editorial em componente e valor arbitrário de Tailwind. ADR-006.
- `vercel.json` com fallback da SPA; rota mínima `/` renderizando o nome do produto. ADR-007.
- Governança: `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md` (só estrutura), `README.md`, `.memory/`, `docs/` (esqueletos).
- Push da Fase 1 para `origin/main` (autorizado em 2026-11-11). About e Topics do GitHub configurados pelo responsável.
- Créditos: nomes e cursos dos 15 integrantes no README; disciplina IF760, Tópicos Avançados em Mídia.
- Verificado: `tsc --noEmit`, `eslint .`, `check-conteudo` e `vite build` passam.
- Validação de PR no GitHub Actions (`.github/workflows/validacao.yml`), jobs **Build** e **Conteúdo**. ADR-008. Primeira execução no GitHub passou (Build e Conteúdo). Ruleset "Proteção da main" ativo: mudança só entra por PR com os dois checks verdes.
- Vercel Web Analytics e Speed Insights no código (ADR-009).
- Comentários do código revisados (só o porquê) e regra registrada no CLAUDE.md.
- Imagens responsivas: `vite-imagetools` gera AVIF e WebP em 640, 960, 1280 e 1920 px na build; componente `ImagemResponsiva` (ADR-016). Larguras a revisar na Fase 2 com os breakpoints do Figma.
- Headers no `vercel.json`: cache imutável para `/assets/` e cabeçalhos básicos de segurança (ADR-015).
- `CONTRIBUTING.md` com papéis, fluxo de Git, entrada de conteúdo e dados, mapas e Definição de pronto; template de PR em `.github/` (ADR-014).
- `BASE.MD` versionado como documento de origem, sem formatação automática (ADR-013).
- Metas de performance definidas: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 no p75 em celular (ADR-012). Web Analytics e Speed Insights ativos no painel da Vercel.
- Nome do produto definido: **Vestígios**, com acento (ADR-011).
- Histórico da `main` reescrito em 2026-11-11 sem `Co-Authored-By` (force push autorizado, ruleset religado). Quem clonou antes precisa de `git fetch && git reset --hard origin/main`.
- Fase 2 (parcial): `.fig` exportado pelo Design lido sem o MCP; `DESIGN_SYSTEM.md` e `.memory/figma_specs.md` preenchidos; tokens de cor (40 primitivas, 6 temas, 5 de dado) e espaço (10) em `tokens.css`; contraste WCAG calculado. ADR-017.
- `.claude/` com 6 skills (extrair-design-tokens, implementar-secao, registrar-fonte, registrar-decisao, entregar-tarefa, fechamento) e 3 agentes de revisão (revisor-editorial, revisor-tecnico, revisor-fidelidade). ADR-010.

## Em andamento

- Nada.

## Bloqueado por decisão

- **Fase 2: 12 decisões abertas**, todas com opções e recomendação em `.memory/figma_specs.md` (seção "Decisões abertas da Fase 2"): tipografia, breakpoints e grid, escalas de espaço e raio, troca de tema por capítulo, tema padrão do Tailwind, hover dos botões, estados e componentes ausentes, contraste do tema A1, imagens e logo, fontes tipográficas, acesso do MCP e cores das telas fora das variáveis.
- **Configuração do projeto na Vercel:** confirmar que o Framework Preset é Vite, o Build Command é `npm run build`, o Output é `dist` e a versão de Node é compatível com `.nvmrc` (22). Não foi possível conferir daqui (CLI da Vercel deslogado).
- **URL de produção:** o subdomínio `vestigios.vercel.app` pertence a outro projeto da Vercel (outro site). O responsável indicou `vestigios-2jqhu9vgh-brenorevs-projects.vercel.app`, agora usado nas docs e no About. Esse é um endereço de deploy específico (não acompanha deploys novos) e está atrás do login da Vercel (Deployment Protection). Falta definir um domínio de produção estável e público em Settings → Domains, e depois atualizar README, CLAUDE.md e o About.
- **Mapas e gráficos:** técnica ou biblioteca, decidida por quem for implementar os mapas, depois de ver o protótipo.
- **Página 404:** não está no Figma.
- **Varredura de `.md` pelo Tailwind:** o v4 lê os `.md` do projeto e emite tokens citados neles; avaliar `@source not` (ver ADR-017).

## Próximo passo

1. Levar as 12 decisões de `.memory/figma_specs.md` ao Design e ao responsável; cada resposta vira ADR (skill `registrar-decisao`).
2. Com tipografia, breakpoints e raios definidos, completar `tokens.css` e `DESIGN_SYSTEM.md`.
3. Depois, Fase 3 (layout base), com a skill `implementar-secao`. Pedir ao responsável que confirme o avanço de fase.
