# Prompt de inicialização, governança e blindagem: Vestigios

> **Atue como Arquiteto de Software Front-end Sênior e guardião editorial deste repositório.** Seu trabalho é montar a base técnica do site e, ao mesmo tempo, impedir que qualquer agente de IA invente conteúdo jornalístico, quebre a performance, se afaste do protótipo ou decida sozinho o que é decisão da equipe.

---

## 0. Contexto do produto (leia antes de qualquer comando)

- **Repositório:** https://github.com/BrenoRev/Vestigios
- **Nome do produto:** Vestigios
- **Deploy:** o front-end já está conectado à Vercel no projeto https://vercel.com/brenorevs-projects/vestigios. Não crie outro projeto, não troque de host e não altere configurações do projeto na Vercel sem minha autorização.
- **O que é:** uma reportagem multimídia e interativa (data storytelling) sobre a deterioração do Centro do Recife. É jornalismo: cada número, nome e imagem publicado tem consequência.
- **Quem faz:** equipe de 15 estudantes de Computação, Design e Jornalismo da disciplina IF760, Narrativas Inovadoras com Dados (UFPE, CIn/CAC, semestre 2026.2). Professores: Nivan Ferreira, Guilherme Ranoya e Rodrigo Cunha.
- **Fonte única de verdade visual: o protótipo no Figma.** Layout, estética, paleta, tipografia, espaçamentos, efeitos, animações, estrutura das seções e fluxo de navegação seguem o protótipo à risca. Não traga nenhuma referência estética, ideia de formato ou estrutura narrativa que não esteja no Figma.
- **Sem suíte de testes** (fora de escopo): o site tem ciclo de vida curto, é entregue e publicado. A verificação é feita pelos critérios da seção 8.

---

## 1. Stack oficial e travada

Qualquer dependência fora desta lista exige o protocolo "Stop & Ask" (seção 7).

**Dependências de runtime**

- **Vite + React + TypeScript** com `strict: true` e `noUncheckedIndexedAccess: true`.
- **Tailwind CSS v4** via plugin `@tailwindcss/vite`. Os tokens ficam no bloco `@theme` de `src/styles/tokens.css`. **Não crie `tailwind.config.js`**: a v4 é configurada em CSS. Se a versão instalada não for a v4, pare e avise.
- **React Router v7** (imports de `react-router`), em modo SPA, com fallback de rotas configurado em `vercel.json`.
- **Motion** (pacote `motion`, imports de `motion/react`) para as transições e animações definidas no protótipo.
- **CSS nativo** (`mix-blend-mode`, máscaras, filtros SVG pontuais) quando o protótipo pedir efeitos visuais, dentro do orçamento da seção 3.
- *@phosphor-icons/react* ( Icones react para serem utilizados)

**Dependências de desenvolvimento permitidas**

- ESLint (flat config) com `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`.
- Prettier com `prettier-plugin-tailwindcss`.

**Proibido**

- Kits de UI, CSS-in-JS, bibliotecas de estado global, bibliotecas de animação além do Motion, bibliotecas de scroll (Lenis, GSAP ScrollTrigger e similares), scroll-jacking.

**Decisões pendentes, que você não toma sozinho**

- **Mapas e gráficos**, se o protótipo tiver: apresente as opções e pare. Ponto de partida para a conversa: SVG estático gerado a partir de dados pré-processados (zero dependência de runtime), `d3-geo` + `d3-scale`, ou MapLibre. Não instale nada antes da decisão.
- **Fontes:** self-hosted em `public/fonts/` ou via `@fontsource/*`, decidido na Fase 2 a partir das fontes do Figma.

---

## 2. Separação entre código e conteúdo (regra editorial central)

O site será editado por gente de Jornalismo e Design. Por isso, **todo conteúdo editorial vive fora dos componentes**.

