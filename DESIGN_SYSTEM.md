# Design system: Vestigios

> **Fonte única de verdade:** o protótipo no Figma.
> https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2&t=UzVMO4knOonmD3pv-1
>
> **Estado: Fase 1, apenas estrutura.** Nenhum valor foi preenchido, e nenhum deve ser inventado. Os valores entram na Fase 2, extraídos do Figma (ou de exportações e capturas fornecidas pela equipe de Design) e espelhados em `src/styles/tokens.css`.
>
> **Regra a partir da Fase 2:** é proibido usar valor arbitrário inline (`w-[327px]`, `text-[#123456]`). Só tokens daqui.

Para cada seção, registrar: nome do token, valor, nome do estilo/variável no Figma e frame de origem.

## Cores

`[a extrair do Figma]` (link acima)

| Token | Valor | Estilo no Figma | Uso | Frame de origem |
| ----- | ----- | --------------- | --- | --------------- |

Contraste: registrar aqui cada par texto/fundo e o resultado WCAG AA. Par que não passar vai para Stop & Ask, sem ajuste de cor por conta própria.

## Tipografia

`[a extrair do Figma]` (link acima)

| Token | Família | Peso | Tamanho | Altura de linha | Espaçamento entre letras | Frame de origem |
| ----- | ------- | ---- | ------- | --------------- | ------------------------ | --------------- |

Forma de servir as fontes (`public/fonts/` ou `@fontsource/*`): decisão pendente da Fase 2. Registrar licença de cada família.

## Espaçamento

`[a extrair do Figma]` (link acima)

| Token | Valor | Frame de origem |
| ----- | ----- | --------------- |

## Raios

`[a extrair do Figma]` (link acima)

| Token | Valor | Frame de origem |
| ----- | ----- | --------------- |

## Breakpoints

`[a extrair do Figma]` (link acima)

| Token | Largura mínima | Frame do Figma que o define |
| ----- | -------------- | --------------------------- |

Breakpoint que o Figma não cobre: Stop & Ask.

## Texturas

`[a extrair do Figma]` (link acima)

| Nome | Arquivo em `src/assets/textures/` | Formato (WebP/AVIF) | Dimensões | Onde é usada | Camada (`mix-blend-mode`?) |
| ---- | --------------------------------- | ------------------- | --------- | ------------ | -------------------------- |

Texturas são exportadas do Figma, não recriadas com filtros ao vivo (orçamento de performance em `CLAUDE.md`).

## Movimento

`[a extrair do Figma]` (link acima)

| Token | Duração | Curva (easing) | Propriedades animadas (só `transform`/`opacity`) | Gatilho | Comportamento com `prefers-reduced-motion` | Frame de origem |
| ----- | ------- | -------------- | ------------------------------------------------ | ------- | ------------------------------------------ | --------------- |
