#!/usr/bin/env node
/**
 * Bloqueia a build de produção com pendências editoriais.
 *
 * Varre src/ atrás de chamadas pendente(...), "em breve" e "lorem ipsum".
 * Node puro, sem dependência.
 *
 * - Build local e build de produção na Vercel (VERCEL_ENV=production):
 *   qualquer ocorrência encerra com código 1 e a build falha.
 * - Preview da Vercel (VERCEL_ENV=preview): lista as ocorrências como
 *   aviso e deixa a build seguir, para a equipe revisar em andamento.
 */
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const PASTA_SRC = join(RAIZ, "src");

const EXTENSOES = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".css"]);

// Arquivo que define a função; é a única ocorrência permitida.
const EXCECOES = new Set(["src/content/pendente.ts"]);

const PADROES = [
  { regex: /(?<![\w.-])pendente\s*\(/, motivo: "pendente() restante" },
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
const cabecalho = `check-conteudo: ${ocorrencias.length} pendência(s) editorial(is) em src/:`;

if (ehPreview) {
  console.warn(`${cabecalho}\n${ocorrencias.join("\n")}`);
  console.warn(
    "\nPreview da Vercel: a build segue. Produção ficará bloqueada.",
  );
  process.exit(0);
}

console.error(`${cabecalho}\n${ocorrencias.join("\n")}`);
console.error(
  "\nBuild de produção bloqueada. Resolva as pendências (docs/fontes.md) antes de publicar.",
);
process.exit(1);