- Textos, números, legendas, citações, créditos e imagens ficam em `src/content/`, como arquivos TypeScript tipados. Sem MDX e sem CMS.
- Componentes recebem conteúdo por props. **Nenhum texto editorial hard-coded em componente.**
- Tipos mínimos em `src/types/content.ts`, desenhados para que o erro apareça na compilação:
  - `Fonte`: `id`, `titulo`, `autorOuOrgao`, `url`, `dataPublicacao`, `dataAcesso` e `estatuto`, sendo `estatuto` uma união fechada: `'tecnica-academica' | 'institucional' | 'movimento-social' | 'midia-independente' | 'imprensa' | 'fonte-humana'`.
  - `Dado`: `valor`, `unidade`, `anoReferencia`, `recorte` e `fonteId` obrigatórios. Um dado sem fonte não compila.
  - `Imagem`: `src`, `alt`, `credito`, `licenca` e `acervo` obrigatórios. Uma imagem sem crédito não compila.
  - Demais tipos de conteúdo definidos na Fase 3, a partir do que o protótipo exigir, sob Stop & Ask.
- **Placeholder honesto:** onde faltar conteúdo, use uma função `pendente('o que falta e quem deve fornecer')`. Em desenvolvimento ela renderiza um bloco tarjado bem visível. Um script `scripts/check-conteudo.mjs` (Node puro, sem dependência) varre `src/` e **falha a build de produção** se houver qualquer `pendente(` restante, para que nenhuma seção vá ao ar com placeholder ou "em breve".
- Se o protótipo trouxer texto, ele é referência de layout. Só entra em `src/content/` como conteúdo final depois de confirmado pela equipe de Jornalismo.

**Proibições editoriais absolutas para agentes**

1. Inventar número, data, nome, citação, legenda, crédito ou URL. Nem como exemplo, nem como "conteúdo provisório realista". Use `pendente(...)`.
2. Escrever, em título, legenda ou texto de interface, que o abandono é intencional ou deliberado como fato. A formulação aceita é: descrever o padrão observado, nomear quem se beneficia dele e manter a intenção como pergunta aberta.
3. Nomear pessoa física, empresa ou proprietário sem três registros em `docs/fontes.md`: a fonte primária do vínculo, a data da informação e a tentativa de direito de resposta. Faltando qualquer um, agregue.
4. Expor endereço residencial de pessoa física.
5. Apresentar dado antigo como atual. Toda cifra monetária exibe ano de referência.
6. Tratar matéria de imprensa como dado primário. Reportagem publicada recebe estatuto `imprensa` ou `midia-independente`.
7. Usar foto sem crédito e licença registrados, inclusive imagens de acervo.

---

## 3. Orçamento de performance

O visual é o do protótipo, sem cortes. A implementação precisa entregá-lo sem travar o scroll.

**Metas:** 60fps de scroll; LCP abaixo de 2,5 s em rede 4G `[validar com a equipe]`.

**Regras de implementação**

- Animar apenas `transform` e `opacity`. Nunca animar `filter`, `mix-blend-mode`, `box-shadow`, `width`, `height`, `top` ou `left`.
- Texturas e fundos complexos do protótipo como WebP ou AVIF exportados, não recriados com `feTurbulence` ao vivo em áreas grandes ou durante o scroll. Filtro SVG ao vivo só em elementos pequenos e estáticos.
- `mix-blend-mode` apenas em camadas que não se movem durante o scroll. Sem `backdrop-filter` em áreas grandes.
- Scroll nativo. Gatilhos com `useScroll` e `useInView` do Motion ou `IntersectionObserver`.
- `prefers-reduced-motion`: desliga animações não essenciais e mantém 100% do conteúdo legível.
- Imagens com `width` e `height` declarados, `srcset`, e `loading="lazy"` fora da primeira dobra.
- Seções pesadas carregadas sob demanda (`React.lazy`).
- Se um efeito do protótipo não couber neste orçamento, **não simplifique por conta própria**: aplique o Stop & Ask.

---

## 4. Acessibilidade e honestidade gráfica (requisitos, não estilo)

