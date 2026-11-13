# Design system: Vestígios

> **Fonte única de verdade:** o protótipo no Figma.
> https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2&t=UzVMO4knOonmD3pv-1
>
> **Estado: Fase 2 concluída em 2026-11-13** (ADR-017 e ADR-018). Os valores vêm do arquivo `.fig` exportado pelo Design e foram conferidos com o MCP do Figma na cópia de trabalho (fileKey `deTyWOTv6xMUkI0jWhaJPP`). Nenhum valor foi inventado. Inventário de telas, método de extração e divergências em [`.memory/figma_specs.md`](./.memory/figma_specs.md).
>
> **Regra a partir da Fase 2:** é proibido usar valor arbitrário inline (`w-[327px]`, `text-[#123456]`). Só tokens daqui.

## Situação de cada grupo

| Grupo                  | Situação                     | Como usar                                                                                                                                                                                                                                                                                                   |
| ---------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cores primitivas (40)  | **Token**                    | `bg-terra-900`, `text-areia-100`. As cores padrão do Tailwind foram removidas.                                                                                                                                                                                                                              |
| Temas por capítulo (6) | **Token**                    | `data-tema="a1"` a `"c"` numa seção redefine `--cor-*`; use `bg-fundo`, `text-texto`, `text-texto-suave`, `bg-superficie`, `bg-destaque`, `text-sobre-destaque`, `border-borda`. Sem `data-tema`, vale o A1. No A2, `border-borda` não vale: a variável é herdada e renderiza a borda do tema do ancestral. |
| Cores de dado (5)      | **Token** (`:root`)          | `var(--dado-abandonado)` etc.                                                                                                                                                                                                                                                                               |
| Espaçamento            | **Token** + base do Tailwind | `p-espaco-5` quando o valor está na escala; senão o múltiplo de 4px do Tailwind (`p-2.5` = 10px). Nunca `[...]`.                                                                                                                                                                                            |
| Raios                  | **Token**                    | `rounded-raio-12` etc. Os utilitários padrão de raio, tipografia e sombra do Tailwind (`rounded-lg`, `text-lg`, `shadow-*`) continuam existindo, mas não são do Figma e não devem ser usados.                                                                                                               |
| Famílias de fonte (5)  | **Token** e carregadas       | `font-public-sans` etc. Fontes servidas por `@fontsource`.                                                                                                                                                                                                                                                  |
| Escala tipográfica     | **Por componente**           | Tokens criados junto de cada componente, a partir do frame (ADR-018).                                                                                                                                                                                                                                       |
| Breakpoints            | **Token**                    | `md` (768) e `lg` (1024); a base é o Mobile (360).                                                                                                                                                                                                                                                          |
| Bordas                 | **Sem token**                | Utilitário criado quando o primeiro componente precisar (1,5px não existe no Tailwind).                                                                                                                                                                                                                     |
| Movimento              | **Sem token**                | Definido junto do componente Botão (ADR-018).                                                                                                                                                                                                                                                               |

## Cores

### Primitivas (coleção "Primitivos")

No Figma os primitivos têm `codeSyntax` `var(--areia-100)` e os espaçamentos `var(--espaco-1)`. Em `tokens.css` ganham o prefixo do namespace do Tailwind (`--color-areia-100`, `--spacing-espaco-1`) para gerar utilitários (`bg-areia-100`, `p-espaco-1`). Temas e cores de dado mantêm o nome do `codeSyntax`.

