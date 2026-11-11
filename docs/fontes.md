# Registro de fontes

> **Única fonte de verdade para `src/content/`.** Nenhum número, nome, citação, imagem ou URL entra no site sem um registro aqui. Mantido pela equipe de Jornalismo.

## Como registrar

1. Dê à fonte um `id` estável em kebab-case. É o mesmo `id` usado no tipo `Fonte` e no `fonteId` de cada `Dado` em `src/content/`.
2. Classifique o **estatuto** com um destes valores (união fechada; valor novo exige ADR):

| Estatuto             | Quando usar                                             |
| -------------------- | ------------------------------------------------------- |
| `tecnica-academica`  | Estudos, teses, artigos, laudos técnicos.               |
| `institucional`      | Órgãos públicos, bases oficiais, documentos de governo. |
| `movimento-social`   | Produção de movimentos e coletivos.                     |
| `midia-independente` | Reportagem publicada por veículo independente.          |
| `imprensa`           | Reportagem publicada pela imprensa tradicional.         |
| `fonte-humana`       | Entrevista feita pela equipe (sem URL).                 |

3. Reportagem publicada **nunca** é dado primário: recebe `imprensa` ou `midia-independente`.
4. Datas no formato `AAAA-MM-DD` (ou `AAAA-MM` / `AAAA` quando só isso for conhecido).
5. Toda cifra monetária usada no site registra o **ano de referência**.

## Fontes

| id  | Título | Autor ou órgão | Estatuto | URL | Data de publicação | Data de acesso | Usada em | Observações |
| --- | ------ | -------------- | -------- | --- | ------------------ | -------------- | -------- | ----------- |

## Vínculos com pessoas físicas, empresas ou proprietários

> Para **nomear** alguém no site são obrigatórios os três registros abaixo. Faltando qualquer um, **agregue** (não nomeie). Endereço residencial de pessoa física nunca é publicado.

| Pessoa ou empresa | Fonte primária do vínculo (`id`) | Data da informação | Tentativa de direito de resposta (ver `direito-de-resposta.md`) | Pode nomear? |
| ----------------- | -------------------------------- | ------------------ | --------------------------------------------------------------- | ------------ |

## Imagens

> Foto sem crédito e licença registrados não entra, inclusive de acervo.

| Arquivo | Crédito | Licença | Acervo | Data | Onde é usada |
| ------- | ------- | ------- | ------ | ---- | ------------ |
