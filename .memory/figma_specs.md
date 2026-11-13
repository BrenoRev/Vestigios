# Especificações extraídas do Figma

> Fonte: https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2&t=UzVMO4knOonmD3pv-1
>
> Extração da Fase 2 feita em 2026-11-13 a partir do arquivo `.fig` exportado pelo Design (`figma/Vestigio — Deterioração do Recife.fig`, 63 MB, exportado em 2026-11-13T22:09:50Z). A pasta `figma/` não vai para o Git (`.gitignore`). Toda medida cita o frame (nome e `node-id`). Tokens consolidados em [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md).

## Cópia de trabalho e acesso do MCP

O MCP do Figma não tem acesso de edição ao arquivo do Design (`haaMnXS0jhXZjXyBKugccp`). O responsável fez uma cópia (fileKey `deTyWOTv6xMUkI0jWhaJPP`, nó raiz `2:2`) na conta que o MCP usa, e a leitura passou a funcionar (`create_session`, `get_metadata`, `get_design_context`, `get_screenshot`). A cópia tem 4 páginas visíveis (Prototipação, Ilustração, Logo, Componentes) e a mesma estrutura do `.fig`. **A cópia não acompanha o original:** antes de cada fase, conferir com o Design se o original mudou.

## Como foi extraído

O MCP do Figma recusou a leitura (a conta conectada não tem acesso de edição ao arquivo), então o `.fig` foi lido direto:

1. O `.fig` é um zip com `canvas.fig`, `meta.json`, `thumbnail.png` e `images/` (62 imagens, nomeadas pelo hash).
2. `canvas.fig` tem o cabeçalho `fig-kiwi` (versão 106) seguido de dois blocos comprimidos: o esquema e os dados (deflate bruto; zstd em versões novas).
3. A decodificação usou o pacote `kiwi-schema` (de `evanw`, autor do formato) numa pasta temporária fora do projeto. Resultado: 9.960 nós (5 páginas, 98 variáveis em 11 coleções, duas delas chamadas "Presets"; 17 estilos de texto; 1 estilo de efeito).
4. A árvore foi montada por `parentIndex`; valores de variáveis resolvidos por alias.

O leitor não está no repositório (exigiria uma dependência fora da stack). Para repetir a extração com um `.fig` novo, basta refazer esses passos; a skill `extrair-design-tokens` descreve o caminho com o MCP, que é preferível quando o acesso for liberado e serve também para capturas de tela (`get_screenshot`), que o `.fig` não fornece.

## Páginas do arquivo

| Página               | `node-id` | Conteúdo                                                                                                             |
| -------------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| 📐 Prototipação      | `2:2`     | Telas Desktop, Tablet e Mobile, frames de exploração de 1280, "Fundamentos" (documentação do design system), paleta. |
| 🕹️ Componentes       | `2:3`     | Filtro, Aba de prédio, Marcador de prédio, Selo de estatuto da fonte, Pendência de apuração, Botões, Menu, Navbar.   |
| 🎨 Logo              | `8:284`   | Moodboard e logo (vetores com efeitos de ruído e granulação).                                                        |
| 🎨 Ilustração        | `0:1`     | Ilustrações em andamento (há uma nota do Design dizendo que as demais virão no mesmo estilo).                        |
| Internal Only Canvas | `0:2`     | Variáveis, estilos e uma biblioteca de código (`Lightbox`); sem desenho de tela.                                     |

## Telas e frames