| Token (`tokens.css`)   | Valor     | Variável no Figma | Usada em                    |
| ---------------------- | --------- | ----------------- | --------------------------- |
| `--color-terra-700`    | `#6b5a43` | `terra/700`       | A1                          |
| `--color-terra-900`    | `#2a2118` | `terra/900`       | A1                          |
| `--color-ferrugem-600` | `#7a3b12` | `ferrugem/600`    | A1                          |
| `--color-ferrugem-700` | `#a33b17` | `ferrugem/700`    | C                           |
| `--color-areia-100`    | `#e9dfcc` | `areia/100`       | A1                          |
| `--color-areia-200`    | `#d5c4a3` | `areia/200`       | A1                          |
| `--color-areia-300`    | `#c9b99c` | `areia/300`       | A1                          |
| `--color-cimento-200`  | `#cfcac0` | `cimento/200`     | A2                          |
| `--color-cimento-300`  | `#b9b4aa` | `cimento/300`     | A2                          |
| `--color-cimento-800`  | `#3e3a33` | `cimento/800`     | A2                          |
| `--color-cimento-900`  | `#2b2823` | `cimento/900`     | A2                          |
| `--color-ruina-100`    | `#e6e2da` | `ruina/100`       | A3                          |
| `--color-ruina-400`    | `#a8a298` | `ruina/400`       | A3                          |
| `--color-ruina-600`    | `#3a3835` | `ruina/600`       | A3                          |
| `--color-ruina-700`    | `#363330` | `ruina/700`       | A3                          |
| `--color-ruina-800`    | `#2a2826` | `ruina/800`       | A3                          |
| `--color-ruina-900`    | `#1e1d1c` | `ruina/900`       | A3                          |
| `--color-cobre-300`    | `#e0a877` | `cobre/300`       | A3                          |
| `--color-verde-50`     | `#eef3ec` | `verde/50`        | A4                          |
| `--color-verde-100`    | `#dce6da` | `verde/100`       | A4                          |
| `--color-verde-600`    | `#3e5442` | `verde/600`       | A4                          |
| `--color-verde-700`    | `#2f5a3a` | `verde/700`       | A4                          |
| `--color-verde-900`    | `#1f2b21` | `verde/900`       | A4                          |
| `--color-noite-100`    | `#e4e8ee` | `noite/100`       | B                           |
| `--color-noite-300`    | `#b7c0cc` | `noite/300`       | B                           |
| `--color-noite-400`    | `#9aa4b2` | `noite/400`       | dado                        |
| `--color-noite-700`    | `#2a313b` | `noite/700`       | B                           |
| `--color-noite-800`    | `#1a2129` | `noite/800`       | B                           |
| `--color-noite-900`    | `#12161c` | `noite/900`       | B                           |
| `--color-laranja-400`  | `#f0a35e` | `laranja/400`     | B, dado                     |
| `--color-salmao-300`   | `#f0a07e` | `salmao/300`      | dado                        |
| `--color-azul-400`     | `#7fb2f0` | `azul/400`        | dado                        |
| `--color-azul-700`     | `#2c5d8f` | `azul/700`        | nenhum tema nem cor de dado |
| `--color-rio-700`      | `#1f3a52` | `rio/700`         | dado                        |
| `--color-tinta-300`    | `#b9c0c8` | `tinta/300`       | C                           |
| `--color-tinta-600`    | `#3b424b` | `tinta/600`       | C                           |
| `--color-tinta-900`    | `#1b1f24` | `tinta/900`       | C                           |
| `--color-papel-100`    | `#eef0f1` | `papel/100`       | C                           |
| `--color-papel-200`    | `#dde3ea` | `papel/200`       | nenhum tema nem cor de dado |
| `--color-branco`       | `#ffffff` | `branco`          | C                           |

`azul/700` e `papel/200` existem no Figma, mas nenhum tema nem cor de dado aponta para elas.

### Temas por capítulo

O Design definiu seis temas, cada um com as mesmas variáveis semânticas ("trocar de capítulo é trocar a coleção, não redesenhar o componente"). Cada variável tem um `codeSyntax` WEB, por exemplo `var(--a1-cor-texto)`, que `tokens.css` repete. Frame de origem da documentação: "Fundamentos" (`2:771`), seção Cores.

