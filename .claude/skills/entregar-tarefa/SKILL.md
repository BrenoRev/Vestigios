---
name: entregar-tarefa
description: Fecha qualquer tarefa no Vestígios. Confere a Definição de pronto, atualiza .memory/agent_state.md, faz commits em português sem co-autoria, abre a PR para a main e acompanha os checks Build e Conteúdo. Use ao terminar uma implementação, ou quando pedirem "fecha a tarefa", "abre a PR", "sobe isso", "commita".
---

# Entregar tarefa

## 1. Definição de pronto

Rode e confira, nesta ordem:

```bash
npm run verificar        # tsc --noEmit + eslint . + vite build
npm run format:check     # prettier
npm run check:conteudo   # pendências editoriais (precisa zerar antes de ir para produção)
```

- [ ] A tela bate com o frame do Figma em todos os breakpoints do protótipo (agente `revisor-fidelidade`).
- [ ] Conferida com `prefers-reduced-motion`.
- [ ] Nenhum texto editorial em componente; nenhum valor arbitrário fora dos tokens.
- [ ] Nenhum comentário desnecessário (só o porquê).
- [ ] Decisões novas registradas (`registrar-decisao`).

Pendência em `check:conteudo` não impede a PR, mas a PR fica com o job **Conteúdo** vermelho e não vai para a `main` enquanto não for resolvida (ADR-004 e ADR-008).

## 2. Estado do projeto

Atualize `.memory/agent_state.md`: mova o que terminou para **Feito**, ajuste **Em andamento**, **Bloqueado por decisão** e **Próximo passo**. Curto e atual.

## 3. Commits

- Branch própria (`feat/…`, `fix/…`, `docs/…`, `content/…`, `chore/…`), nunca direto na `main`.
- Mensagem em português: `tipo: descrição no imperativo` (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`, `content`).
- Um commit por unidade lógica.
- **Nunca** inclua `Co-Authored-By`, "Generated with" ou qualquer atribuição de IA.

## 4. PR

Monte o corpo a partir de `.github/pull_request_template.md`: preencha cada seção, apague as que não se aplicam e marque só os itens da Definição de pronto que foram de fato conferidos. Em português e sem rodapé de atribuição.

```bash
git push -u origin <branch>
gh pr create --base main --title "<tipo>: <resumo>" --body-file <corpo-preenchido.md>
gh pr checks --watch
```

## 5. Merge

- Só com **Build** e **Conteúdo** verdes; a regra da `main` exige os dois e a branch atualizada.
- Branch desatualizada: `git merge origin/main` na branch e novo push.
- Nunca force push na `main`, nunca desligue o ruleset, nunca altere configuração da Vercel ou do repositório sem autorização explícita do responsável.