| Tela / frame                   | `node-id` | Largura × altura | Observações                                                                                                |
| ------------------------------ | --------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| Desktop                        | `7:5`     | 1024 × 8282      | Coluna única. Seções: Hero, 1ª Matéria, Quebra, Guia de Leitura, Navbar.                                   |
| Tablet                         | `7:4`     | 768 × 8409       | Mesmas seções; a terceira está nomeada "Desktop" (1216 de altura), provável "Quebra".                      |
| Mobile                         | `7:3`     | 360 × 2559       | Hero, 1ª Matéria e "Quebra" (nomeada "Desktop", 1033); o Guia de Leitura está nos frames separados abaixo. |
| Guia de Leitura (mobile)       | `35:1376` | 360 × 5783       | Fora do frame Mobile.                                                                                      |
| Guia de Leitura (mobile, topo) | `35:1143` | 360 × 301        |                                                                                                            |
| Recife em Foco                 | `2:80`    | 1280 × 1983      | Exploração; usa texto de preenchimento.                                                                    |
| Patrimônio em risco            | `2:108`   | 1280 × 1306      | Exploração.                                                                                                |
| Patrimônio em risco            | `2:128`   | 1280 × 1115      | Exploração.                                                                                                |
| Pull quote 1                   | `2:149`   | 1280 × 1062      | Exploração, com `lorem ipsum`.                                                                             |
| Feature cards 1                | `2:177`   | 1280 × 704       | Exploração (3 cards).                                                                                      |
| Quote 1                        | `2:199`   | 1280 × 653       | Exploração.                                                                                                |
| Feature 3                      | `2:228`   | 1280 × 1268      | Exploração.                                                                                                |
| Fundamentos                    | `2:771`   | 1600 × 3107      | Documentação do design system (cores, tipografia, espaço, raio e grid).                                    |
| paleta de cores                | `2:761`   | 1017 × 281       | Sete círculos: azul escuro, azul, terracota, bege, cinza, grafite, bege-fundo.                             |

## Fluxo de navegação

- A leitura é uma página só, em rolagem, com a Navbar (55 de altura) nos três tamanhos (`Property 1` = `navbar-mobile`, `navbar-tablet`, `navbar-desktop`; fundo `#2a2118`).
- O "Menu Navegação" alterna entre `Default` e `Selected` com clique (troca instantânea de variante, sem transição). O Figma não define para onde cada item do menu leva.
- A Navbar lista seis capítulos, na ordem: **O Recife** (ativo, em negrito e sublinhado), **Guia de Leitura**, **O Problema**, **Mapa dos Dados**, **Os Responsáveis**, **O Futuro**. São rótulos de interface (a confirmar com o Jornalismo antes de entrar em `src/content/`). A correspondência com os temas A1, A2, A3, A4, B e C é provável pelos nomes (Antes, Esvaziamento, Ruína, Reconstrução, Mapa, Dossiê), mas o Figma não a diz.
- O Hero tem um botão "Explorar o Mapa". O Figma não define o destino; o capítulo "Mapa dos Dados" é o provável.
- Não existe página de erro 404, página de metodologia nem página de créditos desenhadas.

## Seções da reportagem (ordem do protótipo)

| Ordem | Seção           | Frame (Desktop) | Dimensões (Desktop) | Componente em `src/components/sections/` |
| ----- | --------------- | --------------- | ------------------- | ---------------------------------------- |
| 1     | Hero Section    | dentro de `7:5` | 1024 × 542          | `HeroSection.tsx`                        |
| 2     | 1ª Matéria      | dentro de `7:5` | 1024 × 924          | `PrimeiraMateria.tsx`                    |
| 3     | Quebra          | dentro de `7:5` | 1024 × 1376         | `Quebra.tsx`                             |
| 4     | Guia de Leitura | dentro de `7:5` | 1024 × 5440         | `GuiaDeLeitura.tsx` e seis `Guia*.tsx`   |
| n/d   | Navbar          | instância       | 1024 × 55           | `layout/Navbar.tsx`                      |

O texto dessas telas foi copiado para `src/content/pagina-inicial.ts` como **conteúdo provisório** (ADR-019): marcado no código com `provisorio(...)` e listado em `docs/fontes.md`, até o Jornalismo confirmar.

## Componentes (página "Componentes", `2:3`)

| Componente                | Variantes                                                                                          | `node-id` |
| ------------------------- | -------------------------------------------------------------------------------------------------- | --------- |
| Botões                    | `Tema` A, B, C, D, E, F × `Estado` Default, Hover × `Tamanho` Desktop, Tablet, Mobile (36)         | `7:235`   |
| Menu Navegação            | `Default`, `Selected`                                                                              | `7:18`    |
| Navbar                    | `navbar-mobile`, `navbar-tablet`, `navbar-desktop`                                                 | `7:95`    |
| Filtro                    | `Ativo`, `Inativo`                                                                                 | `2:1068`  |
| Aba de prédio             | `Ativa`, `Inativa`                                                                                 | `2:1075`  |
| Marcador de prédio        | `Situação` Abandonado, Reversão, A confirmar × `Estado` Padrão, Selecionado (6)                    | `2:1084`  |
| Selo de estatuto da fonte | `Tipo` Técnica ou acadêmica, Institucional, Movimento social, Mídia independente, Fonte humana (5) | `2:1102`  |
| Pendência de apuração     | `Fundo` Claro, Escuro                                                                              | `2:1120`  |