| Variável semântica   | A1 Antes                 | A2 Esvaziamento         | A3 Ruína              | A4 Reconstrução       | B Mapa                  | C Dossiê                 |
| -------------------- | ------------------------ | ----------------------- | --------------------- | --------------------- | ----------------------- | ------------------------ |
| `cor/fundo`          | `areia/100` `#e9dfcc`    | `cimento/300` `#b9b4aa` | `ruina/800` `#2a2826` | `verde/100` `#dce6da` | `noite/900` `#12161c`   | `papel/100` `#eef0f1`    |
| `cor/superficie`     | `areia/200` `#d5c4a3`    | `cimento/200` `#cfcac0` | `ruina/700` `#363330` | `verde/50` `#eef3ec`  | `noite/800` `#1a2129`   | `branco` `#ffffff`       |
| `cor/texto`          | `terra/900` `#2a2118`    | `cimento/900` `#2b2823` | `ruina/100` `#e6e2da` | `verde/900` `#1f2b21` | `noite/100` `#e4e8ee`   | `tinta/900` `#1b1f24`    |
| `cor/texto-suave`    | `terra/700` `#6b5a43`    | `cimento/800` `#3e3a33` | `ruina/400` `#a8a298` | `verde/600` `#3e5442` | `noite/300` `#b7c0cc`   | `tinta/600` `#3b424b`    |
| `cor/destaque`       | `ferrugem/600` `#7a3b12` | `cimento/900` `#2b2823` | `cobre/300` `#e0a877` | `verde/700` `#2f5a3a` | `laranja/400` `#f0a35e` | `ferrugem/700` `#a33b17` |
| `cor/sobre-destaque` | `areia/100` `#e9dfcc`    | `cimento/300` `#b9b4aa` | `ruina/900` `#1e1d1c` | `verde/50` `#eef3ec`  | `noite/900` `#12161c`   | `branco` `#ffffff`       |
| `cor/borda`          | `areia/300` `#c9b99c`    | **ausente**             | `ruina/600` `#3a3835` | `verde/700` `#2f5a3a` | `noite/700` `#2a313b`   | `tinta/300` `#b9c0c8`    |

O tema **A2 Esvaziamento** não tem `cor/borda`, e o texto de Fundamentos diz que todos têm as mesmas sete variáveis. Não foi inventado valor para ele.

### Cores de dado (coleção "Dados")

Situação dos prédios e pendências. Frame de origem: "Fundamentos" (`2:771`), seção "Cores de dado".

| Token                | Aponta para   | Valor     | Variável no Figma  |
| -------------------- | ------------- | --------- | ------------------ |
| `--dado-abandonado`  | `laranja/400` | `#f0a35e` | `dado/abandonado`  |
| `--dado-reversao`    | `azul/400`    | `#7fb2f0` | `dado/reversao`    |
| `--dado-a-confirmar` | `noite/400`   | `#9aa4b2` | `dado/a-confirmar` |
| `--dado-a-apurar`    | `salmao/300`  | `#f0a07e` | `dado/a-apurar`    |
| `--dado-agua`        | `rio/700`     | `#1f3a52` | `dado/agua`        |

Fundamentos diz que laranja e azul diferem também em luminosidade, então a leitura não depende só do matiz (seguro para daltonismo). As cores de dado foram pensadas para fundo escuro (tema B e A3); sobre fundos claros ficam abaixo de 3:1, exceto `dado/agua`, que é escura.

### Cores literais nas telas

Nas telas (Desktop, Tablet, Mobile e Navbar), 0 de 140 preenchimentos sólidos estão ligados a variáveis; os componentes (Botões, Filtro, Marcador, Selo) estão ligados na maior parte. Das 13 cores sólidas distintas das telas, 7 existem nos primitivos (`tinta/600`, `ferrugem/600`, `ruina/900`, `branco`, `terra/900`, `papel/100`, `areia/100`) e **6 não existem**: `#f8f8f8` (32 usos), `#474a4e` (24), `#6e695f` (9), `#6f3713` (8), `#f9f0e2` (3) e `#000000` (3). Nenhuma foi transformada em token.

### Contraste (WCAG 2.x)

Razão calculada a partir dos valores hexadecimais, para cada par de cada tema. Texto normal exige 4,5:1.

| Tema            | texto / fundo | texto / superfície | texto-suave / fundo | texto-suave / superfície | destaque / fundo | destaque / superfície | sobre-destaque / destaque |
| --------------- | ------------- | ------------------ | ------------------- | ------------------------ | ---------------- | --------------------- | ------------------------- |
| A1 Antes        | 11,96         | 9,22               | 5,02                | **3,87**                 | 6,46             | 4,98                  | 6,46                      |
| A2 Esvaziamento | 7,11          | 8,99               | 5,48                | 6,92                     | 7,11             | 8,99                  | 7,11                      |
| A3 Ruína        | 11,37         | 9,72               | 5,79                | 4,95                     | 7,02             | 6,00                  | 8,04                      |
| A4 Reconstrução | 11,48         | 13,09              | 6,42                | 7,32                     | 6,19             | 7,06                  | 7,06                      |
| B Mapa          | 14,76         | 13,20              | 9,87                | 8,83                     | 8,73             | 7,81                  | 8,73                      |
| C Dossiê        | 14,49         | 16,56              | 8,89                | 10,16                    | 5,75             | 6,57                  | 6,57                      |

