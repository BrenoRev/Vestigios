---
name: registrar-fonte
description: Registra no Vestigios uma fonte, um dado, uma citação ou uma imagem vindos da equipe de Jornalismo, primeiro em docs/fontes.md e depois em src/content tipado, aplicando as proibições editoriais. Use quando a equipe mandar conteúdo, número, entrevista, foto, crédito ou link para entrar no site, ou pedir "registra essa fonte", "adiciona esse dado", "troca o pendente por".
---

# Registrar fonte, dado ou imagem

O site é jornalismo: cada número, nome e imagem tem consequência. Esta skill só registra o que a equipe forneceu. **Se a informação não veio da equipe (mensagem, documento, planilha), não registre: peça a origem.**

## Ordem obrigatória

1. **`docs/fontes.md` primeiro.** Ele é a única fonte de verdade para `src/content/`.
2. Depois o conteúdo tipado em `src/content/`.
3. Por fim, troque o `pendente(...)` correspondente pelo conteúdo real.

## Fonte

- `id` estável em kebab-case, igual em `docs/fontes.md` e no objeto `Fonte`.
- `estatuto` da união fechada: `tecnica-academica`, `institucional`, `movimento-social`, `midia-independente`, `imprensa`, `fonte-humana`. Valor novo exige ADR (`registrar-decisao`).
- **Reportagem publicada nunca é dado primário:** recebe `imprensa` ou `midia-independente`.
- `fonte-humana` (entrevista) tem `url: null`. As demais exigem URL.
- `dataPublicacao` e `dataAcesso` em `AAAA-MM-DD` (ou `AAAA-MM`/`AAAA` se só isso for conhecido). Data desconhecida: pergunte, não estime.
- Fontes ficam em `src/content/fontes.ts` (crie o arquivo na primeira fonte, exportando um array tipado como `Fonte[]`).

## Dado

- `valor`, `unidade`, `anoReferencia`, `recorte` e `fonteId` obrigatórios; `fonteId` precisa existir em `docs/fontes.md`.
- Toda cifra monetária exibe o ano de referência na interface.
- Dado antigo não pode ser apresentado como atual: o texto que o acompanha diz o ano.

## Pessoas, empresas e proprietários

Para **nomear**, `docs/fontes.md` precisa de três registros: fonte primária do vínculo, data da informação e tentativa de direito de resposta (em `docs/direito-de-resposta.md`). Faltou um: **agregue** ("proprietários privados", "empresas do setor"), não nomeie. Endereço residencial de pessoa física nunca entra.

## Imagem

- Arquivo em `src/assets/images/`, objeto `Imagem` com `credito`, `licenca`, `acervo`, `alt` descritivo, `largura` e `altura` reais.
- Registro na tabela "Imagens" de `docs/fontes.md`. Sem crédito e licença, a imagem não entra, inclusive de acervo.

## Texto

- Não afirme como fato que o abandono é intencional ou deliberado. Descreva o padrão observado, nomeie quem se beneficia e mantenha a intenção como pergunta aberta.
- Citação literal só com a fonte registrada e a grafia exata recebida.

## Verificação

- `npm run typecheck` (fonte, dado ou imagem incompletos não compilam).
- `npm run check:conteudo` para ver o que ainda está pendente.
- Peça o agente `revisor-editorial` sobre os arquivos alterados.
- Feche com `entregar-tarefa` (commit do tipo `content:`).