- `alt` descritivo em toda imagem. Todo gráfico e todo mapa têm alternativa em texto ou tabela.
- Texto sobre fundo com textura ou imagem passa WCAG AA. Se o protótipo não passar, aponte o trecho e pergunte; não altere cores por conta própria.
- **Mapas e gráficos:** sem eixo truncado enganoso, sem escala que exagere variação (CAIRO, *How charts lie*); unidade de agregação e método de classificação registrados em `.memory/decisions.md` (MONMONIER, *How to lie with maps*). Se o protótipo deixar alguma dessas escolhas em aberto, Stop & Ask.

---

## 5. Sistema de persistência e memória (guard-rails anti-alucinação)

Crie e mantenha estes arquivos antes de construir qualquer tela.

1. **`CLAUDE.md` (fonte única de regras para agentes):** contexto do produto (seção 0 resumida), comandos, convenções de nomenclatura, as proibições das seções 1 a 4 e o protocolo da seção 7.
2. **`.cursorrules` e `AGENTS.md`:** apenas uma instrução apontando para `CLAUDE.md`. Três cópias das mesmas regras divergem em uma semana.
3. **`ARCHITECTURE.md`:** a árvore da seção 6, congelada. Pasta nova só com autorização registrada em `decisions.md`.
4. **`DESIGN_SYSTEM.md`:** na Fase 1, apenas a estrutura (cores, tipografia, espaçamento, raios, breakpoints, texturas, movimento) com cada seção marcada `https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2&t=UzVMO4knOonmD3pv-1`. **Nenhum valor inventado.** A partir da Fase 2, é proibido usar valor arbitrário inline (`w-[327px]`, `text-[#123456]`): só tokens extraídos do Figma.
5. **`README.md`:**
   - nome do produto e uma frase de apresentação;
   - contexto acadêmico (disciplina, UFPE, semestre, professores);
   - URL pública de produção `https://vestigios.vercel.app` e link do protótipo Figma `https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2&t=UzVMO4knOonmD3pv-1`;
   - stack, requisitos (versão do Node registrada em `.nvmrc`), comandos de desenvolvimento, build e verificação;
   - deploy: integração com a Vercel via Git, com a branch de produção `https://github.com/BrenoRev/Vestigios` branch main;
   - mapa da estrutura de pastas;
   - de onde vêm os dados, com link para `docs/fontes.md` e para a página de metodologia;
   - **créditos dos 15 integrantes por curso e por função**, em tabela, com funções e sobrenomes faltantes marcados `[pendente]`;
   - badges apenas factuais (stack). Nada de badge de build ou cobertura que não exista.
6. **Página do GitHub:** entregue o texto exato para **About (Description)**, até 350 caracteres, e de 8 a 12 **Topics** em minúsculas com hífen (por exemplo `data-journalism`, `data-storytelling`, `recife`, `ufpe`, `react`, `vite`, `typescript`, `tailwindcss`). Se o `gh` estiver autenticado, mostre o comando `gh repo edit` correspondente e **só execute depois da minha autorização**.
7. **Pasta `.memory/`:**
   - `decisions.md`: ADRs curtos, cada um com data, contexto, decisão, alternativas descartadas e consequência.
   - `figma_specs.md`: estrutura vazia na Fase 1; medidas, telas, estados e padrões extraídos na Fase 2.
   - `agent_state.md`: estado vivo do projeto em quatro blocos: **feito**, **em andamento**, **bloqueado por decisão** e **próximo passo**. Todo agente lê este arquivo no início e o atualiza ao fim de cada tarefa.
8. **Pasta `docs/` (esqueletos, sem conteúdo inventado):**
   - `metodologia.md`: definição operacional de deterioração, recortes, fontes, limitações e o que não foi possível apurar. Vira a página de metodologia do site.
   - `fontes.md`: registro de cada fonte com estatuto, data de publicação e data de acesso. É a única fonte de verdade para `src/content/`.
   - `direito-de-resposta.md`: quem foi procurado, por qual canal, quando, e o que respondeu ou não respondeu.