**Falha encontrada:** A1, `cor/texto-suave` sobre `cor/superficie` dá 3,87:1, abaixo do AA para texto normal (passa só para texto grande). Decisão (ADR-018): nesse par, `texto-suave` só vale em texto grande (a partir de 24px, ou 18,66px em negrito); em texto menor use `texto`. Nenhuma cor foi alterada; o Design pode corrigir o Figma.

## Tipografia

**Decisão (ADR-018):** as telas são a verdade visual, e nelas a tipografia não segue os 17 estilos documentados (215 de 216 textos fogem deles) e varia de forma diferente por contexto entre Desktop e Tablet. Por isso **não há escala tipográfica congelada**. As cinco famílias estão carregadas e viraram token; a escala nasce junto de cada componente, assim:

1. ler o frame com o MCP (`get_design_context`), nos três tamanhos;
2. criar o token pela função do texto (por exemplo `titulo-secao`), com o tamanho de cada breakpoint e a altura de linha e o espaçamento entre letras do frame;
3. reaproveitar um token só quando o valor for idêntico em todos os usos; valor diferente vira outro token;
4. registrar aqui cada token com o frame de origem, e as divergências para o Design revisar.

### Estilos documentados (frame "Fundamentos", `2:771`, seção Tipografia)

17 estilos de texto, em três famílias de capítulo (A Deteriora, B Mapa, C Dossiê) mais a família Comum.

| Estilo no Figma             | Família          | Peso           | Tamanho | Altura de linha | Espaç. entre letras | Caixa      |
| --------------------------- | ---------------- | -------------- | ------- | --------------- | ------------------- | ---------- |
| `A · Deteriora/Citação`     | DM Serif Display | 400 (Regular)  | 28px    | 1.25×           | 0%                  | normal     |
| `A · Deteriora/Corpo`       | Work Sans        | 400 (Regular)  | 16px    | 1.5×            | 0%                  | normal     |
| `A · Deteriora/Corpo forte` | Work Sans        | 600 (SemiBold) | 16px    | 1.5×            | 0%                  | normal     |
| `A · Deteriora/Lead`        | Work Sans        | 400 (Regular)  | 20px    | 1.55×           | 0%                  | normal     |
| `A · Deteriora/Rótulo`      | IBM Plex Mono    | 400 (Regular)  | 13px    | 1.4×            | 8%                  | MAIÚSCULAS |
| `B · Mapa/Corpo`            | Space Grotesk    | 400 (Regular)  | 15px    | 1.55×           | 0%                  | normal     |
| `B · Mapa/Display`          | Space Grotesk    | 700 (Bold)     | 60px    | 1.02×           | 0%                  | normal     |
| `B · Mapa/Ficha`            | Space Grotesk    | 700 (Bold)     | 28px    | 1.1×            | 0%                  | normal     |
| `B · Mapa/Título`           | Space Grotesk    | 700 (Bold)     | 34px    | 1.15×           | 0%                  | normal     |
| `C · Dossiê/Corpo`          | Public Sans      | 400 (Regular)  | 15px    | 1.55×           | 0%                  | normal     |
| `C · Dossiê/Corpo forte`    | Public Sans      | 600 (SemiBold) | 15px    | 1.55×           | 0%                  | normal     |
| `C · Dossiê/Display`        | Newsreader       | 400 (Regular)  | 84px    | 1×              | 0%                  | normal     |
| `C · Dossiê/Lead`           | Public Sans      | 400 (Regular)  | 19px    | 1.55×           | 0%                  | normal     |
| `C · Dossiê/Rótulo`         | Public Sans      | 700 (Bold)     | 12px    | 1.4×            | 10%                 | MAIÚSCULAS |
| `C · Dossiê/Título`         | Newsreader       | 400 (Regular)  | 44px    | 1.1×            | 0%                  | normal     |
| `Comum/Legenda de fonte`    | IBM Plex Mono    | 400 (Regular)  | 11px    | 1.4×            | 0%                  | normal     |
| `Comum/Nota técnica`        | IBM Plex Mono    | 400 (Regular)  | 12px    | 1.4×            | 0%                  | normal     |

### Tipografia observada por breakpoint (frames Desktop, Tablet e Mobile)