Medidas dos botões (todas as variantes): altura 44 em Tablet e Mobile; no Desktop, 57 (B, D, E) ou 60 (A, C, F). Raio 12 em todos.

O `Tema` A a F do botão é uma variante de aparência (contorno ou preenchido), e cada uma usa cores de temas diferentes. No estado padrão preenchimentos e contornos são ligados a variáveis; no hover, os preenchimentos são cores literais.

| `Tema` do botão | Aparência                   | Estado padrão                                                                   | Hover                                     |
| --------------- | --------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------- |
| A               | contorno 1,5                | contorno `A1 › cor/texto` (`#2a2118`)                                           | sem mudança de preenchimento nem contorno |
| B               | preenchido                  | `A1 › cor/destaque` (`#7a3b12`)                                                 | `#53290e` (literal)                       |
| C               | preenchido com contorno 1,5 | preenchimento `B › cor/fundo` (`#12161c`), contorno `B › cor/texto` (`#e4e8ee`) | `#0a0d11` (literal)                       |
| D               | preenchido                  | `C › cor/destaque` (`#a33b17`)                                                  | `#7b290d` (literal)                       |
| E               | preenchido                  | `B › cor/destaque` (`#f0a35e`)                                                  | `#df9450` (literal)                       |
| F               | contorno 1,5                | contorno `#ffffff` (literal)                                                    | sem mudança de preenchimento nem contorno |

## Estados

| Componente         | Padrão    | Hover                         | Foco | Ativo/Selecionado | Desabilitado |
| ------------------ | --------- | ----------------------------- | ---- | ----------------- | ------------ |
| Botões             | sim       | sim (cor muda; ver Movimento) | não  | não               | não          |
| Menu Navegação     | sim       | não                           | não  | `Selected`        | não          |
| Filtro             | `Inativo` | não                           | não  | `Ativo`           | não          |
| Aba de prédio      | `Inativa` | não                           | não  | `Ativa`           | não          |
| Marcador de prédio | `Padrão`  | não                           | não  | `Selecionado`     | não          |

O Figma não define **estado de foco** para nenhum componente (obrigatório para navegação por teclado) nem hover para Menu, Filtro, Aba e Marcador. Stop & Ask antes de implementar.

## Animações e efeitos

| Elemento       | Efeito                                               | Gatilho | Duração / curva    | Cabe no orçamento?                                             | Frame                    |
| -------------- | ---------------------------------------------------- | ------- | ------------------ | -------------------------------------------------------------- | ------------------------ |
| Botões         | Preenchimento muda de cor (`#7a3b12` para `#53290e`) | Hover   | 0,3 s, `OUT_CUBIC` | Só com camada animando `opacity`; animar a cor direto não cabe | `7:235`                  |
| Menu Navegação | Troca de variante                                    | Clique  | instantâneo        | Sim                                                            | `7:18`, `7:65` a `7:100` |
| Navbar         | Desfoque de fundo (`BACKGROUND_BLUR`), estático      | n/d     | n/d                | Sim (1024×55 e 768×55, área pequena)                           | `7:95`                   |
| Logo           | Ruído, granulação e desfoque de primeiro plano       | n/d     | n/d                | Fora do site; usar arquivo exportado                           | página "Logo"            |

Não há animação de rolagem, parallax ou entrada de seção definida no arquivo.

## Mapas e gráficos

Nenhum frame de mapa ou gráfico existe nesta exportação. Há apenas peças de apoio: componentes "Filtro", "Aba de prédio" e "Marcador de prédio", as cores de dado e a menção a "zonas do mapa" no raio de 30. A técnica de mapas continua com quem for implementá-los.

## Ícones

Os ícones são vetores do próprio arquivo (por exemplo `Icon`, `Icon-quebrado`). Nenhum foi mapeado para `@phosphor-icons/react`; cada correspondência (nome e peso) precisa de conferência do Design. Ícone sem correspondência é Stop & Ask.

## Imagens do arquivo (nenhuma importada)

62 imagens no pacote, 33 usadas. São fotos, ilustrações, moodboard, logo, avatares e peças de espaço reservado, **sem crédito nem licença registrados** (regra editorial 7). Nenhuma foi copiada para `src/assets/`. O logo existe como PNG branco sobre transparente (1548 × 553) e como vetor na página "Logo"; o Design deve entregar um SVG.

