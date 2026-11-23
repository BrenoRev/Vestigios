/*
 * Gera src/prototipo/mapa-base.json: os bairros e a água do Recife como
 * `path` SVG já projetados, com centro e caixa de cada bairro, a posição de cada prédio do mock e os
 * enquadramentos (ADR-021).
 *
 * Bases da Prefeitura do Recife (dados.recife.pe.gov.br, ODbL), fora do Git:
 * - "Limites dos Bairros 2023" (2 MB)
 *   https://dados.recife.pe.gov.br/dataset/ce23d3f4-7474-44d3-b310-19f3afcebf4a/resource/d5f956ce-7e1f-4c74-839b-06cb490c3721/download/limites-dos-bairros-2023.geojson
 * - "Recursos Hídricos", do conjunto Área urbana (25 MB)
 *   https://dados.recife.pe.gov.br/dataset/1702c764-ec7a-4ef0-9861-8acd0e40c819/resource/dc655db0-6b58-4334-8d72-1ef666de4b86/download/recursos-hidricos.geojson
 *
 * Uso: node scripts/gerar-mapa-prototipo.mjs caminho/bairros.geojson caminho/recursos-hidricos.geojson
 * O Node lê o .ts do mock direto, removendo os tipos, a partir do 22.18.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { geoMercator } from "d3-geo";
import { prediosMock } from "../src/prototipo/mapa-mock.ts";

const LADO = 1000;
const MARGEM = 24;
// Pontos mais próximos que isso (em unidades do viewBox) são descartados:
// leva as bases (27 MB) a ~95 KB gzip, ainda lisas no enquadramento do Centro.
const PASSO_MINIMO = 0.7;
// Abaixo de 2 ha (canais e riachos) a água some até no enquadramento do
// Centro; os 42 corpos maiores somam 99% da área.
const AREA_MINIMA_AGUA_M2 = 20_000;
const ENQUADRAMENTO_CENTRO = [
  "teatro-valdemar-de-oliveira",
  "igreja-sao-jose-do-ribamar",
  "cine-art-palacio",
  "cinema-sao-luiz",
  "edificio-jk",
];

const [origemBairros, origemAgua] = process.argv.slice(2);
if (!origemBairros || !origemAgua) {
  console.error("Informe os GeoJSON de bairros e de recursos hídricos.");
  process.exit(1);
}

const bairros = JSON.parse(readFileSync(origemBairros, "utf8"));
const agua = JSON.parse(readFileSync(origemAgua, "utf8"));

// Ajuste por pontos, não por polígonos: o fitExtent com polígonos depende do
// sentido dos anéis, que a Prefeitura não garante.
const todosOsPontos = bairros.features.flatMap((f) => aneis(f.geometry).flat());
const projecao = geoMercator().fitExtent(
  [
    [MARGEM, MARGEM],
    [LADO - MARGEM, LADO - MARGEM],
  ],
  { type: "MultiPoint", coordinates: todosOsPontos },
);

function aneis(geometria) {
  if (geometria.type === "Polygon") return geometria.coordinates;
  if (geometria.type === "MultiPolygon") return geometria.coordinates.flat();
  return [];
}

const arredonda = (n) => Math.round(n * 10) / 10;

function anelProjetado(anel) {
  const pontos = [];
  for (const coordenada of anel) {
    const [x, y] = projecao(coordenada);
    const ultimo = pontos.at(-1);
    if (ultimo && Math.hypot(x - ultimo[0], y - ultimo[1]) < PASSO_MINIMO)
      continue;
    pontos.push([x, y]);
  }
  return pontos;
}

function dentro([x, y], anel) {
  let resultado = false;
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
    const [xi, yi] = anel[i];
    const [xj, yj] = anel[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      resultado = !resultado;
  }
  return resultado;
}

// Comandos relativos encurtam o JSON em cerca de um terço; os deltas saem
// das coordenadas já arredondadas para o erro não se acumular.
function caminho(projetados) {
  return projetados
    .map((anel) => {
      const pontos = anel.map(([x, y]) => [arredonda(x), arredonda(y)]);
      const [inicio, ...resto] = pontos;
      const deltas = resto.map(([x, y], i) => {
        const [xa, ya] = pontos[i];
        return `${arredonda(x - xa)},${arredonda(y - ya)}`;
      });
      return `M${inicio[0]},${inicio[1]}l${deltas.join(" ")}Z`;
    })
    .join("");
}

const projetarAneis = (geometria) =>
  aneis(geometria)
    .map(anelProjetado)
    .filter((a) => a.length > 2);

function areaECentroide(anel) {
  let area = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
    const [xi, yi] = anel[i];
    const [xj, yj] = anel[j];
    const f = xj * yi - xi * yj;
    area += f;
    cx += (xi + xj) * f;
    cy += (yi + yj) * f;
  }
  return { area: Math.abs(area / 2), x: cx / (3 * area), y: cy / (3 * area) };
}

// O centro vem do maior anel, não do conjunto: bairros com ilhas ou
// pedaços soltos puxariam o símbolo proporcional para a água.
function centroDoBairro(projetados) {
  const [maior] = projetados
    .map(areaECentroide)
    .sort((a, b) => b.area - a.area);
  return { x: arredonda(maior.x), y: arredonda(maior.y) };
}

function caixa(projetados) {
  const xs = projetados.flat().map(([x]) => x);
  const ys = projetados.flat().map(([, y]) => y);
  return [
    Math.min(...xs),
    Math.min(...ys),
    Math.max(...xs),
    Math.max(...ys),
  ].map(arredonda);
}

const bairrosProjetados = bairros.features.map((f) => {
  const projetados = projetarAneis(f.geometry);
  return {
    nome: f.properties.EBAIRRNOMEOF,
    aneis: projetados,
    d: caminho(projetados),
    centro: centroDoBairro(projetados),
    caixa: caixa(projetados),
  };
});

const aguaProjetada = agua.features
  .filter(
    (f) =>
      f.geometry &&
      f.properties["DB2GSE.ST_Area(SHAPE)"] >= AREA_MINIMA_AGUA_M2,
  )
  .map((f) => caminho(projetarAneis(f.geometry)));

const pontos = {};
for (const predio of prediosMock) {
  const { latitude, longitude } = predio.coordenada;
  const [x, y] = projecao([longitude, latitude]);
  pontos[predio.id] = { x: arredonda(x), y: arredonda(y) };
  const bairro = bairrosProjetados.find((b) =>
    b.aneis.some((a) => dentro([x, y], a)),
  );
  if (bairro?.nome !== predio.bairro)
    console.warn(
      `${predio.id}: o ponto cai em "${bairro?.nome ?? "nenhum bairro"}", o mock diz "${predio.bairro}".`,
    );
}

function enquadramento(ids) {
  const xs = ids.map((id) => pontos[id].x);
  const ys = ids.map((id) => pontos[id].y);
  const folga = 0.35;
  const largura = Math.max(...xs) - Math.min(...xs);
  const altura = Math.max(...ys) - Math.min(...ys);
  const lado = Math.max(largura, altura) * (1 + 2 * folga);
  const escala = arredonda(LADO / lado);
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
  return {
    escala,
    x: arredonda(LADO / 2 - escala * cx),
    y: arredonda(LADO / 2 - escala * cy),
  };
}

const saida = {
  lado: LADO,
  bairros: bairrosProjetados.map(({ nome, d, centro, caixa }) => ({
    nome,
    d,
    centro,
    caixa,
  })),
  agua: aguaProjetada,
  pontos,
  enquadramentos: {
    recife: { escala: 1, x: 0, y: 0 },
    centro: enquadramento(ENQUADRAMENTO_CENTRO),
  },
};

const destino = new URL("../src/prototipo/mapa-base.json", import.meta.url);
writeFileSync(destino, JSON.stringify(saida));
console.log(
  `${saida.bairros.length} bairros, ${saida.agua.length} corpos d'água, ${Object.keys(pontos).length} prédios, ${(JSON.stringify(saida).length / 1024).toFixed(0)} KB.`,
);