Cada linha é uma combinação de família, peso, tamanho, altura de linha e espaçamento entre letras no Desktop, com o tamanho que o mesmo texto tem no Tablet e no Mobile. São os 97 textos do Desktop. O Mobile só tem 9 textos, e "n/d" quer dizer que o texto não existe nesse frame. A função é inferida pelo papel do elemento.

| Textos | Desktop                                                                                  | Tablet                  | Mobile          | Função (inferida)                  |
| ------ | ---------------------------------------------------------------------------------------- | ----------------------- | --------------- | ---------------------------------- |
| 2      | Newsreader SemiBold 64/1                                                                 | 48                      | 36 (em 1 dos 2) | título de matéria e de seção       |
| 8      | Newsreader Medium 40/1,2, −2%                                                            | 36                      | 28 (em 2 dos 8) | subtítulo de bloco                 |
| 1      | Newsreader Regular 34/1,3, −2%                                                           | 28                      | 22              | texto da Quebra                    |
| 1      | DM Serif Display Regular 48/1,3, −2%                                                     | 36                      | 28              | citação                            |
| 2      | IBM Plex Mono Regular 22/1                                                               | 22                      | 16 (em 1 dos 2) | rótulo de seção                    |
| 17     | IBM Plex Mono SemiBold 22/1 ou 0,69, −0,5%                                               | 22                      | n/d             | título de item e de cartão         |
| 3      | IBM Plex Mono SemiBold 22/1, −0,5%                                                       | 18                      | n/d             | rótulo de esfera (cai no Tablet)   |
| 1      | IBM Plex Mono SemiBold 22/0,69, −0,5%                                                    | n/d                     | n/d             | título de cartão                   |
| 1      | IBM Plex Mono SemiBold 18/0,69, −0,5%                                                    | 16                      | n/d             | título de cartão em destaque       |
| 4      | IBM Plex Mono SemiBold 44/1, −0,5%                                                       | 44                      | n/d             | número em destaque                 |
| 2      | IBM Plex Mono SemiBold 44/1, −0,5%                                                       | 36                      | n/d             | número em destaque (cai no Tablet) |
| 2      | IBM Plex Mono SemiBold 36/1, −0,5%                                                       | 28                      | n/d             | unidade do número                  |
| 6      | IBM Plex Mono Regular 16/1                                                               | 16                      | n/d             | marcador de passo                  |
| 1      | IBM Plex Mono Medium 18/1,45, −0,5%                                                      | 14                      | 14              | nome do autor                      |
| 18     | Public Sans Regular 18/1,45 ou 1,5, −0,5%                                                | 18 (em 11) ou 16 (em 6) | n/d             | texto corrido                      |
| 15     | Public Sans Medium 18/1,45 ou 1,5, −0,5%                                                 | 18 (em 10) ou 16 (em 5) | 16 (em 2)       | texto corrido em destaque          |
| 5      | Public Sans Medium 16/1,5, −0,5%                                                         | 16                      | n/d             | texto de apoio                     |
| 1      | Public Sans Regular 16/1,5, −0,5%                                                        | 16                      | n/d             | texto de apoio                     |
| 1      | Public Sans Medium 22/1,45, −0,5%                                                        | 22                      | n/d             | texto de abertura                  |
| 3      | Work Sans Bold 25/1,45, −0,5%                                                            | 22                      | n/d             | título de bloco                    |
| 2      | Work Sans Medium 25/1,45, −0,5%                                                          | 25                      | n/d             | título de bloco                    |
| 1      | Frase do Hero 28/1, −0,5% (estilo misto: Public Sans Bold e Regular sobre base Pacifico) | 24                      | n/d             | frase do Hero                      |

Lidos pelo MCP, fora da tabela acima: botão "Explorar o Mapa" em Work Sans Medium 22/1,5; menu da Navbar em IBM Plex Mono Regular 16/1,45, −0,5%, com a primeira entrada em Bold e sublinhada.

Exceções para o Design confirmar (provável desvio): rótulos de esfera de 22 para 18 no Tablet (3); números de 44 para 36 só em 2 casos; texto corrido de 18 para 16 em 11 casos e de 18 para 18 em 21; altura de linha 0,69 em 9 títulos de cartão.

### Famílias e pesos carregados

Servidas por `@fontsource` (latim, `font-display: swap`), licença OFL-1.1 em todas. Pesos: os que as telas e os componentes usam.