## Divergências dentro do Figma

1. **Tipografia:** nenhuma camada de texto das telas usa os 17 estilos; 215 de 216 usam combinações que não existem neles.
2. **Espaço e raio:** as telas usam valores fora da escala documentada (espaços 6, 10, 14, 18, 22, 26, 28, 36, 37, 40; raios 12, 16, 20 contra 0, 2, 8, 30).
3. **Larguras:** telas de 1024, 768 e 360; frames de exploração de 1280; documentação com grid de 1440.
4. **Temas:** os botões têm `Tema` A a F, que são variantes de aparência com cores de vários temas (A1, B e C). Os temas das variáveis são A1, A2, A3, A4, B e C, e nenhum botão usa A2, A3 nem A4.
5. **A2 Esvaziamento** não tem `cor/borda`.
6. **Contraste:** A1, `texto-suave` sobre `superficie` = 3,87:1.
7. **Variáveis sem uso:** `azul/700`, `papel/200`; coleção "Presets" (`strokeWidth` com modos Custom, Luxury, Exhibition, Basil) e estilo de efeito "Drop Shadow - Cards" parecem restos de template.
8. **Selo de estatuto da fonte** tem 5 tipos; o tipo `Fonte` do código tem 6 (falta `imprensa`).
9. **"Pendência de apuração"** existe como componente visual; no código, `pendente(...)` é ferramenta de desenvolvimento que nunca vai ao ar.
10. **Cores das telas:** em Desktop, Tablet, Mobile e Navbar, 0 de 140 preenchimentos sólidos estão ligados a variáveis. Das 13 cores sólidas distintas, 7 existem nos primitivos e 6 não: `#f8f8f8` (32×), `#474a4e` (24×), `#6e695f` (9×), `#6f3713` (8×), `#f9f0e2` (3×) e `#000000` (3×).
11. **Telas e nomes:** Tablet e Mobile chamam de "Desktop" o frame que provavelmente equivale à "Quebra" (mesma estrutura, um bloco de texto); o Guia de Leitura do Mobile está em frames separados (`35:1376` e `35:1143`), fora do frame Mobile.

## Hero e Navbar (lidos pelo MCP)

- **Hero** (`2:57`, 1024 × 542): fundo `#2a2118` (`terra/900`) com uma foto a 10% de opacidade; logo em máscara de 643 × 230, cor `#e9dfcc` (`areia/100`); frase de 28 (24 no Tablet) em `#f9f0e2` (cor fora das variáveis), alinhada à direita; botão com borda de 1,5 branca, raio 12, preenchimento horizontal `espaco-5`, vertical `espaco-3`, altura mínima 44 e desfoque de fundo de 2px.
- **Navbar** (`15:782`, 1024 × 55): fundo `rgba(42,33,24,0.6)` com desfoque de fundo de 7px, itens com 46 de espaço entre eles e 16 de preenchimento vertical.
- O logo é uma imagem usada como máscara (não é vetor); a foto de fundo do Hero não tem crédito nem licença.

## Alertas editoriais do conteúdo de layout

O texto das telas é referência de layout e **não foi copiado** para `src/content/`. Pontos que o Jornalismo precisa tratar antes de qualquer texto entrar:

1. **Hero:** a frase afirma que o esvaziamento "não é acidente". Isso afirma intenção como fato, o que a regra editorial 2 proíbe. A forma aceita descreve o padrão observado, nomeia quem se beneficia e deixa a intenção como pergunta aberta.
2. **Números sem fonte no Figma:** as telas trazem cifras (prazos de processos, quantidades de imóveis, contagens da Defesa Civil e de ONGs, ano de referência). Cada uma precisa de fonte registrada em `docs/fontes.md`, com ano de referência.
3. **Pendência de apuração:** o componente aparece ao lado de números ainda não confirmados. É um elemento público de interface (dado "a apurar"), diferente do `pendente()` de desenvolvimento, que nunca vai ao ar.
4. **Pessoas e instituições:** os textos citam órgãos (Iphan, Fundarpe, Prefeitura, Defesa Civil) e uma ONG. Nomear órgão público como fonte é diferente de nomear pessoa ou empresa, mas cada citação precisa de fonte.

## Decisões da Fase 2

Todas resolvidas em 2026-11-13, por delegação do responsável, no ADR-018. A tabela resume; os blocos abaixo ficam como registro das opções que foram consideradas.

