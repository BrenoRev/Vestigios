# Vestígios

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)

Reportagem multimídia e interativa (data storytelling) sobre a deterioração do Centro do Recife.

- **Site:** https://vestigios-2jqhu9vgh-brenorevs-projects.vercel.app
- **Protótipo (Figma):** https://www.figma.com/design/haaMnXS0jhXZjXyBKugccp/Vestigio-%E2%80%94-Deteriora%C3%A7%C3%A3o-do-Recife?node-id=2-2&t=UzVMO4knOonmD3pv-1

## Contexto acadêmico

Projeto da disciplina **IF760, Tópicos Avançados em Mídia** (Narrativas Inovadoras com Dados), da Universidade Federal de Pernambuco (UFPE), Centro de Informática (CIn) e Centro de Artes e Comunicação (CAC), semestre **2026.2**.

Professores: **Nivan Ferreira**, **Guilherme Ranoya** e **Rodrigo Cunha**.

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) (modo `strict`)
- [Tailwind CSS v4](https://tailwindcss.com), configurado em CSS (`src/styles/tokens.css`)
- [React Router v7](https://reactrouter.com), em modo SPA
- [Motion](https://motion.dev) para animações
- [Phosphor Icons](https://phosphoricons.com)
- [Vercel Web Analytics](https://vercel.com/docs/analytics) para métricas de audiência, sem cookies
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights) para Core Web Vitals reais
- ESLint e Prettier

Detalhes e versões em [`.memory/decisions.md`](./.memory/decisions.md).

## Requisitos

- Node.js na versão registrada em [`.nvmrc`](./.nvmrc) (`nvm use`)
- npm

## Comandos

```bash
npm install            # instala as dependências
npm run dev            # servidor de desenvolvimento
npm run verificar      # tsc --noEmit + eslint + vite build (rode antes de abrir PR)
npm run check:conteudo # procura conteúdo pendente em src/
npm run build          # build de produção (falha se houver conteúdo pendente)
npm run preview        # serve a build localmente
npm run format         # formata com Prettier
```

## Deploy

Integração Git com a [Vercel](https://vercel.com). A branch de produção é a `main` deste repositório (https://github.com/BrenoRev/Vestígios): cada push nela publica em https://vestigios-2jqhu9vgh-brenorevs-projects.vercel.app, e outras branches geram previews.

A build de produção é bloqueada enquanto houver conteúdo marcado como pendente. Nos previews, as pendências aparecem como blocos tarjados, para revisão da equipe.

## Validação de PR

Toda PR para a `main` passa pelo workflow [`Validação`](./.github/workflows/validacao.yml), no GitHub Actions:

| Job          | O que confere                                                          |
| ------------ | ---------------------------------------------------------------------- |
| **Build**    | `tsc --noEmit`, `eslint .`, `prettier --check .` e `vite build`.       |
| **Conteúdo** | `check-conteudo`: nenhum `pendente(...)`, "em breve" ou "lorem ipsum". |

Para adiantar o resultado antes de abrir a PR:

```bash
npm run verificar && npm run format:check && npm run check:conteudo
```

## Estrutura de pastas

```text
.memory/        estado do projeto, decisões (ADRs) e especificações do Figma
docs/           metodologia, registro de fontes e direito de resposta
public/data/    dados tratados e leves servidos ao site
public/fonts/   fontes tipográficas
scripts/        check-conteudo.mjs e scripts de tratamento de dados
src/assets/     imagens e texturas
src/components/ layout, seções da reportagem e componentes de interface
src/content/    todo o conteúdo editorial (textos, dados, fontes, créditos)
src/hooks/      hooks
src/pages/      páginas
src/routes/     rotas
src/styles/     CSS global e design tokens
src/types/      tipos do conteúdo
```

Árvore completa e regras de cada pasta em [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Dados e fontes

Todo número, nome, citação e imagem publicado é rastreável até o registro de fontes, em [`docs/fontes.md`](./docs/fontes.md). Definições, recortes e limitações estão em [`docs/metodologia.md`](./docs/metodologia.md), que será publicada como página de metodologia do site.

## Para quem contribui

- Conteúdo editorial fica em `src/content/`, nunca dentro de componentes.
- Visual segue o protótipo no Figma. Tokens em [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).
- Regras completas (também para agentes de IA) em [`CLAUDE.md`](./CLAUDE.md).
- Quem usa Claude Code tem skills por etapa e agentes de revisão em [`.claude/`](./.claude/).

## Créditos

| Nome                                         | Curso                 |
| -------------------------------------------- | --------------------- |
| Arthur Jorge Barros Costa                    | Ciência da Computação |
| Breno Silva Xavier de Souza                  | Ciência da Computação |
| Carolina Gabriela de Arruda Brito dos Santos | Ciência da Computação |
| Elena Pimentel de Andrade Oliveira           | Ciência da Computação |
| Isaac Dias Marques da Silva                  | Ciência da Computação |
| João Henrique Portela de Brito Sousa         | Ciência da Computação |
| Raissa Machado Figueiredo                    | Ciência da Computação |
| Alex Viriato Souza                           | Design                |
| Annah Marcelly Silva e Souza Paixão          | Design                |
| Débora Lemos de Barros Lima                  | Design                |
| Raphaella Vitoria da Silva Ferreira          | Design                |
| Isabelle Arruda Annes e Silva                | Jornalismo            |
| Jessica Oliveira da Silva                    | Jornalismo            |
| Sofia de Souza Rodrigues                     | Jornalismo            |
| Witória Maria Ribeiro de Souza               | Jornalismo            |

Equipe de 15 estudantes de Ciência da Computação, Design e Jornalismo, agrupados por curso.
