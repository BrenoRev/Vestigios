# Design system: Vestígios

> **Fonte única de verdade:** o protótipo no Figma.
> https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2&t=UzVMO4knOonmD3pv-1
>
> **Estado: Fase 2, extração parcial.** Os valores abaixo vêm do arquivo `.fig` exportado pelo Design em 2026-11-13 (formato `fig-kiwi` versão 106), lido sem o MCP do Figma, que ainda não tem acesso de edição ao arquivo. Nenhum valor foi inventado. Detalhes da extração, inventário de telas e divergências em [`.memory/figma_specs.md`](./.memory/figma_specs.md).
>
> **Regra a partir da Fase 2:** é proibido usar valor arbitrário inline (`w-[327px]`, `text-[#123456]`). Só tokens daqui.

## O que já é token e o que espera decisão

| Grupo                  | Situação                            | Motivo                                                                                                 |
| ---------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Cores primitivas (40)  | **Token** em `tokens.css`           | Variáveis do Figma, sem ambiguidade.                                                                   |
| Temas por capítulo (6) | **Token** em `tokens.css` (`:root`) | Variáveis do Figma com `codeSyntax` definido pelo Design. O mecanismo de troca de tema espera decisão. |
| Cores de dado (5)      | **Token** em `tokens.css` (`:root`) | Variáveis do Figma.                                                                                    |
| Espaçamento (10)       | **Token** em `tokens.css`           | Variáveis do Figma. As telas usam valores fora da escala (ver Espaçamento).                            |
| Tipografia             | **Sem token**                       | 215 de 216 textos das telas não usam os 17 estilos documentados.                                       |
| Raios e bordas         | **Sem token**                       | O texto de Fundamentos e as telas divergem.                                                            |
| Breakpoints e grid     | **Sem token**                       | As telas (360, 768, 1024) e o texto de Fundamentos (1440, 1200) divergem.                              |
| Movimento              | **Sem token**                       | Curva numérica a confirmar; o hover anima cor, não `transform`/`opacity`.                              |

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

**Falha encontrada:** A1, `cor/texto-suave` sobre `cor/superficie` dá 3,87:1, abaixo do AA para texto normal (passa só para texto grande). Pendente de decisão do Design; nenhuma cor foi alterada.

## Tipografia

**Sem tokens por enquanto.** Há duas fontes de verdade em conflito dentro do Figma, descritas abaixo.

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

### O que as telas realmente usam (frames "Desktop", "Tablet" e "Mobile")

Nas 216 camadas de texto das três telas, **nenhuma está ligada a um estilo de texto**, e 215 usam uma combinação de família, peso e tamanho que não existe nos 17 estilos. Combinações mais frequentes:

| Família       | Peso     | Tamanho | Ocorrências |
| ------------- | -------- | ------- | ----------- |
| IBM Plex Mono | SemiBold | 22px    | 47          |
| Public Sans   | Regular  | 18px    | 30          |
| Public Sans   | Medium   | 18px    | 29          |
| Public Sans   | Medium   | 16px    | 17          |
| IBM Plex Mono | Regular  | 16px    | 13          |
| IBM Plex Mono | SemiBold | 44px    | 10          |
| Newsreader    | Medium   | 40px    | 8           |
| Public Sans   | Regular  | 16px    | 8           |
| Newsreader    | Medium   | 36px    | 8           |
| IBM Plex Mono | Regular  | 22px    | 4           |
| Work Sans     | Medium   | 25px    | 4           |
| IBM Plex Mono | SemiBold | 18px    | 4           |
| IBM Plex Mono | SemiBold | 36px    | 4           |

### Famílias

| Família               | Onde aparece | Pesos nas telas e componentes                  |
| --------------------- | ------------ | ---------------------------------------------- |
| IBM Plex Mono         | 205 textos   | Regular, Medium, SemiBold, Bold                |
| Public Sans           | 152 textos   | Regular, Medium, SemiBold, Bold                |
| Work Sans             | 55 textos    | Regular, Medium, SemiBold, Bold                |
| Newsreader            | 40 textos    | Regular, Medium, SemiBold                      |
| Space Grotesk         | 8 textos     | Regular, Bold                                  |
| DM Serif Display      | 7 textos     | Regular                                        |
| Inter                 | 49 textos    | só nos frames de exploração de 1280 de largura |
| Pacifico, Inria Serif | 3 textos     | só nos frames de exploração de 1280 de largura |

Todas as famílias do site estão no Google Fonts. A forma de servir (`public/fonts/` ou `@fontsource/*`) e a conferência de licença de cada família seguem pendentes.

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

**Divergência:** nas telas (Desktop, Tablet e Mobile) os espaços entre elementos (`stackSpacing`) incluem 6, 10, 14, 18, 22, 26, 28, 36, 37 e 40, e os preenchimentos incluem 13, 22, 23, 52, 54 e 68, que não existem na escala. Valores da escala que aparecem: 4, 8, 12, 16, 32, 48 e 72.

## Raios e bordas

O texto de "Fundamentos" (seção Espaço, raio e grid) documenta: `raio/0` = 0, `raio/1` = 2, `raio/2` = 8, `raio/3` = 30 (zonas do mapa), `raio/cheio` = marcadores. Bordas: 1, 1,5 e 3. Não existem variáveis de raio no Figma, apenas esse texto.

**Divergência:** nas telas os raios usados são 16 (6 camadas), 12 (3) e 20 (2); nos botões é 12. Nenhum deles está na escala documentada. As espessuras de borda observadas no arquivo são 1 (882 camadas), 1,5, 2,5, 2, 0,75 e 3.

Sem tokens até o Design decidir qual escala vale.

## Grid e breakpoints

| Origem                                                                              | Largura | Observação                                                    |
| ----------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------- |
| Frame "Desktop" (`7:5`)                                                             | 1024    | Conteúdo de 920 de largura dentro do frame.                   |
| Frame "Tablet" (`7:4`)                                                              | 768     |                                                               |
| Frame "Mobile" (`7:3`)                                                              | 360     |                                                               |
| Frames de exploração (`2:80`, `2:108`, `2:128`, `2:149`, `2:177`, `2:199`, `2:228`) | 1280    | Usam texto de preenchimento (lorem ipsum).                    |
| Texto de "Fundamentos"                                                              | 1440    | Conteúdo de 1200, margens de 120, coluna de texto de até 820. |

Alvo de toque mínimo documentado: **44px**. Os botões têm 44 de altura em Tablet e Mobile (todos os temas) e 57 ou 60 no Desktop.

Sem tokens de breakpoint até o Design decidir o que acontece acima de 1024.

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

**Hover do botão:** o preenchimento muda para uma cor literal mais escura (tema B: `#7a3b12` para `#53290e`; C: `#0a0d11`; D: `#7b290d`; E: `#df9450`). Isso é animação de cor, não de `transform`/`opacity`, e essas quatro cores não existem como variável. A curva numérica de `OUT_CUBIC` ainda precisa ser confirmada no Figma. Sem token até a decisão.
