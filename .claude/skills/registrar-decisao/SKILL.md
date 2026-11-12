---
name: registrar-decisao
description: Protocolo Stop & Ask do Vestígios. Quando faltar definição (estado, breakpoint, ícone, animação, conteúdo, efeito fora do orçamento, dependência, pasta ou tipo novo), monta a DECISÃO NECESSÁRIA para a equipe e, depois da resposta, grava o ADR em .memory/decisions.md e atualiza o agent_state. Use sempre que for tentado a improvisar, ou quando pedirem "registra a decisão", "abre um ADR", "o que precisamos decidir".
---

# Registrar decisão (Stop & Ask)

## 1. Parar e perguntar

Não implemente a parte em aberto. Responda exatamente neste formato:

```text
DECISÃO NECESSÁRIA
Contexto: o que falta e onde (com o frame do Figma e o node-id, se houver).
Opções: no máximo 3, com o custo de cada uma (performance, prazo, dependência, fidelidade).
Recomendação: qual e por quê.
O que fica parado enquanto isso não for decidido.
```

- Opções reais, nunca uma opção "inventada pelo agente" sem base no Figma, no CLAUDE.md ou na documentação oficial.
- Em `.memory/agent_state.md`, acrescente o item em **Bloqueado por decisão**.
- Siga com o que não depende da decisão, se houver.

## 2. Depois da resposta

Acrescente ao fim de `.memory/decisions.md`, com o próximo número livre:

```markdown
## ADR-NNN: título curto

- **Data:** AAAA-MM-DD
- **Contexto:** o que estava em aberto e onde.
- **Decisão:** o que foi decidido, por quem respondeu (papel, não nome, se a pessoa preferir).
- **Alternativas descartadas:** as outras opções e por que saíram.
- **Consequência:** o que muda no código, nas regras ou no fluxo.
```

- ADR antigo não é apagado: o novo cita o que substitui.
- Se a decisão mudar uma regra, atualize `CLAUDE.md` (e `ARCHITECTURE.md` se for pasta nova; `DESIGN_SYSTEM.md` se for token).
- Tire o item de **Bloqueado por decisão** em `agent_state.md`.

## Decisões já sabidamente pendentes

Antes de abrir uma nova, confira a lista em `agent_state.md` (mapas e gráficos, fontes tipográficas, imagens responsivas, página 404, tema padrão do Tailwind, URL estável de produção, entre outras).