| #   | Tema                           | Escolha                                                                                                                      |
| --- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| 1   | Tipografia                     | As telas são a verdade; escala criada por componente, a partir do frame; famílias já carregadas.                             |
| 2   | Breakpoints e grid             | Mobile primeiro, `md` 768 e `lg` 1024; acima disso, conteúdo centralizado em 1024.                                           |
| 3   | Escalas de espaço e de raio    | Espaço: escala `espaco-N` mais múltiplos de 4px do Tailwind; raios: 7 tokens.                                                |
| 4   | Troca de tema                  | `data-tema` na seção, `--cor-*` e utilitários semânticos; A1 é o padrão.                                                     |
| 5   | Tema padrão do Tailwind        | Cores padrão removidas; espaço e tipografia ficam.                                                                           |
| 6   | Hover dos botões               | Camada sobreposta animando `opacity`.                                                                                        |
| 7   | Estados e componentes ausentes | Foco visível com a cor de destaque do tema; só o que está desenhado; Selo de `imprensa` fica sem selo até o Design desenhar. |
| 8   | Contraste do A1                | `texto-suave` sobre `superficie` só em texto grande.                                                                         |
| 9   | Imagens e logo                 | Nenhuma foto sem crédito e licença; o logo é arte do projeto e entra com o Botão e o Hero.                                   |
| 10  | Fontes                         | `@fontsource`, latim, 16 pesos em 5 famílias. Instalado.                                                                     |
| 11  | Acesso do MCP                  | Resolvido pela cópia de trabalho.                                                                                            |
| 12  | Cores fora das variáveis       | Tratadas por componente, com nome pelo papel, quando o componente que as usa for implementado.                               |

### Registro das opções consideradas

Formato do Stop & Ask. Quem responderia cada uma estava entre parênteses.

```text
DECISÃO NECESSÁRIA 1 (Design): fonte de verdade da tipografia
Contexto: "Fundamentos" (2:771) documenta 17 estilos, mas as telas Desktop/Tablet/Mobile
(7:5, 7:4, 7:3) não usam nenhum; usam IBM Plex Mono SemiBold 22, Public Sans Regular/Medium 18,
Newsreader Medium 36/40 e outras combinações.
Opções:
A) O Design religa as telas aos estilos ou atualiza os estilos para o que as telas usam.
   Custo: tempo do Design; resultado limpo e rastreável.
B) Implementar a partir dos valores observados nas telas, nomeando os tokens por função.
   Custo: nomes inventados por nós; o Figma continua incoerente.
C) Implementar os 17 estilos e deixar as telas divergirem.
   Custo: viola a fidelidade ao protótipo.
Recomendação: A. Sem ela, qualquer token de tipografia seria palpite.
Parado: tokens de tipografia, escolha dos pesos a carregar e a decisão das fontes.
```

```text
DECISÃO NECESSÁRIA 2 (Design): breakpoints e grid
Contexto: telas de 1024, 768 e 360 (frames 7:5, 7:4, 7:3); exploração em 1280; "Fundamentos"
documenta página de 1440, conteúdo de 1200, margens de 120 e coluna de texto de até 820.
Opções:
A) Três breakpoints das telas (360, 768, 1024), com largura máxima de conteúdo observada (920).
   Custo: o que acontece acima de 1024 precisa de resposta do Design.
B) O grid de 1440 e 1200 do texto de Fundamentos.
   Custo: não há tela desenhada nessa largura.
C) Os dois: breakpoints das telas, e a partir de 1440 o grid documentado.
   Custo: layout de 1024 a 1440 sem definição.
Recomendação: A, até o Design desenhar uma tela acima de 1024.
Parado: tokens de breakpoint, Container e Grid da Fase 3.
```

```text
DECISÃO NECESSÁRIA 3 (Design): escalas de espaço e de raio
Contexto: espaço documentado em 4, 8, 12, 16, 24, 32, 48, 72, 96, 120; as telas usam também
6, 10, 14, 18, 22, 26, 28, 36, 37, 40 (e preenchimentos 13, 22, 23, 52, 54, 68). Raios documentados
0, 2, 8, 30, cheio; as telas usam 12, 16 e 20.
Opções:
A) O Design alinha as telas à escala (ou amplia a escala com os valores que quer manter).
B) Criar tokens para os valores observados, nomeados por valor.
C) Arredondar para a escala mais próxima.
   Custo: altera o layout; viola a fidelidade.
Recomendação: A. No arquivo inteiro o raio 12 aparece em 39 camadas (36 delas os botões) e o 16 em 33; nas telas,
o 16 em 6 e o 12 em 3. Provavelmente deveriam estar na escala; 37, 13 e 23 parecem desvio.
Parado: tokens de raio e borda; uso dos espaçamentos nas telas.
```

