# Estado do projeto

> Todo agente lê este arquivo no início e o atualiza ao fim de cada tarefa. Manter curto e atual; histórico fica no Git e em `decisions.md`.

**Fase atual:** 2, Figma e design tokens, concluída (ADR-017 e ADR-018); aguardando confirmação do responsável para a Fase 3 (layout base).
**Última atualização:** 2026-11-27

> **Esta cópia está na branch `prototipo/mapa-mock`, que é SÓ DE PROTÓTIPO e nunca vai para a `main`** (sem push, PR, merge ou Vercel, por ordem do responsável). Ela tem dados fictícios em `src/prototipo/mapa-mock.ts`.

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
- Fase 2 (decisões): as 12 decisões foram tomadas por delegação do responsável (ADR-018). `tokens.css` com famílias, raios, breakpoints `md`/`lg`, cores padrão removidas e troca de tema por `data-tema`; `fonts.css` com 16 pesos em 5 famílias; MCP lendo a cópia de trabalho do Figma. Verificado em página de teste.
- Fases 3 e 4 (página inicial): Container, Navbar, Botão (temas A a F), Logo, Texto, marcadores de pendência e as quatro seções, com tokens de tipografia e efeitos (ADR-019). Medidas de Tablet e Mobile do Guia lidas do `.fig` porque o MCP do Figma bateu no limite de chamadas.
- `.claude/` com 6 skills (extrair-design-tokens, implementar-secao, registrar-fonte, registrar-decisao, entregar-tarefa, fechamento) e 3 agentes de revisão (revisor-editorial, revisor-tecnico, revisor-fidelidade). ADR-010.

- Textos oficiais do Jornalismo na página inicial (ADR-022): 1ª Matéria, Quebra e Guia confirmados; novas seções Valdemar, Casarão, Ribamar, Quem pode agir e O futuro usando o componente `Materia`. Pendências de fonte em `docs/fontes.md`.

## Em andamento

- **Protótipo do mapa (branch `prototipo/mapa-mock`, commits locais, sem push nem PR):** rota `/prototipo/mapa` (lazy, 82 KB gzip) com mapa SVG pré-processado (`scripts/gerar-mapa-prototipo.mjs`: 94 bairros e 42 corpos d'água ≥ 2 ha da Prefeitura, fora do Git), 6 prédios reais com atributos fictícios, filtros Todos/situação, enquadramentos Recife/Centro, página inteira no tema claro C sobre `bg-pagina` (pedido do responsável, contra o "B · Mapa (noite)" do Fundamentos), abas e ficha, legenda, tabela acessível, Navbar e aviso "DADOS FICTÍCIOS — PROTÓTIPO". Marcador, Filtro e Aba seguem os PNGs exportados do Figma (`~/Downloads/Vestigio — Deterioração do Recife*.zip`), conferidos por `revisor-fidelidade` e `revisor-tecnico` (2026-11-16). O MCP do Figma conecta, mas recusa leitura: a conta tem só assento View. Decisões técnicas e de design em ADR-021 (só nesta branch); escolhas sem Figma listadas no fim do ADR-021 e no `DESIGN_SYSTEM.md`, para levar ao Design.
  - **2026-11-23, mapa interativo (não commitado):** mapa maior (2/3 da largura no `lg`), zoom/arrasto/pinça, indicadores fictícios por bairro em coroplético (taxa) ou círculos (contagem), linha do tempo 2012–2026 com play, dica ao passar o cursor, painel do bairro com série, ranking e tabela dos bairros. Prédios viraram camada que liga e desliga; o marcador abre a ficha. `MapaPredios` foi substituído por `MapaInterativo`; `AbaPredio` ficou sem uso. Decisões no adendo de 2026-11-23 do ADR-021. Verificado: `npm run verificar`, `format:check` e capturas em 1440 px e 390 px (toque e movimento reduzido). Depois, no mesmo dia, virou tela cheia com cartões que abrem no clique (adendo "tela cheia" do ADR-021). Pendente: rodar `revisor-tecnico` e `revisor-fidelidade`; levar ao Design a lista de escolhas sem Figma do adendo.

- Página inicial completa (Navbar, Hero, 1ª Matéria, Quebra, Guia de Leitura) nos três tamanhos, com o texto do Figma como provisório (ADR-019), na branch `feat/pagina-inicial`.

## Bloqueado por decisão

- **Design (confirmar, não bloqueia):** lista de exceções de tipografia e de espaço em `DESIGN_SYSTEM.md`; Selo de estatuto para `imprensa`; Space Grotesk em 2 textos de componentes; destino do botão "Explorar o Mapa"; correspondência entre capítulos e temas; as 6 cores fora das variáveis.
- **Jornalismo (bloqueia o fechamento):** a frase do Hero afirma que o esvaziamento "não é acidente" (regra editorial 2); todas as cifras das telas precisam de fonte e ano em `docs/fontes.md`; rótulos da Navbar e textos das telas são só referência de layout. Detalhes em `figma_specs.md`, seção Alertas editoriais.
- **Configuração do projeto na Vercel:** confirmar que o Framework Preset é Vite, o Build Command é `npm run build`, o Output é `dist` e a versão de Node é compatível com `.nvmrc` (22). Não foi possível conferir daqui (CLI da Vercel deslogado).
- **URL de produção:** o subdomínio `vestigios.vercel.app` pertence a outro projeto da Vercel (outro site). O responsável indicou `vestigios-2jqhu9vgh-brenorevs-projects.vercel.app`, agora usado nas docs e no About. Esse é um endereço de deploy específico (não acompanha deploys novos) e está atrás do login da Vercel (Deployment Protection). Falta definir um domínio de produção estável e público em Settings → Domains, e depois atualizar README, CLAUDE.md e o About.
- **Mapas e gráficos:** técnica ou biblioteca, decidida por quem for implementar os mapas, depois de ver o protótipo.
- **Página 404:** não está no Figma.
- **Varredura de `.md` pelo Tailwind:** o v4 lê os `.md` do projeto e emite tokens citados neles; avaliar `@source not` (ver ADR-017).

## Próximo passo

0. Revisar a PR da página inicial. Depois: Design confirma os pontos do ADR-019 (capítulos 4 a 6 no Mobile, ícones, Navbar fixa, foco); Jornalismo troca cada `provisorio(...)` por texto confirmado e registra as fontes (`docs/fontes.md`); o fechamento liga `BLOQUEIA_PRODUCAO`.

1. Fase 5 (fechamento) depois que Jornalismo e Design resolverem os pontos acima.
2. Levar a lista de exceções ao Design e os alertas editoriais ao Jornalismo.
