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

## Conteúdo provisório do protótipo

> Texto copiado do Figma que o Jornalismo ainda não confirmou (ADR-019). Fica em `src/content/pagina-inicial.ts`. Trechos marcados com `provisorio(...)` no código não têm destaque na tela; o restante é texto de explicação do protótipo que também aguarda confirmação. Nada disso entra como dado: cada número e fato precisa de uma linha na tabela de fontes acima antes de a marca sair.

| O que está provisório                                                                                                                                                                                                               | O que o Jornalismo precisa fazer                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frase do Hero ("não é acidente")                                                                                                                                                                                                    | Reformular: afirma intenção como fato (regra editorial 2).                                                                                               |
| Título, subtítulos, parágrafos, citação e autor da "1ª Matéria"                                                                                                                                                                     | Entregar o texto da reportagem; o do protótipo é de preenchimento em inglês.                                                                             |
| Texto da "Quebra"                                                                                                                                                                                                                   | Confirmar autoria e licença do texto.                                                                                                                    |
| Números e fatos do Guia (23, 18, 263, 47, 4.191, 42, 112, 136, IEP de 1997, Decreto-Lei nº 25 de 1937, prazo de 15 dias, Rua da Guia nº 88)                                                                                         | Registrar fonte primária, data e ano de referência de cada um.                                                                                           |
| Subtítulo do capítulo 6 ("Três esferas...")                                                                                                                                                                                         | Repetido do capítulo 4 no protótipo; fornecer o texto certo.                                                                                             |
| Rótulos da Navbar, textos de explicação do Guia                                                                                                                                                                                     | Confirmar os textos.                                                                                                                                     |
| Fatos jurídicos e institucionais do Guia (efeitos do tombamento, indenização, fluxo do Iphan e do Conselho Consultivo, Livro do Tombo, tombamento provisório, atribuições de Iphan, Fundarpe e Prefeitura, "ninguém reproduz mais") | Registrar fonte `institucional` (lei, decreto, site do órgão) e data de acesso; os marcados na tela são os de maior peso, o resto segue o mesmo caminho. |
| Entidades e datas citadas (ONG Habitat para a Humanidade, Defesa Civil, bairro de Santo Antônio, junho de 2022, "mais de 20 anos", "dez anos", 2022, 2026, SP e Bahia)                                                              | Registrar o documento de cada uma, com ano de referência; agregar a ONG até haver registro.                                                              |
| Crédito da foto da Rua da Guia (o Figma cita uma empresa)                                                                                                                                                                           | Só nomear com os três registros (vínculo, data, direito de resposta); por ora o texto diz "a confirmar".                                                 |
| Logo `src/assets/images/logo.webp`                                                                                                                                                                                                  | Arte do projeto (PNG do arquivo do Design): registrar autoria e licença na tabela de imagens.                                                            |
| Fotos, ícones e logos de órgãos (blocos tarjados na tela)                                                                                                                                                                           | Fornecer arquivo, crédito, licença e acervo (regra editorial 7).                                                                                         |

## Imagens

> Foto sem crédito e licença registrados não entra, inclusive de acervo.

| Arquivo | Crédito | Licença | Acervo | Data | Onde é usada |
| ------- | ------- | ------- | ------ | ---- | ------------ |
