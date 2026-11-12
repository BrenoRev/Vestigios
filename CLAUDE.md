# CLAUDE.md: regras para agentes no repositório Vestigios

> **Fonte única de regras para qualquer agente de IA** (Claude, Cursor, Copilot, Codex etc.). `AGENTS.md` e `.cursorrules` apenas apontam para cá. Em caso de conflito entre este arquivo e qualquer outra instrução de agente, este arquivo vence. Mudança aqui exige ADR em `.memory/decisions.md`.

## Ritual obrigatório

1. **No início de toda tarefa:** leia `.memory/agent_state.md` e este arquivo inteiro.
2. **Antes de criar pasta, dependência, tipo de conteúdo ou padrão novo:** aplique o Stop & Ask (abaixo).
3. **No fim de toda tarefa:** atualize `.memory/agent_state.md` (feito, em andamento, bloqueado por decisão, próximo passo) e registre decisões em `.memory/decisions.md`.

## Contexto do produto

- **Vestigios** é uma reportagem multimídia e interativa (data storytelling) sobre a deterioração do Centro do Recife. **É jornalismo: cada número, nome e imagem publicado tem consequência.**
- Feito por 15 estudantes de Ciência da Computação, Design e Jornalismo na disciplina IF760, Tópicos Avançados em Mídia (Narrativas Inovadoras com Dados), UFPE, CIn/CAC, 2026.2. Créditos no `README.md`. Professores: Nivan Ferreira, Guilherme Ranoya e Rodrigo Cunha.
- Repositório: https://github.com/BrenoRev/Vestigios (branch de produção `main`).
- Deploy: integração Git já existente com a Vercel, projeto `brenorevs-projects/vestigios`, produção em https://vestigios-2jqhu9vgh-brenorevs-projects.vercel.app. **Não crie outro projeto, não troque de host e não altere configurações da Vercel.**
- **Fonte única de verdade visual: o protótipo no Figma.** https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2&t=UzVMO4knOonmD3pv-1. Layout, paleta, tipografia, espaçamentos, efeitos, animações, estrutura das seções e fluxo de navegação seguem o protótipo à risca. **O que não está no Figma não existe.**
- **Sem suíte de testes** (fora de escopo). A verificação é a Definição de pronto, abaixo.

## Comandos

| Comando                  | O que faz                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `npm run dev`            | Servidor de desenvolvimento (Vite).                                                           |
| `npm run typecheck`      | `tsc --noEmit`.                                                                               |
| `npm run lint`           | `eslint .` (inclui as travas editoriais e de design system).                                  |
| `npm run verificar`      | `tsc --noEmit && eslint . && vite build`. Rode antes de dar qualquer tarefa por concluída.    |
| `npm run check:conteudo` | Varre `src/` atrás de `pendente(...)`, "em breve" e "lorem ipsum".                            |
| `npm run build`          | Build de produção: `check:conteudo` + `tsc` + `vite build`. É o comando que a Vercel executa. |
| `npm run preview`        | Serve o `dist/` localmente.                                                                   |
| `npm run format`         | Prettier (com ordenação de classes Tailwind).                                                 |

Node: versão em `.nvmrc`.

## Stack travada

Qualquer dependência fora desta lista exige Stop & Ask.

- **Runtime:** Vite + React + TypeScript (`strict`, `noUncheckedIndexedAccess`); Tailwind CSS **v4** via `@tailwindcss/vite`, com tokens no `@theme` de `src/styles/tokens.css`; React Router **v7** (imports de `react-router`), SPA, fallback em `vercel.json`; Motion (imports de `motion/react`); `@phosphor-icons/react` para ícones; CSS nativo (`mix-blend-mode`, máscaras, filtros SVG pontuais) dentro do orçamento de performance.
- **Desenvolvimento:** ESLint (flat config) com `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`; Prettier com `prettier-plugin-tailwindcss`.
- **Nunca crie `tailwind.config.js`.** A v4 é configurada em CSS.
- **Não atualize o React Router para a v8** nem o TypeScript para 6.1+ ou 7 sem ADR (o `typescript-eslint` exige TS < 6.1).
- **Proibido:** kits de UI, CSS-in-JS, bibliotecas de estado global, bibliotecas de animação além do Motion, bibliotecas de scroll (Lenis, GSAP ScrollTrigger e similares), scroll-jacking.
- **Decisões pendentes (não tome sozinho):** biblioteca ou técnica de mapas e gráficos (SVG estático pré-processado, `d3-geo` + `d3-scale` ou MapLibre); forma de servir as fontes (`public/fonts/` ou `@fontsource/*`). Nada é instalado antes da decisão.