| Token                     | Família          | Pesos carregados        |
| ------------------------- | ---------------- | ----------------------- |
| `--font-ibm-plex-mono`    | IBM Plex Mono    | 300, 400, 500, 600, 700 |
| `--font-public-sans`      | Public Sans      | 400, 500, 600, 700      |
| `--font-work-sans`        | Work Sans        | 500, 600, 700           |
| `--font-newsreader`       | Newsreader       | 400, 500, 600           |
| `--font-dm-serif-display` | DM Serif Display | 400                     |

Fora do carregamento: **Space Grotesk** (Regular em 2 textos de componentes, a confirmar), **Pacifico** (é a fonte base da frase do Hero, mas o texto visível usa Public Sans), **Inter** e **Inria Serif** (só nos frames de exploração de 1280).

## Espaçamento

Coleção "Espaço e forma" (`espaco/1` a `espaco/10`), documentada em "Fundamentos" (`2:771`), seção Espaço. Os tokens usam `rem` (conversão exata sobre base de 16px).

| Token (`tokens.css`)  | Variável no Figma | Valor          |
| --------------------- | ----------------- | -------------- |
| `--spacing-espaco-1`  | `espaco/1`        | 4px (0,25rem)  |
| `--spacing-espaco-2`  | `espaco/2`        | 8px (0,5rem)   |
| `--spacing-espaco-3`  | `espaco/3`        | 12px (0,75rem) |
| `--spacing-espaco-4`  | `espaco/4`        | 16px (1rem)    |
| `--spacing-espaco-5`  | `espaco/5`        | 24px (1,5rem)  |
| `--spacing-espaco-6`  | `espaco/6`        | 32px (2rem)    |
| `--spacing-espaco-7`  | `espaco/7`        | 48px (3rem)    |
| `--spacing-espaco-8`  | `espaco/8`        | 72px (4,5rem)  |
| `--spacing-espaco-9`  | `espaco/9`        | 96px (6rem)    |
| `--spacing-espaco-10` | `espaco/10`       | 120px (7,5rem) |

**Decisão (ADR-018):** o Tailwind mantém a base de 4px, então os valores fora da escala (6, 10, 14, 22, 26, 36, 40) saem como múltiplos (`p-1.5`, `p-2.5`, `p-3.5`, `p-5.5`, `p-6.5`, `p-9`, `p-10`), sem valor arbitrário. Use `espaco-N` quando o valor estiver na escala. Atenção aos nomes parecidos: `p-10` é 40px (múltiplo de 4), enquanto `p-espaco-10` é 120px. Os valores fora dela ficam listados para o Design confirmar.

**Divergência:** nas telas (Desktop, Tablet e Mobile) os espaços entre elementos (`stackSpacing`) incluem 6, 10, 14, 18, 22, 26, 28, 36, 37 e 40, e os preenchimentos incluem 13, 22, 23, 52, 54 e 68, que não existem na escala. Valores da escala que aparecem: 4, 8, 12, 16, 32, 48 e 72.

## Raios e bordas

O texto de "Fundamentos" (seção Espaço, raio e grid) documenta `raio/0` = 0, `raio/1` = 2, `raio/2` = 8, `raio/3` = 30 (zonas do mapa) e `raio/cheio` (marcadores). Não existem variáveis de raio no Figma, só esse texto. As telas usam também 12 (botões e cartões), 16 e 20, que ficam sem nome no Figma. **Decisão (ADR-018):** todos viram token, os documentados com o nome do Figma e os observados com o nome pelo valor.

| Token (`tokens.css`)  | Valor           | Origem                                     |
| --------------------- | --------------- | ------------------------------------------ |
| `--radius-raio-1`     | 2px (0,125rem)  | `raio/1`, documentado                      |
| `--radius-raio-2`     | 8px (0,5rem)    | `raio/2`, documentado                      |
| `--radius-raio-3`     | 30px (1,875rem) | `raio/3`, documentado (zonas do mapa)      |
| `--radius-raio-cheio` | 9999px          | `raio/cheio`, documentado (marcadores)     |
| `--radius-raio-12`    | 12px (0,75rem)  | observado: botões (36 variantes) e cartões |
| `--radius-raio-16`    | 16px (1rem)     | observado: 6 camadas das telas             |
| `--radius-raio-20`    | 20px (1,25rem)  | observado: 2 camadas das telas             |

