# Decisões (ADRs)

Formato: data, contexto, decisão, alternativas descartadas, consequência. ADR novo vai no fim; ADR antigo não é apagado, é substituído por outro que o cite.

---

## ADR-001: Stack da Fase 1 e versões travadas

- **Data:** 2026-11-11
- **Contexto:** BASE.MD trava a stack (seção 1). Na data do setup, a versão mais recente do React Router é a v8 e a do TypeScript é a 7; o `typescript-eslint` 8.72 só aceita TypeScript `>=4.8.4 <6.1.0`, e o `eslint-plugin-jsx-a11y` 6.10 só aceita ESLint até a 9.
- **Decisão:** React 19.3, Vite 8.3, TypeScript ~6.0.3, Tailwind CSS 4.3 com `@tailwindcss/vite`, React Router ^7.18.5 (v7, conforme o BASE.MD), Motion 14, `@phosphor-icons/react` 2.1. Dev: ESLint ^9.39, `typescript-eslint` 8.72, `eslint-plugin-react-hooks` 7.1, `eslint-plugin-jsx-a11y` 6.10, Prettier 3.10, `prettier-plugin-tailwindcss` 0.8.
- **Alternativas descartadas:** React Router v8 (fora do travado); TypeScript 7 e ESLint 10 (quebram os pares do lint).
- **Consequência:** atualizar React Router, TypeScript ou ESLint de versão maior exige novo ADR.

## ADR-002: Dependências implícitas da stack

- **Data:** 2026-11-11
- **Contexto:** algumas peças são necessárias para a stack travada funcionar, mas não estão nominalmente listadas no BASE.MD.
- **Decisão:** instalar apenas `@vitejs/plugin-react` (React no Vite), `@eslint/js` (regras base do ESLint flat config), `@types/react`, `@types/react-dom` e `@types/node` (tipos). Os globais de Node do lint foram declarados à mão, sem o pacote `globals`.
- **Alternativas descartadas:** `globals`, `eslint-config-prettier`, `eslint-plugin-react`, `eslint-plugin-react-refresh` (não necessários).
- **Consequência:** o `npm audit` aponta uma vulnerabilidade moderada (ReDoS no `minimatch`, via `typescript-eslint`). Só afeta o lint local, não vai para o site publicado. O `audit fix --force` rebaixaria o `typescript-eslint`, por isso não foi aplicado. Reavaliar quando sair versão corrigida.

## ADR-003: `tsconfig.json` único

- **Data:** 2026-11-11
- **Contexto:** o template do Vite usa um `tsconfig.json` de "solução" (com `references`), em que `tsc --noEmit` na raiz não checa nada. A Definição de pronto exige `tsc --noEmit`.
- **Decisão:** um único `tsconfig.json` cobrindo `src/` e `vite.config.ts`, com `strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`.
- **Alternativas descartadas:** `tsc -b` com project references (outro comando, diferente do que o BASE.MD pede).
- **Consequência:** `npm run typecheck` = `tsc --noEmit` checa todo o código.

## ADR-004: Comportamento do `check-conteudo.mjs`

- **Data:** 2026-11-11
- **Contexto:** o BASE.MD pede que o script falhe a **build de produção** com qualquer `pendente(` restante e que nenhuma seção vá ao ar com placeholder ou "em breve". A Vercel executa `npm run build` tanto no preview quanto na produção.
- **Decisão:** `npm run build` roda o script antes do `tsc` e do `vite build`. O script falha (código 1) na build local e na produção da Vercel (`VERCEL_ENV=production`); no preview da Vercel (`VERCEL_ENV=preview`) só lista as pendências como aviso. Além de `pendente(`, bloqueia "em breve" e "lorem ipsum". A única exceção é `src/content/pendente.ts`, que define a função.
- **Alternativas descartadas:** falhar também no preview (impediria a equipe de revisar trabalho em andamento); varrer só `pendente(` (deixaria passar "em breve").
- **Consequência:** enquanto houver `pendente(...)` na `main`, o deploy de produção falha e a Vercel mantém no ar a última versão publicada. Trabalho com pendências deve ficar em branches (preview) até ser resolvido.

