---
name: fechamento
description: Fase 5 do Vestígios. Checklist final antes da publicação definitiva: zero pendências, créditos completos, metodologia publicada, varredura editorial, rastreabilidade de cada número, comparação tela a tela com o Figma, performance real e teste com alguém de fora. Use quando pedirem "fase 5", "fechamento", "está pronto para publicar?", "checklist final".
---

# Fechamento (Fase 5)

Produza um relatório com cada item como **ok**, **falha** (com `arquivo:linha` ou frame) ou **depende de pessoa**. Não marque ok sem evidência.

## Checklist

1. **Zero pendências e zero texto provisório:** `npm run check:conteudo` sem ocorrências (`pendente(` e `provisorio(`) e `npm run build` passando. Mude `BLOQUEIA_PRODUCAO` para `true` em `scripts/check-conteudo.mjs` (ADR-019) e confirme que a build de produção falha ao reintroduzir uma pendência de teste.
2. **Créditos completos** no README e na página de créditos do site, se o protótipo tiver uma.
3. **Metodologia publicada:** `docs/metodologia.md` sem `[pendente]` e a página de metodologia no site com o mesmo conteúdo.
4. **Varredura editorial:** peça o agente `revisor-editorial` sobre `src/content/`, `docs/` e textos de gráfico. Foco em afirmação de intenção não comprovada, pessoa nomeada sem os três registros, dado antigo como atual, imprensa como dado primário, foto sem crédito.
5. **Rastreabilidade:** todo `fonteId` usado em `src/content/` existe em `src/content/fontes.ts` e em `docs/fontes.md`; toda fonte registrada tem data de acesso.
   ```bash
   grep -rhoE 'fonteId: *"[^"]+"' src/content | sort -u
   ```
6. **Honestidade gráfica:** cada gráfico e mapa com alternativa em texto ou tabela, sem eixo truncado enganoso, com unidade de agregação e método de classificação registrados em `.memory/decisions.md`.
7. **Fidelidade:** peça o agente `revisor-fidelidade` para cada frame do protótipo, em todos os breakpoints.
8. **Técnico:** peça o agente `revisor-tecnico` sobre o projeto inteiro.
9. **Performance real:** confira no painel do Vercel Speed Insights se o LCP está dentro da meta registrada em `CLAUDE.md`.
10. **Acessibilidade:** navegação completa por teclado e conferência com `prefers-reduced-motion`.
11. **Teste com alguém de fora da equipe:** registro de quem testou (papel), quando e o que foi ajustado. Depende de pessoa.

## Saída

- Relatório no chat e resumo em `.memory/agent_state.md`.
- Cada falha vira tarefa (com a skill da etapa) ou decisão (`registrar-decisao`).
