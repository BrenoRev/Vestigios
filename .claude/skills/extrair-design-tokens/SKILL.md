---
name: extrair-design-tokens
description: Fase 2 do Vestígios. Extrai do protótipo no Figma a paleta, tipografia, espaçamentos, raios, breakpoints, texturas, estados e movimento, e preenche DESIGN_SYSTEM.md, src/styles/tokens.css e .memory/figma_specs.md sem inventar nenhum valor. Use quando pedirem "fase 2", "extrair tokens", "ler o Figma", "montar o design system", "atualizar tokens" ou trouxerem exportações e capturas do Figma.
---

# Extrair design tokens do Figma

Objetivo: transformar o protótipo em tokens do Tailwind v4 rastreáveis até o frame de origem. **Nenhum valor inventado, arredondado ou "aproximado".**

## Antes de começar

1. Leia `CLAUDE.md`, `.memory/agent_state.md`, `DESIGN_SYSTEM.md` e `.memory/figma_specs.md`.
2. Protótipo: `fileKey` **haaMnXS0jhXZjXyBKugccp**, nó raiz **2:2** (https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2).
3. Crie uma branch: `feat/design-tokens` (ou `feat/tokens-<grupo>` se for por partes).

## Como ler o Figma

**Com o MCP do Figma conectado:**

1. `create_session` com o `fileKey` antes de qualquer outra ferramenta do Figma.
2. `get_metadata` no nó `2:2` para listar páginas e frames (nome, `node-id`, largura).
3. `get_variable_defs` para variáveis e estilos (cores, tipos, espaçamentos, raios).
4. Por frame: `get_screenshot` (referência visual) e `get_design_context` (medidas). Se existir a skill `figma-design-to-code`, carregue-a antes de `get_design_context`. A saída é referência de medida, não código para colar.
5. Texturas e imagens de fundo: `download_assets`, depois converta para WebP ou AVIF em `src/assets/textures/`.

**MCP sem acesso, mas com `.fig` exportado em `figma/`:** o arquivo é um zip com `canvas.fig` em formato `fig-kiwi`; o método de leitura está em "Como foi extraído", em `.memory/figma_specs.md`. Ele dá estrutura, variáveis, estilos e medidas, mas não dá capturas de tela.

**Sem acesso ao Figma:** pare e peça à equipe de Design as exportações (Dev Mode/inspect com medidas, lista de estilos e variáveis, capturas de cada frame em cada breakpoint, arquivos de textura). Nunca suponha medidas a partir de captura sem escala.

## Passos

1. **Inventário** em `.memory/figma_specs.md`: tabela "Telas e frames" (nome, `node-id`, breakpoint, página do site), ordem das seções e fluxo de navegação.
2. **Tokens em `DESIGN_SYSTEM.md`:** preencha cada tabela (Cores, Tipografia, Espaçamento, Raios, Breakpoints, Texturas, Movimento) com valor, nome do estilo no Figma e frame de origem.
3. **Tokens em `src/styles/tokens.css`**, dentro de `@theme`, com os namespaces da v4:
   - cores `--color-*`; famílias `--font-*`; tamanhos `--text-*` (com `--text-*--line-height` e `--text-*--letter-spacing` quando o Figma definir); pesos `--font-weight-*`;
   - espaçamento `--spacing` (base) ou `--spacing-*`; raios `--radius-*`; breakpoints `--breakpoint-*`; larguras `--container-*`;
   - curvas `--ease-*`; animações `--animate-*` (com `@keyframes` no próprio `@theme`).
   - Nome do token = nome do estilo no Figma em kebab-case. Sem tradução livre.
4. **Tema padrão do Tailwind:** a decisão de zerar os tokens padrão (por exemplo `--color-*: initial`) está pendente em `agent_state.md`. Use a skill `registrar-decisao` antes de aplicar.
5. **Fontes tipográficas:** forma de servir (`public/fonts/` ou `@fontsource/*`) é decisão pendente. Use `registrar-decisao`, com a licença de cada família.
6. **Contraste:** calcule a razão WCAG de cada par texto/fundo e registre em `DESIGN_SYSTEM.md`. Par abaixo de AA: aponte o frame e pergunte. **Não altere cor.**
7. **Movimento:** registre duração, curva, gatilho e propriedades. Efeito que anime algo além de `transform`/`opacity`, ou que dependa de filtro ao vivo em área grande, vai para `registrar-decisao`, sem simplificar por conta própria.
8. **Estados** (hover, foco, ativo, desabilitado) na tabela de estados de `figma_specs.md`. Estado ausente no Figma é Stop & Ask.

## Verificação

- `npm run verificar` passa e nenhuma classe usa valor arbitrário.
- Cada token de `tokens.css` aparece em `DESIGN_SYSTEM.md` com frame de origem, e vice-versa.
- Peça o agente `revisor-tecnico` para conferir a mudança.
- Feche com a skill `entregar-tarefa`.