```text
DECISÃO NECESSÁRIA 4 (dev + Design): troca de tema por capítulo
Contexto: seis temas (A1, A2, A3, A4, B, C) com as mesmas variáveis semânticas; hoje estão em
:root como --a1-cor-texto etc., sem utilitários. As variantes A a F do botão misturam cores de
A1, B e C.
Opções:
A) Atributo data-tema na seção, que redefine variáveis semânticas (--cor-fundo etc.) a partir
   do tema; utilitários do Tailwind leem essas variáveis via @theme inline.
   Custo: o Design precisa dizer qual tema vale em cada capítulo, e como o botão se comporta
   fora do tema de origem de cada variante.
B) Uma classe de utilitários por tema (bg-a1-fundo, bg-b-fundo).
   Custo: componente deixa de ser reutilizável entre temas.
C) Variáveis aplicadas por estilo inline via React.
   Custo: foge do padrão do projeto.
Recomendação: A.
Parado: utilitários de cor semântica e os componentes que mudam de tema.
```

```text
DECISÃO NECESSÁRIA 5 (dev): tema padrão do Tailwind
Contexto: o Tailwind v4 mantém as cores padrão (bg-red-500) além das do Figma.
Opções:
A) Zerar as cores padrão (--color-*: initial) agora.
   Custo: nenhum; só existem as cores do Figma.
B) Manter e confiar em revisão humana.
C) Zerar cores agora e espaçamento/tipografia depois das decisões 1 e 3.
Recomendação: C.
Parado: nada crítico; enquanto não decidido, classes com cores fora do Figma passam no lint.
```

```text
DECISÃO NECESSÁRIA 6 (dev + Design): movimento do hover dos botões
Contexto: hover anima o preenchimento (0,3 s, OUT_CUBIC) e as cores de hover (#53290e, #0a0d11,
#7b290d, #df9450) não são variáveis. A regra do projeto só permite animar transform e opacity.
Opções:
A) Camada sobreposta com a cor de hover, animando opacity (visual idêntico).
   Custo: um elemento a mais por botão; o Design cria a variável da cor de hover.
B) Transição direta de background-color.
   Custo: viola a regra; impacto de performance desprezível em área pequena.
C) Sem animação.
   Custo: perde o comportamento do protótipo.
Recomendação: A. A curva numérica de OUT_CUBIC precisa ser confirmada no Figma (MCP).
Parado: componente Botão.
```

```text
DECISÃO NECESSÁRIA 7 (Design): estados e componentes ausentes
Contexto: não há estado de foco em nenhum componente; faltam hover para Menu, Filtro, Aba e
Marcador; o Selo de estatuto tem 5 tipos e o código tem 6 (falta "imprensa"); "Pendência de
apuração" existe como componente visual; o Guia de Leitura do Mobile está em frames separados.
Opções:
A) O Design completa os estados e responde sobre Selo, Pendência e Mobile.
B) Implementar só o que está desenhado e adicionar foco com estilo padrão do navegador.
   Custo: foco fora da identidade visual.
C) Definirmos nós os estados ausentes. Custo: viola "o que não está no Figma não existe".
Recomendação: A; em paralelo, B só para foco visível, que é requisito de acessibilidade.
Parado: componentes interativos.
```

```text
DECISÃO NECESSÁRIA 8 (Design): contraste do tema A1
Contexto: texto-suave (terra/700) sobre superficie (areia/200) dá 3,87:1, abaixo de 4,5:1 (AA).
Opções:
A) O Design ajusta a cor (por exemplo escurecendo terra/700).
B) Restringir esse par a texto grande (a partir de 24px, ou 18,66px em negrito).
C) Nunca combinar esse par.
Recomendação: A.
Parado: uso de texto-suave sobre superficie no tema A1.
```

