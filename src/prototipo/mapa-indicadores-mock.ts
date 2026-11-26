/*
 * DADOS FICTÍCIOS. NÃO PUBLICAR.
 *
 * Indicadores por bairro sorteados para testar o mapa, com a mesma regra de
 * mapa-mock.ts: só os nomes e as formas dos bairros são reais. Os números
 * saem de um sorteio com semente fixa (o mesmo a cada build), puxados para
 * o Centro só para o protótipo ter um padrão visível; não descrevem nada.
 */
import type {
  BaseMapa,
  IndicadorBairros,
  SerieIndicadores,
} from "../types/mapa";

const ANOS = [2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026];
const BAIRRO_DE_REFERENCIA = "Santo Antônio";

function semente(texto: string) {
  let h = 2166136261;
  for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

function sorteador(texto: string) {
  let a = semente(texto);
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gerarIndicadoresMock(base: BaseMapa): SerieIndicadores {
  const referencia = base.bairros.find((b) => b.nome === BAIRRO_DE_REFERENCIA)
    ?.centro ??
    base.bairros[0]?.centro ?? { x: 0, y: 0 };

  const semUso: Record<string, number[]> = {};
  const taxaSemUso: Record<string, number[]> = {};
  const protegidos: Record<string, number[]> = {};

  for (const bairro of base.bairros) {
    const sorteio = sorteador(bairro.nome);
    const distancia = Math.hypot(
      bairro.centro.x - referencia.x,
      bairro.centro.y - referencia.y,
    );
    const proximidade = Math.exp(-distancia / 160);
    const inicial = 15 + proximidade * 420 + sorteio() * 60;
    const crescimento = 0.01 + proximidade * 0.09 + (sorteio() - 0.4) * 0.03;
    const tombadosBase = Math.round(proximidade ** 1.5 * 180 + sorteio() * 6);

    semUso[bairro.nome] = ANOS.map((_, i) =>
      Math.max(0, Math.round(inicial * (1 + crescimento) ** i)),
    );
    const taxaInicial = 6 + proximidade * 55 + sorteio() * 14;
    taxaSemUso[bairro.nome] = ANOS.map(
      (_, i) => Math.round(taxaInicial * (1 + crescimento) ** i * 10) / 10,
    );
    protegidos[bairro.nome] = ANOS.map((_, i) =>
      Math.round(tombadosBase * (1 + 0.015 * i)),
    );
  }

  const indicadores: IndicadorBairros[] = [
    { id: "taxaSemUso", tipo: "taxa", valores: taxaSemUso },
    { id: "semUso", tipo: "contagem", valores: semUso },
    { id: "protegidos", tipo: "contagem", valores: protegidos },
  ];
  return { anos: ANOS, indicadores };
}