`raio/0` é `rounded-none`. Bordas documentadas: 1, 1,5 e 3 (observadas também 0,75, 2 e 2,5). O Tailwind só tem 1px pronto, então a borda de 1,5px vira utilitário próprio quando o primeiro componente precisar.

## Grid e breakpoints

| Origem                                                                              | Largura | Observação                                                    |
| ----------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------- |
| Frame "Desktop" (`7:5`)                                                             | 1024    | Conteúdo de 920 de largura dentro do frame.                   |
| Frame "Tablet" (`7:4`)                                                              | 768     |                                                               |
| Frame "Mobile" (`7:3`)                                                              | 360     |                                                               |
| Frames de exploração (`2:80`, `2:108`, `2:128`, `2:149`, `2:177`, `2:199`, `2:228`) | 1280    | Usam texto de preenchimento (lorem ipsum).                    |
| Texto de "Fundamentos"                                                              | 1440    | Conteúdo de 1200, margens de 120, coluna de texto de até 820. |

Alvo de toque mínimo documentado: **44px**. Os botões têm 44 de altura em Tablet e Mobile (todos os temas) e 57 ou 60 no Desktop.

**Decisão (ADR-018):** mobile primeiro. A base é o Mobile (360); `md` = 768 (Tablet) e `lg` = 1024 (Desktop), que coincidem com os breakpoints padrão do Tailwind. Os outros (`sm`, `xl`, `2xl`) foram removidos, porque o design não os tem. Acima de 1024 o conteúdo fica centralizado na largura máxima do Desktop (1024, com conteúdo de 920 e margem de 52 de cada lado); as medidas do grid de 1440 do texto de "Fundamentos" não foram adotadas, porque não há tela desenhada nessa largura. Margens e colunas de Tablet e Mobile saem do frame, quando cada componente for implementado.

## Texturas e efeitos

| Efeito                                | Onde aparece                                                                                                       | Situação                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `NOISE`, `GRAIN` e `FOREGROUND_BLUR`  | Só na página "Logo": vetores de até 76px                                                                           | Fora das telas; o logo deve vir do Design como arquivo exportado.                                                             |
| `BACKGROUND_BLUR`                     | Variantes da Navbar (página "Componentes") e suas instâncias (página "Prototipação"); 1024×55 e 768×55             | Área pequena, dentro da regra de `backdrop-filter`.                                                                           |
| `DROP_SHADOW`                         | 38 camadas da página "Prototipação"                                                                                | Estático, sem animação. Estilo de efeito "Drop Shadow - Cards": deslocamento y=4, desfoque 2,7, preto a 10%. Uso a confirmar. |
| Preenchimento com imagem              | 33 imagens usadas (fotos, ilustrações, moodboard, logo e o quadriculado abaixo)                                    | Sem crédito nem licença: **nenhuma importada** (regra editorial 7).                                                           |
| Quadriculado de 256×256, quase branco | 38 camadas da página "Prototipação" (frames "Frame 3", "Frame 4", "Frame 5", "Frame 14", "Icon" e "Icon-quebrado") | Finalidade a confirmar com o Design: textura ou preenchimento de espaço reservado. Não importado.                             |

## Movimento

O protótipo tem 31 interações, de dois tipos.

| Gatilho | Ação                                              | Transição       | Duração     | Curva       | Onde                                           |
| ------- | ------------------------------------------------- | --------------- | ----------- | ----------- | ---------------------------------------------- |
| Hover   | Troca de variante (`Estado=Default` para `Hover`) | `SMART_ANIMATE` | 0,3 s       | `OUT_CUBIC` | 15 variantes do componente "Botões"            |
| Clique  | Troca de variante (`Default` para `Selected`)     | nenhuma         | instantâneo | n/d         | 15 instâncias e 1 variante do "Menu Navegação" |

**Hover do botão:** o preenchimento muda para uma cor literal mais escura (tema B: `#7a3b12` para `#53290e`; C: `#0a0d11`; D: `#7b290d`; E: `#df9450`). Isso é animação de cor, não de `transform`/`opacity`, e essas quatro cores não existem como variável. A curva numérica de `OUT_CUBIC` ainda precisa ser confirmada no Figma. **Decisão (ADR-018):** o hover é uma camada sobreposta, com a cor de hover, que anima só `opacity` (visual idêntico ao do protótipo e dentro do orçamento). A curva numérica de `OUT_CUBIC` e as cores de hover viram token junto do componente Botão.
