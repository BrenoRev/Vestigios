---
name: implementar-secao
description: Fases 3 e 4 do Vestígios. Constrói layout base, componente de interface ou seção da reportagem a partir de um frame do Figma, fiel ao protótipo, com conteúdo vindo de src/content e dentro do orçamento de performance e acessibilidade. Use quando pedirem "implementa a seção X", "monta o header/footer/grid", "constrói o componente do frame", "fase 3", "fase 4" ou passarem um link ou node-id do Figma para virar código.
---

# Implementar seção ou componente a partir do Figma

## Antes de começar

1. Leia `CLAUDE.md`, `.memory/agent_state.md`, `DESIGN_SYSTEM.md` e `.memory/figma_specs.md`.
2. Os tokens da Fase 2 precisam existir em `src/styles/tokens.css`. Se não existirem, pare e use `extrair-design-tokens`.
3. Identifique o frame (nome e `node-id`). Sem frame não há implementação: o que não está no Figma não existe.
4. Branch: `feat/secao-<nome-do-frame>` ou `feat/<componente>`.

## Ler o frame

- Com o MCP do Figma: `create_session` (cópia de trabalho com acesso do MCP: fileKey `deTyWOTv6xMUkI0jWhaJPP`; o original do Design (`haaMnXS0jhXZjXyBKugccp`) não tem acesso do MCP), depois `get_screenshot` e `get_design_context` do `node-id`, em cada breakpoint que o protótipo tiver. Carregue a skill `figma-design-to-code` antes de `get_design_context`, se ela existir.
- A saída do Figma é referência. Traduza para os tokens do projeto; não cole código gerado.
- Medida que não bate com nenhum token: **não crie valor arbitrário**. Use `registrar-decisao`.

## Onde cada coisa vai

| O quê                                   | Onde                                                          |
| --------------------------------------- | ------------------------------------------------------------- |
| Header, Footer, Container, Grid         | `src/components/layout/`                                      |
| Peça reutilizável do protótipo          | `src/components/ui/`                                          |
| Bloco da reportagem (um por frame)      | `src/components/sections/<NomeDoFrame>.tsx`                   |
| Página                                  | `src/pages/`, registrada em `src/routes/index.tsx`            |
| Texto, número, legenda, crédito, imagem | `src/content/<assunto>.ts`, tipado com `src/types/content.ts` |
| Hook                                    | `src/hooks/useNome.ts`                                        |

Componente recebe tudo por props. Pasta nova, dependência nova ou tipo de conteúdo novo: `registrar-decisao`.

## Conteúdo

- Texto do Figma é **referência de layout**, não conteúdo final. Enquanto o Jornalismo não confirmar, use `pendente("o que falta, quem fornece")` e renderize com `EspacoReservado` ou `PendenciaApuracao` (use `ehPendente` para decidir).
- Conteúdo confirmado entra pela skill `registrar-fonte`.
- Nunca invente número, nome, data, citação, legenda, crédito ou URL, nem como exemplo.

## Regras de implementação

- **Estilo:** só utilitários que usam tokens. Nada de `[...]` em `className` (o ESLint bloqueia).
- **Breakpoints:** só os do protótipo. Layout num tamanho que o Figma não cobre é Stop & Ask.
- **Estados:** hover, foco, ativo como no Figma. Estado ausente é Stop & Ask. Foco visível sempre.
- **Animação:** Motion (`motion/react`), só `transform` e `opacity`. Gatilho com `useInView`/`useScroll` ou `IntersectionObserver`. Scroll nativo, sem scroll-jacking. Conteúdo legível com `prefers-reduced-motion`.
- **Efeitos:** `mix-blend-mode` só em camada parada; sem `backdrop-filter` em área grande; textura como WebP/AVIF exportado, não filtro ao vivo.
- **Imagens:** tipo `Imagem` (crédito, licença, acervo obrigatórios) com o arquivo importado via `?responsiva`, renderizado com `ImagemResponsiva`. Passe `sizes` conforme a largura da imagem em cada breakpoint do frame e `primeiraDobra` só para a imagem principal da primeira tela.
- **Seção pesada:** `React.lazy` + `Suspense`.
- **Mapas e gráficos:** a técnica ainda não foi decidida. Pare e use `registrar-decisao` com as opções do CLAUDE.md. Todo gráfico precisa de alternativa em texto ou tabela.
- **Acessibilidade:** HTML semântico, ordem de títulos, `alt` descritivo vindo de `src/content`, navegação por teclado.
- **Comentários:** só o porquê (seção Comentários no código do CLAUDE.md).

## Verificação

1. `npm run verificar` e `npm run format:check`.
2. Compare com o frame em cada breakpoint. Com o app rodando (`npm run dev`), capture a tela em modo headless, ajustando o caminho do Chrome ao seu sistema:
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
     --window-size=1440,900 --screenshot=/tmp/vestigios-1440.png http://localhost:5173/
   ```
   Repita com `--force-prefers-reduced-motion` para conferir movimento reduzido.
3. Peça os agentes `revisor-fidelidade` (tela contra o frame) e `revisor-tecnico` (stack, tokens, performance, acessibilidade).
4. Feche com `entregar-tarefa`.