## ADR-005: Desenho dos tipos de conteúdo e da função `pendente`

- **Data:** 2026-11-11
- **Contexto:** BASE.MD seção 2 define os campos mínimos de `Fonte`, `Dado` e `Imagem` e pede uma função `pendente`.
- **Decisão:**
  - `Fonte` é uma união discriminada pelo `estatuto`: `fonte-humana` tem `url: null` (entrevista não tem URL); os demais estatutos exigem `url: string`.
  - Datas usam o tipo `DataISO` (`AAAA-MM-DD`, `AAAA-MM` ou `AAAA`).
  - `Imagem` ganhou `largura` e `altura` obrigatórias, para cumprir a regra de performance de dimensões declaradas.
  - `pendente(descricao)` retorna um marcador de dados (`Pendente`), que funciona em arquivos `.ts`. O componente `BlocoPendente` o renderiza como bloco tarjado, e `ehPendente()` faz a checagem de tipo. `OuPendente<T>` marca onde o conteúdo pode estar pendente.
- **Alternativas descartadas:** `pendente()` retornando JSX (não cabe em `src/content/*.ts` nem nos campos tipados); `url` opcional para todas as fontes (enfraqueceria a checagem).
- **Consequência:** o tipo `Fonte` tem um caso a mais que o BASE.MD, e o tipo `Imagem` dois campos a mais. Revisar se a equipe discordar.

## ADR-006: Travas de lint editoriais e de design system

- **Data:** 2026-11-11
- **Contexto:** BASE.MD proíbe texto editorial em componente e valor arbitrário fora dos tokens. A Definição de pronto confere as duas coisas.
- **Decisão:** regra nativa `no-restricted-syntax` em `src/**/*.tsx`. Ela bloqueia texto solto em JSX, strings literais como filho de JSX, strings literais em `alt`, `title`, `placeholder` e `aria-label`/`aria-description`/`aria-roledescription`, e qualquer `[` dentro de `className`. Preset `jsx-a11y` no modo `strict`; `typescript-eslint` no modo `strictTypeChecked`.
- **Alternativas descartadas:** `eslint-plugin-react` com `jsx-no-literals` (dependência fora da lista).
- **Consequência:** a trava de `className` não pega classes montadas fora de um atributo JSX; a revisão humana continua necessária. Exceção legítima exige `eslint-disable-next-line` com justificativa.

## ADR-007: Roteamento e movimento reduzido

- **Data:** 2026-11-11
- **Contexto:** SPA com React Router v7 e Motion.
- **Decisão:** `createBrowserRouter` + `RouterProvider` (data mode, que suporta rotas `lazy`), rotas em `src/routes/index.tsx`. `App` envolve tudo em `<MotionConfig reducedMotion="user">`; `global.css` desliga animações e transições CSS sob `prefers-reduced-motion: reduce`. Fallback na Vercel por `rewrites` em `vercel.json`.
- **Alternativas descartadas:** `<BrowserRouter>` declarativo; `vercel.ts` (exigiria a dependência `@vercel/config`, e o BASE.MD pede `vercel.json`).
- **Consequência:** não existe página 404 (não está no Figma); rota desconhecida cai na tela de erro padrão do React Router. Pendente de decisão.

## ADR-008: Validação de PR no GitHub Actions

- **Data:** 2026-11-11
- **Contexto:** o responsável pediu validação automática de PR no GitHub, para pegar problema de build antes do merge. A árvore de pastas está congelada; `.github/` não constava nela.
- **Decisão:** criar a pasta `.github/workflows/` (autorizada pelo pedido do responsável) com `validacao.yml`. O workflow roda em PR para a `main`, em push na `main` e por disparo manual, com dois jobs:
  - **Build:** `npm ci`, `tsc --noEmit`, `eslint .`, `prettier --check .` e `vite build`.
  - **Conteúdo:** `node scripts/check-conteudo.mjs`, em modo bloqueante, que é a mesma regra da build de produção.
  - Node a partir do `.nvmrc`, cache do npm, `permissions: contents: read`, `persist-credentials: false`, e cancelamento de execuções antigas da mesma branch. Actions oficiais na v7 (`actions/checkout`, `actions/setup-node`).