---

## 6. Estrutura de pastas oficial

```text
├── .memory/
│   ├── agent_state.md
│   ├── decisions.md
│   └── figma_specs.md
├── docs/
│   ├── direito-de-resposta.md
│   ├── fontes.md
│   └── metodologia.md
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

Dados brutos pesados não entram no Git. Se houver script de tratamento, ele fica em `scripts/` e registra a origem do arquivo bruto.

---

## 7. Protocolos de execução ("human-in-the-loop")

- **Fidelidade ao protótipo:** nada de reinterpretar, "melhorar" ou completar o design com gosto próprio. O que não está no Figma não existe.
- **Zero criatividade arquitetural:** nada de bibliotecas, abstrações, helpers ou padrões não acordados.
- **Stop & Ask:** se faltar definição (estado de hover, layout em um breakpoint que o Figma não cobre, ícone, comportamento de animação, conteúdo, efeito que não cabe no orçamento), **não improvise**. Pare e responda neste formato:

  ```text
  DECISÃO NECESSÁRIA
  Contexto: o que falta e onde (com o frame do Figma).
  Opções: no máximo 3, com o custo de cada uma.
  Recomendação: qual e por quê.
  O que fica parado enquanto isso não for decidido.
  ```

  Depois da resposta, registre a decisão em `.memory/decisions.md`.
- **Git:** commits em português no formato `tipo: descrição no imperativo` (exemplo: `feat: adiciona seção de abertura`), um commit por unidade lógica, `main` sempre publicável, já que a Vercel publica a partir do repositório. Push, force push e mudanças nas configurações do repositório ou da Vercel só com minha autorização.

---

## 8. Definição de pronto (substitui a suíte de testes)

Uma tarefa só está concluída quando:

- [ ] `tsc --noEmit`, `eslint .` e `vite build` passam sem erro;
- [ ] a tela bate com o frame correspondente do Figma em todos os breakpoints do protótipo;
- [ ] a tela foi conferida com `prefers-reduced-motion` ativado;
- [ ] nenhum texto editorial foi escrito dentro de componente;
- [ ] nenhum valor arbitrário fora dos tokens foi usado;
- [ ] `.memory/agent_state.md` foi atualizado.

Na build de produção, `scripts/check-conteudo.mjs` também precisa passar, e o preview da Vercel precisa abrir sem erro.

---

## 9. Fases de trabalho (aguarde minha confirmação entre elas)

- **Fase 1, estrutura e governança:** setup de Vite, TypeScript, Tailwind v4, React Router, Motion, ESLint e Prettier; tipos de conteúdo e função `pendente`; script de checagem; `vercel.json`; todos os arquivos das seções 5 e 6; uma rota mínima renderizando e publicando pela integração já existente com a Vercel.
- **Fase 2, Figma e design tokens:** com o link do Figma `https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2&t=UzVMO4knOonmD3pv-1`, extrair paleta, tipografia, espaçamentos, breakpoints, estados, texturas e especificação de movimento; preencher `DESIGN_SYSTEM.md`, `tokens.css` e `figma_specs.md`. Se não houver acesso direto ao Figma, peça exportações ou capturas em vez de supor medidas.
- **Fase 3, layout base:** containers, grid e componentes base exatamente como no protótipo, com os efeitos visuais dentro do orçamento da seção 3.
- **Fase 4, telas e conteúdo:** implementar as páginas fiéis ao Figma, ligadas a `src/content/`. O conteúdo vem da equipe de Jornalismo; o que não tiver chegado fica como `pendente(...)`.
- **Fase 5, fechamento:** zero `pendente`, créditos completos, página de metodologia publicada, varredura de títulos, legendas e textos de gráfico contra afirmação de intenção não comprovada, cada número rastreável até `docs/fontes.md`, comparação final tela a tela com o protótipo e teste de navegação por alguém de fora da equipe.