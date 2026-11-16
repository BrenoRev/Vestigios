import { m } from "motion/react";
import type {
  BaseMapa,
  NomeEnquadramento,
  SituacaoPredio,
} from "../../types/mapa";
import { MarcadorPredio } from "./MarcadorPredio";

export interface PontoMapa {
  id: string;
  situacao: SituacaoPredio;
  rotulo: string;
}

interface MapaPrediosProps {
  base: BaseMapa;
  enquadramento: NomeEnquadramento;
  pontos: readonly PontoMapa[];
  selecionadoId: string | null;
  onSelecionar: (id: string) => void;
  rotulo: string;
  aviso: string;
}

export function estaNoQuadro(
  base: BaseMapa,
  nome: NomeEnquadramento,
  id: string,
) {
  const ponto = base.pontos[id];
  if (!ponto) return false;
  const { escala, x, y } = base.enquadramentos[nome];
  const px = ponto.x * escala + x;
  const py = ponto.y * escala + y;
  return px >= 0 && px <= base.lado && py >= 0 && py <= base.lado;
}

const TRANSICAO = { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } as const;

/**
 * Bairros e marcadores ficam em camadas separadas: o SVG escala com o
 * enquadramento e os marcadores só se deslocam, para manter o tamanho.
 * As duas camadas mudam só por transform (ADR-012); a curva repete o token
 * ease-out-cubic, que o Motion não lê do CSS.
 */
export function MapaPredios({
  base,
  enquadramento,
  pontos,
  selecionadoId,
  onSelecionar,
  rotulo,
  aviso,
}: MapaPrediosProps) {
  const { escala, x, y } = base.enquadramentos[enquadramento];
  const { lado } = base;

  return (
    <div
      role="group"
      aria-label={rotulo}
      className="relative aspect-square w-full overflow-hidden rounded-raio-3 border border-borda bg-fundo"
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${String(lado)} ${String(lado)}`}
        className="absolute inset-0 size-full"
      >
        <m.g
          initial={false}
          animate={{ x, y, scale: escala }}
          transition={TRANSICAO}
          style={{ transformBox: "view-box", originX: 0, originY: 0 }}
        >
          {base.bairros.map((bairro) => (
            <path
              key={bairro.nome}
              d={bairro.d}
              vectorEffect="non-scaling-stroke"
              className="fill-superficie stroke-borda"
            />
          ))}
          {base.agua.map((d, i) => (
            <path key={i} d={d} fillRule="evenodd" className="fill-papel-200" />
          ))}
        </m.g>
      </svg>

      {pontos.map((ponto) => {
        const posicao = base.pontos[ponto.id];
        if (!posicao) return null;
        const px = posicao.x * escala + x;
        const py = posicao.y * escala + y;
        const noQuadro = estaNoQuadro(base, enquadramento, ponto.id);
        return (
          <m.div
            key={ponto.id}
            inert={!noQuadro}
            initial={false}
            animate={{
              x: `${String((px / lado) * 100)}%`,
              y: `${String((py / lado) * 100)}%`,
            }}
            transition={TRANSICAO}
            className={`pointer-events-none absolute inset-0 ${noQuadro ? "" : "invisible"}`}
          >
            <div className="pointer-events-auto absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <MarcadorPredio
                situacao={ponto.situacao}
                estado={ponto.id === selecionadoId ? "selecionado" : "padrao"}
                rotulo={ponto.rotulo}
                onSelecionar={() => {
                  onSelecionar(ponto.id);
                }}
              />
            </div>
          </m.div>
        );
      })}

      <p className="pointer-events-none absolute top-espaco-5 left-espaco-5 bg-destaque px-espaco-2 py-espaco-1 font-ibm-plex-mono text-12 leading-apuracao text-sobre-destaque">
        {aviso}
      </p>
    </div>
  );
}