- **Alternativas descartadas:** um job único (a PR com conteúdo pendente apareceria como erro de código); hook local de pre-push com husky (dependência fora da lista); depender só do check de deploy da Vercel (ele não roda lint nem formatação, e o preview ignora pendências).
- **Consequência:** PR com `pendente(...)` fica com o job **Conteúdo** vermelho, coerente com o ADR-004 (produção não recebe pendência). Tornar os jobs obrigatórios para o merge exige ruleset na `main`, que é configuração do repositório e depende de autorização.

## ADR-009: Vercel Web Analytics e Speed Insights

- **Data:** 2026-11-11
- **Contexto:** o responsável pediu a instalação do Vercel Web Analytics e do Vercel Speed Insights. As dependências estão fora da stack travada do BASE.MD; o pedido explícito do responsável é a autorização (Stop & Ask respondido).
- **Decisão:** instalar `@vercel/analytics` ^2.0.1 e renderizar `<Analytics />` (de `@vercel/analytics/react`) uma única vez em `App.tsx`, ao lado do `RouterProvider`. Modo explícito: `development` no `vite dev` (só registra no console, nada é enviado) e `production` na build. As navegações da SPA são contadas pelo próprio script, que acompanha o histórico do navegador; não há `track()` de eventos customizados.
- **Speed Insights:** instalar `@vercel/speed-insights` ^2.1.0 e renderizar `<SpeedInsights />` (de `@vercel/speed-insights/react`) também uma única vez em `App.tsx`. Ele mede os Core Web Vitals (LCP, INP, CLS etc.) de visitantes reais e serve para acompanhar o orçamento de performance (meta de LCP). O componente não aceita `mode`: o ambiente vem de `process.env.NODE_ENV`, que o Vite substitui na build (`production`) e no dev (`development`, só console). Amostragem padrão (`sampleRate` não definido).
- **Alternativas descartadas:** `inject()` em `main.tsx` (mesmo efeito, mas fora da árvore React); `mode="auto"` (depende de `process.env.NODE_ENV` dentro da dependência; o modo explícito é mais claro); outras ferramentas de analytics (fora da plataforma de deploy já em uso).
- **Consequência:** a coleta só começa depois que o Web Analytics e o Speed Insights forem ativados no painel do projeto na Vercel. A ferramenta não usa cookies e não guarda identificadores pessoais, então não exige banner de consentimento; se a equipe quiser, a página de metodologia pode mencionar a medição de audiência (texto a cargo do Jornalismo). Evento customizado novo exige ADR. Os scripts são servidos em `/_vercel/insights/*` e `/_vercel/speed-insights/*`, rotas reservadas da Vercel que o rewrite da SPA não intercepta. O Speed Insights tem cota de dados por plano na Vercel; se a cota apertar, reduzir `sampleRate` exige ADR.

## ADR-010: Skills e agentes do Claude Code em `.claude/`

- **Data:** 2026-11-11
- **Contexto:** o responsável pediu skills e agentes para apoiar as próximas fases do plano. A pasta `.claude/` não constava na árvore congelada.
- **Decisão:** criar `.claude/skills/` com uma skill por etapa (`extrair-design-tokens`, `implementar-secao`, `registrar-fonte`, `registrar-decisao`, `entregar-tarefa`, `fechamento`) e `.claude/agents/` com três agentes de revisão que só leem e apontam (`revisor-editorial`, `revisor-tecnico`, `revisor-fidelidade`). As skills repetem o mínimo das regras e remetem ao `CLAUDE.md`, que continua sendo a fonte única. Sem `.claude/settings.json` de projeto: permissões ficam a cargo de cada pessoa.
- **Alternativas descartadas:** um agente implementador por fase (concentraria decisões que são da equipe); duplicar as regras inteiras dentro de cada skill (divergiria do `CLAUDE.md`).
- **Consequência:** quem usa Claude Code segue o mesmo fluxo por etapa. Mudança de regra continua sendo feita no `CLAUDE.md`; a skill afetada é ajustada na mesma PR. As skills dependem do MCP do Figma para ler o protótipo e têm caminho alternativo por exportações.