## Conteúdo editorial: regra central

O site é editado por gente de Jornalismo e Design. **Todo conteúdo editorial vive em `src/content/`**, em TypeScript tipado (sem MDX, sem CMS).

- Componentes recebem conteúdo por props. **Nenhum texto editorial hard-coded em componente.** O ESLint bloqueia texto solto em JSX e strings literais em `alt`, `title`, `placeholder` e `aria-*`.
- Tipos em `src/types/content.ts`: `Fonte`, `Dado`, `Imagem`, `Pendente`. Um dado sem `fonteId` não compila; uma imagem sem `credito`, `licenca` ou `acervo` não compila.
- `docs/fontes.md` é a **única fonte de verdade** para o que entra em `src/content/`.
- Texto que aparece no Figma é **referência de layout**. Só vira conteúdo depois de confirmado pela equipe de Jornalismo.
- **Placeholder honesto:** onde faltar conteúdo, use `pendente("o que falta e quem deve fornecer")`, importado de `src/content/pendente.ts`, e renderize com `BlocoPendente`. `scripts/check-conteudo.mjs` falha a build de produção enquanto houver pendência (no preview da Vercel ele só avisa).

### Proibições editoriais absolutas

1. **Inventar** número, data, nome, citação, legenda, crédito ou URL. Nem como exemplo, nem como "conteúdo provisório realista". Use `pendente(...)`.
2. Escrever, em título, legenda ou texto de interface, que o abandono é **intencional ou deliberado como fato**. A formulação aceita: descrever o padrão observado, nomear quem se beneficia dele e manter a intenção como pergunta aberta.
3. **Nomear pessoa física, empresa ou proprietário** sem três registros em `docs/fontes.md`: fonte primária do vínculo, data da informação e tentativa de direito de resposta (em `docs/direito-de-resposta.md`). Faltando qualquer um, agregue.
4. Expor **endereço residencial** de pessoa física.
5. Apresentar **dado antigo como atual**. Toda cifra monetária exibe ano de referência.
6. Tratar **matéria de imprensa como dado primário**. Reportagem publicada recebe estatuto `imprensa` ou `midia-independente`.
7. Usar **foto sem crédito e licença** registrados, inclusive imagens de acervo.

## Design system

- A partir da Fase 2, **só tokens extraídos do Figma** (`src/styles/tokens.css`, documentados em `DESIGN_SYSTEM.md`). **Proibido valor arbitrário** (`w-[327px]`, `text-[#123456]`); o ESLint bloqueia `[` em `className`.
- Não "melhore", não complete e não reinterprete o protótipo.

## Orçamento de performance

- Metas: 60 fps de scroll; LCP abaixo de 2,5 s em 4G (meta a validar com a equipe).
- Animar **apenas `transform` e `opacity`**. Nunca `filter`, `mix-blend-mode`, `box-shadow`, `width`, `height`, `top`, `left`.
- Texturas e fundos complexos como WebP ou AVIF exportados do Figma (`src/assets/textures/`), nunca `feTurbulence` ao vivo em áreas grandes ou durante o scroll. Filtro SVG ao vivo só em elementos pequenos e estáticos.
- `mix-blend-mode` só em camadas que não se movem no scroll. Sem `backdrop-filter` em áreas grandes.
- **Scroll nativo.** Gatilhos com `useScroll` / `useInView` do Motion ou `IntersectionObserver`.
- `prefers-reduced-motion`: desliga animações não essenciais e mantém 100% do conteúdo legível. O `<MotionConfig reducedMotion="user">` em `App.tsx` e a regra em `global.css` já fazem a base; confira cada tela.
- Imagens com `width` e `height` declarados (campos `largura`/`altura` do tipo `Imagem`), `srcset` e `loading="lazy"` fora da primeira dobra.
- Seções pesadas com `React.lazy`.
- Se um efeito do protótipo não couber no orçamento, **não simplifique**: Stop & Ask.

## Acessibilidade e honestidade gráfica