```text
DECISÃO NECESSÁRIA 9 (Design + Jornalismo): imagens e logo
Contexto: as imagens do arquivo não têm crédito nem licença; o logo existe só como PNG branco.
Opções:
A) O Design entrega o logo em SVG; o Jornalismo entrega as fotos finais com crédito e licença.
B) Usar as imagens do protótipo como provisórias.
   Custo: viola a regra editorial 7; não vai ao ar.
Recomendação: A.
Parado: Hero, 1ª Matéria e qualquer imagem; logo na Navbar.
```

```text
DECISÃO NECESSÁRIA 10 (dev): fontes tipográficas (depende da 1)
Contexto: 6 famílias do site (IBM Plex Mono, Public Sans, Work Sans, Newsreader, Space Grotesk,
DM Serif Display), todas do Google Fonts, com 3 a 4 pesos nas mais usadas.
Opções:
A) @fontsource/* por família, só subconjunto latino e só os pesos usados.
   Custo: até 6 dependências de desenvolvimento; versão fixada no npm.
B) Arquivos WOFF2 em public/fonts/ com a licença registrada.
   Custo: baixar e manter os arquivos à mão; sem hash, usa o cache padrão.
C) Carregar do Google Fonts.
   Custo: terceiro no caminho crítico e privacidade; contra a política do projeto.
Recomendação: A, depois da decisão 1 (que define quais famílias e pesos entram).
Parado: carregamento de fontes.
```

```text
DECISÃO NECESSÁRIA 11 (responsável): acesso do MCP ao Figma
Contexto: o MCP recusou a leitura (sem acesso de edição). O .fig serve para estrutura e valores,
mas não gera capturas de tela, necessárias para o agente revisor-fidelidade.
Opções:
A) Dar "Can edit" à conta conectada ao MCP.
B) Exportar PNGs de cada frame e breakpoint e guardá-los fora do Git.
C) Seguir só com o .fig e conferir fidelidade a olho.
Recomendação: A.
Parado: conferência automatizada de fidelidade.
```

```text
DECISÃO NECESSÁRIA 12 (Design): cores das telas fora das variáveis
Contexto: as telas (7:5, 7:4, 7:3 e Navbar 7:95) não ligam nenhum preenchimento a variáveis, e 6
das 13 cores usadas não existem nos 40 primitivos: #f8f8f8, #474a4e, #6e695f, #6f3713, #f9f0e2,
#000000.
Opções:
A) O Design liga as telas às variáveis e decide o destino das 6 cores (trocar por primitivo
   existente ou criar primitivo novo).
B) Criar primitivos para as 6 cores, com nomes dados pelo Design.
C) Usar as cores como hexadecimal solto.
   Custo: viola a regra de só usar tokens.
Recomendação: A.
Parado: implementação das telas com cor; só os tokens atuais estão disponíveis.
```

## Página inicial implementada (ADR-019)

| Elemento do Figma                        | `node-id`                              | Componente                                                |
| ---------------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| Navbar (Desktop, Tablet, Mobile)         | `15:782`, `15:766`, `15:616`           | `layout/Navbar.tsx`                                       |
| Hero                                     | `2:57`, `15:575`, `15:610`             | `sections/HeroSection.tsx`, `ui/Logo.tsx`, `ui/Botao.tsx` |
| 1ª Matéria                               | `15:936`, `18:1083`, `18:1182`         | `sections/PrimeiraMateria.tsx`                            |
| Quebra                                   | `20:1298`, `20:1311`, `20:1318`        | `sections/Quebra.tsx`                                     |
| Guia de Leitura                          | `35:612`, `35:878`, `35:1376`          | `sections/GuiaDeLeitura.tsx` e `Guia*.tsx`                |
| Pendência de apuração                    | `2:1120`                               | `ui/PendenciaApuracao.tsx`                                |
| Quadriculado de espaço de imagem e ícone | "Frame 3/4/5", "Icon", "Icon-quebrado" | `ui/EspacoReservado.tsx` (bloco tarjado)                  |

Medidas de cada breakpoint (margens 52, 48 e 22; larguras de coluna; tamanhos de texto) estão nos próprios componentes; os tamanhos e as entrelinhas, em `DESIGN_SYSTEM.md`.

Pontos que o Figma não define e ficaram com a escolha do ADR-019: Navbar fixa ou não ao rolar; destino de cada item da Navbar e do botão do Hero; estado de foco; capítulos 4 a 6 do Guia no Mobile; ícones (os "Icon-quebrado" são espaços reservados).