## ADR-011: Nome do produto com acento

- **Data:** 2026-11-11
- **Contexto:** o BASE.MD escreve "Vestigios" e o arquivo do Figma "Vestigio". O responsável definiu a grafia.
- **Decisão:** o nome do produto é **Vestígios**, com acento, em todo texto visível (título da página, `src/content/site.ts`, documentação). Identificadores técnicos continuam sem acento: repositório `BrenoRev/Vestigios`, pacote `vestigios`, URLs e nomes de branch.
- **Alternativas descartadas:** manter "Vestigios" sem acento em tudo (grafia incorreta em português).
- **Consequência:** o `BASE.MD` segue com a grafia antiga por ser o documento de origem; o `CLAUDE.md` prevalece.

## ADR-012: Metas de performance

- **Data:** 2026-11-11
- **Contexto:** o BASE.MD deixava a meta de LCP (2,5 s em 4G) para validar com a equipe. O responsável pediu que ela fosse definida. O Speed Insights já está ativo e mede os Core Web Vitals de visitantes reais.
- **Decisão:** adotar os limites "bom" dos Core Web Vitals: **LCP ≤ 2,5 s**, **INP ≤ 200 ms** e **CLS ≤ 0,1**, no percentil 75 das visitas em celular, como mostra o Speed Insights. Em laboratório, antes de publicar seção pesada, o Lighthouse do Chrome em modo celular (limitação de rede padrão) precisa dar LCP ≤ 2,5 s. Scroll a 60 fps continua como meta.
- **Alternativas descartadas:** só a meta de LCP (deixaria sem meta a resposta a interação e a estabilidade do layout, que o site com animações e imagens pesadas pode piorar); meta mais agressiva, como LCP ≤ 1,8 s (difícil com fotos e texturas de primeira dobra sem saber o protótipo).
- **Consequência:** a Fase 5 confere as três métricas no Speed Insights. Seção que estoure a meta volta para ajuste ou vira Stop & Ask, sem cortar efeito do protótipo por conta própria.

## ADR-013: `BASE.MD` versionado como documento de origem

- **Data:** 2026-11-11
- **Contexto:** o `BASE.MD` é o prompt que definiu stack, regras editoriais, orçamento de performance e fases. Estava fora do Git e fora da árvore congelada.
- **Decisão:** versionar o `BASE.MD` na raiz, como registro histórico, sem edição e sem formatação automática (entra no `.prettierignore`). As regras vivas ficam no `CLAUDE.md`, que prevalece quando os dois divergem (por exemplo, nome com acento no ADR-011 e metas no ADR-012).
- **Alternativas descartadas:** manter fora do Git (quem continuar o projeto não veria a origem das regras); formatar com Prettier (alteraria o texto original).
- **Consequência:** mudança de regra nunca é feita no `BASE.MD`; vai para o `CLAUDE.md` com ADR.

## ADR-014: Fluxo de conteúdo, `CONTRIBUTING.md` e template de PR

- **Data:** 2026-11-11
- **Contexto:** o responsável informou que ninguém do Jornalismo vai mexer no repositório: a equipe fornece o material e um dev responsável registra. Conteúdo, dados e mapas serão construídos depois, por outras pessoas, então o projeto precisa estar documentado para essa passagem.
- **Decisão:**
  - o Jornalismo fornece; o dev responsável registra, sempre em `docs/fontes.md` antes de `src/content/`, e anota na PR quem confirmou o texto final e quando;
  - `CONTRIBUTING.md` na raiz com papéis, fluxo de Git, entrada de conteúdo e de dados, requisitos de mapas e Definição de pronto, remetendo ao `CLAUDE.md` para as regras completas;
  - `.github/pull_request_template.md` com a Definição de pronto e a seção de conteúdo; a skill `entregar-tarefa` monta o corpo da PR a partir dele;
  - mapas e gráficos ficam com a pessoa que for implementá-los, que abre a decisão de técnica.
