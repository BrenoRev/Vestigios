# Como contribuir com o Vestígios

Guia para quem continua o desenvolvimento: telas a partir do Figma, conteúdo vindo da equipe de Jornalismo, dados e mapas. As regras completas estão no [`CLAUDE.md`](./CLAUDE.md), que vale para pessoas e agentes de IA; este guia mostra o caminho prático.

## Antes de começar

1. Leia o [`CLAUDE.md`](./CLAUDE.md) inteiro, o [`.memory/agent_state.md`](./.memory/agent_state.md) (o que está feito, em andamento e bloqueado) e as decisões em [`.memory/decisions.md`](./.memory/decisions.md).
2. Prepare o ambiente:

   ```bash
   nvm use          # versão do Node em .nvmrc
   npm install
   npm run dev      # http://localhost:5173
   ```

3. Confira que está tudo verde: `npm run verificar && npm run format:check`.

## Quem faz o quê

| Papel                        | O que faz                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Design                       | Mantém o protótipo no Figma, que é a fonte única do visual. Responde às decisões de layout, estado e animação. |
| Jornalismo                   | Apura e fornece textos, números, fontes, citações, imagens e créditos. **Não edita o repositório.**            |
| Dev responsável por conteúdo | Recebe o material do Jornalismo e registra no repositório, seguindo a ordem abaixo.                            |
| Dev de telas                 | Implementa layout, componentes e seções a partir dos frames do Figma.                                          |
| Dev de dados e mapas         | Trata as bases, gera os arquivos leves do site e implementa mapas e gráficos depois da decisão de técnica.     |

## Fluxo de trabalho no Git

1. Branch a partir da `main` atualizada: `feat/…`, `fix/…`, `content/…`, `docs/…` ou `chore/…`.
2. Commits em português, `tipo: descrição no imperativo`, um por unidade lógica. **Sem `Co-Authored-By` nem atribuição de IA.**
3. PR para a `main` usando o template (ele aparece sozinho ao abrir a PR no GitHub).
4. A `main` é protegida: a PR só entra com os checks **Build** e **Conteúdo** verdes e a branch atualizada. Cada push na `main` publica na Vercel.

## Como o conteúdo entra

O Jornalismo entrega o material (documento, planilha, mensagem); o dev responsável registra. Nada é escrito "de cabeça" ou completado para ficar bonito.

1. **Registre a fonte em [`docs/fontes.md`](./docs/fontes.md)** com `id`, estatuto, URL, data de publicação e data de acesso. Reportagem publicada recebe estatuto `imprensa` ou `midia-independente`, nunca é dado primário.
2. **Passe para `src/content/`** em TypeScript tipado (`Fonte`, `Dado`, `Imagem` em [`src/types/content.ts`](./src/types/content.ts)). Dado sem `fonteId` e imagem sem crédito, licença e acervo não compilam.
3. **Troque o `pendente(...)`** correspondente pelo conteúdo real.
4. **Na PR**, preencha a seção Conteúdo do template: ids das fontes e quem do Jornalismo confirmou o texto final, com data.

Regras que bloqueiam publicação (detalhes no `CLAUDE.md`):

- não afirmar como fato que o abandono é intencional; descrever o padrão, nomear quem se beneficia e deixar a intenção como pergunta;
- só nomear pessoa, empresa ou proprietário com fonte do vínculo, data e tentativa de direito de resposta registradas ([`docs/direito-de-resposta.md`](./docs/direito-de-resposta.md)); faltou algum, agregue;
- nunca publicar endereço residencial de pessoa física;
- toda cifra monetária mostra o ano de referência;
- foto só com crédito e licença registrados.

Enquanto o conteúdo não chega, use `pendente("o que falta, quem fornece")`. Ele aparece como bloco tarjado no desenvolvimento e no preview, e **bloqueia a produção** até ser resolvido.

## Como as telas são feitas

- O protótipo no Figma é a fonte única: layout, cores, tipografia, espaçamentos, animações e navegação. O que não está no Figma não existe.
- Estilo só com os tokens de [`src/styles/tokens.css`](./src/styles/tokens.css), documentados em [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). Valor arbitrário (`w-[327px]`) é bloqueado pelo lint.
- Componente não tem texto: recebe tudo por props, a partir de `src/content/`.
- Onde cada coisa vai: [`ARCHITECTURE.md`](./ARCHITECTURE.md). Pasta nova só com decisão registrada.
- Animação só de `transform` e `opacity`, scroll nativo, e tudo legível com `prefers-reduced-motion`. Metas de performance no `CLAUDE.md`.

## Como os dados entram

- Dados brutos pesados **não entram no Git**. Guarde-os fora do repositório.
- O script de tratamento fica em `scripts/` e registra, no topo, de onde veio o arquivo bruto (URL, data de acesso, como obter).
- A saída leve que o site consome (JSON, GeoJSON) vai para `public/data/`.
- Cada número que aparece no site precisa chegar a uma fonte em `docs/fontes.md`.

## Mapas e gráficos

A técnica ainda não foi escolhida e não deve ser instalada antes da decisão. Quem for implementar abre a decisão no formato "DECISÃO NECESSÁRIA" do `CLAUDE.md`, partindo de três opções: SVG estático gerado de dados pré-processados, `d3-geo` + `d3-scale`, ou MapLibre.

Requisitos que valem para qualquer opção:

- alternativa em texto ou tabela para cada gráfico e mapa;
- sem eixo truncado enganoso e sem escala que exagere a variação;
- unidade de agregação e método de classificação dos mapas registrados em `.memory/decisions.md`;
- dentro do orçamento de performance.

## Quando faltar definição

Não improvise. Estado de hover ausente, breakpoint que o Figma não cobre, ícone, animação, efeito pesado, dependência nova: abra a "DECISÃO NECESSÁRIA" (formato no `CLAUDE.md`) para a equipe e registre a resposta como ADR em `.memory/decisions.md`.

## Antes de pedir revisão

Siga a Definição de pronto do template da PR e atualize o `.memory/agent_state.md`.

## Para quem usa Claude Code

A pasta [`.claude/`](./.claude/) tem uma skill por etapa (`extrair-design-tokens`, `implementar-secao`, `registrar-fonte`, `registrar-decisao`, `entregar-tarefa`, `fechamento`) e três agentes de revisão (`revisor-editorial`, `revisor-tecnico`, `revisor-fidelidade`). A tabela de quando usar cada um está no `CLAUDE.md`.