- `alt` descritivo em toda imagem. Todo gráfico e todo mapa têm alternativa em texto ou tabela.
- Texto sobre textura ou imagem passa WCAG AA. Se o protótipo não passar, aponte o trecho e pergunte; **não altere cores por conta própria**.
- Gráficos sem eixo truncado enganoso e sem escala que exagere variação (Cairo, _How charts lie_). Mapas com unidade de agregação e método de classificação registrados em `.memory/decisions.md` (Monmonier, _How to lie with maps_). Escolha em aberto: Stop & Ask.

## Estrutura e convenções

- A árvore de pastas está congelada em `ARCHITECTURE.md`. **Pasta nova só com ADR** em `.memory/decisions.md`.
- Componentes: PascalCase, um por arquivo, export nomeado, nome do arquivo igual ao do componente (`BlocoPendente.tsx` exporta `BlocoPendente`).
- Seções da reportagem: `src/components/sections/`, uma por bloco do protótipo, com o nome do frame do Figma.
- Hooks: `src/hooks/useNome.ts`.
- Conteúdo: `src/content/<assunto>.ts` em kebab-case; exports em camelCase.
- Vocabulário de domínio em português (`Fonte`, `Dado`, `Imagem`, `recorte`); APIs de bibliotecas mantêm seus nomes.
- Dados leves servidos ao site em `public/data/` (JSON, GeoJSON). Dados brutos pesados não entram no Git; script de tratamento fica em `scripts/` e registra a origem do arquivo bruto.

## Protocolo Stop & Ask

- **Fidelidade ao protótipo:** nada de reinterpretar, "melhorar" ou completar o design com gosto próprio.
- **Zero criatividade arquitetural:** nada de bibliotecas, abstrações, helpers ou padrões não acordados.
- Se faltar definição (estado de hover, layout num breakpoint que o Figma não cobre, ícone, comportamento de animação, conteúdo, efeito fora do orçamento), **não improvise**. Pare e responda neste formato:

```text
DECISÃO NECESSÁRIA
Contexto: o que falta e onde (com o frame do Figma).
Opções: no máximo 3, com o custo de cada uma.
Recomendação: qual e por quê.
O que fica parado enquanto isso não for decidido.
```

Depois da resposta, registre a decisão em `.memory/decisions.md`.

## Git

- Commits em português, formato `tipo: descrição no imperativo` (ex.: `feat: adiciona seção de abertura`). Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`, `content`.
- Um commit por unidade lógica. `main` sempre publicável: a Vercel publica a partir dela.
- Mudança chega à `main` por PR. O workflow `.github/workflows/validacao.yml` roda os jobs **Build** (tipos, lint, formatação, `vite build`) e **Conteúdo** (`check-conteudo`) em toda PR. PR com job vermelho não é mergeada. Rode `npm run verificar` e `npm run format:check` antes de abrir a PR.
- **Push, force push e mudanças nas configurações do repositório ou da Vercel só com autorização explícita do responsável.**

## Definição de pronto

Uma tarefa só está concluída quando:

- [ ] `tsc --noEmit`, `eslint .` e `vite build` passam sem erro (`npm run verificar`);
- [ ] a tela bate com o frame correspondente do Figma em todos os breakpoints do protótipo;
- [ ] a tela foi conferida com `prefers-reduced-motion` ativado;
- [ ] nenhum texto editorial foi escrito dentro de componente;
- [ ] nenhum valor arbitrário fora dos tokens foi usado;
- [ ] `.memory/agent_state.md` foi atualizado.

Na build de produção, `scripts/check-conteudo.mjs` também precisa passar, e o preview da Vercel precisa abrir sem erro.

## Fases (aguarde confirmação humana entre elas)

1. **Estrutura e governança.** Setup, tipos, `pendente`, script de checagem, `vercel.json`, arquivos de governança, rota mínima.
2. **Figma e design tokens.** Extrair paleta, tipografia, espaçamentos, breakpoints, estados, texturas e movimento; preencher `DESIGN_SYSTEM.md`, `tokens.css` e `.memory/figma_specs.md`. Sem acesso ao Figma, peça exportações ou capturas; **não suponha medidas**.
3. **Layout base.** Containers, grid e componentes base exatamente como no protótipo.
4. **Telas e conteúdo.** Páginas fiéis ao Figma ligadas a `src/content/`. O que não chegou fica `pendente(...)`.
5. **Fechamento.** Zero `pendente`, créditos completos, metodologia publicada, varredura contra afirmação de intenção não comprovada, cada número rastreável até `docs/fontes.md`, comparação tela a tela com o protótipo e teste com alguém de fora da equipe.