- **Alternativas descartadas:** formulário de fonte no GitHub (o Jornalismo não usa o repositório); guia dentro do README (ficaria longo demais para quem só quer conhecer o projeto).
- **Consequência:** o `CLAUDE.md` deixa de dizer que o Jornalismo edita o site. Mudança de regra continua no `CLAUDE.md`; o `CONTRIBUTING.md` é atualizado na mesma PR quando o fluxo mudar.

## ADR-015: Headers de cache e segurança na Vercel

- **Data:** 2026-11-11
- **Contexto:** o responsável pediu cache longo para os arquivos versionados e cabeçalhos básicos de segurança, configurados no repositório (não no painel da Vercel).
- **Decisão:** em `vercel.json`:
  - `/assets/*` (arquivos que o Vite gera com hash no nome): `Cache-Control: public, max-age=31536000, immutable`;
  - todas as rotas: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy` desligando câmera, microfone, geolocalização, pagamento e USB, que o site não usa.
- **Alternativas descartadas:** Content-Security-Policy (exige mapear cada origem de script, fonte, imagem e mapa ainda não definidas; reavaliar na Fase 5); `X-Frame-Options` (impediria que outros veículos incorporassem a reportagem, decisão editorial que não foi tomada); cache longo em `public/fonts/` e `public/data/` (não têm hash: uma atualização ficaria presa no cache dos visitantes).
- **Consequência:** se a geolocalização ou outro recurso bloqueado entrar no protótipo (um mapa "perto de você", por exemplo), a `Permissions-Policy` precisa ser ajustada com ADR. Arquivos em `public/` que mudem de conteúdo continuam com o cache padrão da Vercel.

## ADR-016: Imagens responsivas com `vite-imagetools`

- **Data:** 2026-11-11
- **Contexto:** o orçamento de performance exige `srcset`, mas não definia quem gera as variantes. Decisão aberta com três opções; o responsável escolheu a opção B, recomendada.
- **Decisão:**
  - `vite-imagetools` ^12.0.2 como dependência de desenvolvimento (usa `sharp`; nada vai para o navegador).
  - Import com `?responsiva` aplica o preset de `vite.config.ts`: larguras 640, 960, 1280 e 1920 px, formatos AVIF e WebP, saída `picture`. O plugin não amplia imagem menor que a largura pedida.
  - O tipo `Imagem` troca `src`, `largura` e `altura` por `arquivo` (o resultado do import), de onde saem `srcset`, largura e altura reais. Substitui a parte do ADR-005 que acrescentava `largura` e `altura` manuais.
  - Componente `ImagemResponsiva` em `src/components/ui/` monta o `<picture>` (fontes AVIF e WebP, fallback WebP, `width`, `height`, `loading="lazy"`, `decoding="async"`, `fetchPriority` alto só com `primeiraDobra`). Crédito e legenda ficam com a seção, conforme o protótipo.
  - Testado com uma imagem de 2400 px: 4 larguras em cada formato e `<picture>` renderizado corretamente.
- **Alternativas descartadas:** exportação manual do Figma em várias larguras (trabalho repetitivo e sujeito a erro); Vercel Image Optimization (não funciona no `npm run dev` e consome cota do plano).
- **Consequência:** as larguras são genéricas até haver breakpoints do Figma; revisar na Fase 2 contra os breakpoints e a largura máxima do layout. As variantes vão para `/assets/` com hash e herdam o cache imutável do ADR-015. Texturas usadas como fundo em CSS são definidas na Fase 2, quando se souber como o protótipo as aplica.
