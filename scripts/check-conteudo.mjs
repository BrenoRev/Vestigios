#!/usr/bin/env node
/**
 * Com BLOQUEIA_PRODUCAO, falha na build local e na produção da Vercel; no
 * preview (VERCEL_ENV=preview) só avisa, para a equipe revisar trabalho em
 * andamento (ADR-004). Desligada, só avisa em qualquer ambiente (ADR-019).
 */
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const BLOQUEIA_PRODUCAO = false;

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const PASTA_SRC = join(RAIZ, "src");

const EXTENSOES = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".css"]);

// Arquivo que define a função; é a única ocorrência permitida.
const EXCECOES = new Set(["src/content/pendente.ts"]);

const PADROES = [
  { regex: /(?<![\w.-])pendente\s*\(/, motivo: "pendente() restante" },
  {
    regex: /(?<![\w.-])provisorio\s*\(/,
    motivo: "texto provisório do protótipo",
  },
  { regex: /em breve/i, motivo: 'texto "em breve"' },
  { regex: /lorem ipsum/i, motivo: 'texto "lorem ipsum"' },
];

async function listarArquivos(pasta) {
  const entradas = await readdir(pasta, { withFileTypes: true });
  const arquivos = await Promise.all(
    entradas.map((entrada) => {
      const caminho = join(pasta, entrada.name);
      if (entrada.isDirectory()) return listarArquivos(caminho);
      return EXTENSOES.has(extname(entrada.name)) ? [caminho] : [];
    }),
  );
  return arquivos.flat();
}

const ocorrencias = [];

for (const arquivo of await listarArquivos(PASTA_SRC)) {
  const rel = relative(RAIZ, arquivo).split("\\").join("/");
  if (EXCECOES.has(rel)) continue;

  const linhas = (await readFile(arquivo, "utf8")).split("\n");
  linhas.forEach((linha, i) => {
    for (const { regex, motivo } of PADROES) {
      if (regex.test(linha)) {
        ocorrencias.push(`  ${rel}:${i + 1}  ${motivo}\n    ${linha.trim()}`);
      }
    }
  });
}

if (ocorrencias.length === 0) {
  console.log("check-conteudo: nenhuma pendência editorial em src/.");
  process.exit(0);
}

const ehPreview = process.env.VERCEL_ENV === "preview";
const apenasAvisa = ehPreview || !BLOQUEIA_PRODUCAO;
const cabecalho = `check-conteudo: ${ocorrencias.length} pendência(s) editorial(is) em src/:`;

if (apenasAvisa) {
  console.warn(`${cabecalho}\n${ocorrencias.join("\n")}`);
  console.warn(
    BLOQUEIA_PRODUCAO
      ? "\nPreview da Vercel: a build segue. Produção ficará bloqueada."
      : "\nO bloqueio da produção está desligado (ADR-019): a build segue.",
  );
  process.exit(0);
}

console.error(`${cabecalho}\n${ocorrencias.join("\n")}`);
console.error(
  "\nBuild de produção bloqueada. Resolva as pendências (docs/fontes.md) antes de publicar.",
);
process.exit(1);
