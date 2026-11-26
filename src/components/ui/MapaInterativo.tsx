import {
  CornersOutIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, m } from "motion/react";
import {
  memo,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import type { useVistaMapa } from "../../hooks/useVistaMapa";
import type { BairroBase, BaseMapa, SituacaoPredio } from "../../types/mapa";
import { MarcadorPredio } from "./MarcadorPredio";

export interface PontoMapa {
  id: string;
  situacao: SituacaoPredio;
  rotulo: string;
}

export interface CartaoMapa {
  /** Muda quando o cartão é de outro bairro ou prédio, para ele pular de novo. */
  chave: string;
  /** Ponto do mapa (unidades do viewBox da base) ao lado do qual o cartão abre. */
  ancora: { x: number; y: number };
  rotulo: string;
  conteudo: ReactNode;
}

interface MapaInterativoProps {
  base: BaseMapa;
  controle: ReturnType<typeof useVistaMapa>;
  /** Classe de preenchimento de cada bairro, pelo nome. */
  preenchimentos: Readonly<Record<string, string>>;
  /** Raio relativo (0 a 1) do círculo de cada bairro; null desliga a camada. */
  circulos: Readonly<Record<string, number>> | null;
  bairroSelecionado: string | null;
  bairroRealcado: string | null;
  onRealcar: (nome: string | null) => void;
  dica: (nome: string) => ReactNode;
  pontos: readonly PontoMapa[];
  predioSelecionado: string | null;
  onSelecionarPredio: (id: string) => void;
  cartao: CartaoMapa | null;
  onFecharCartao: () => void;
  rotulo: string;
  textos: {
    aproximar: string;
    afastar: string;
    inicio: string;
    dicaRolagem: string;
    fechar: string;
  };
  /** Painéis flutuantes (controles, legenda, ranking) sobre o mapa. */
  children?: ReactNode;
}

const TRANSICAO = { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] } as const;
const SEM_TRANSICAO = { duration: 0 } as const;
const POP = { type: "spring", stiffness: 420, damping: 30 } as const;
/** Raio, em px na tela, do maior círculo; a legenda usa o mesmo. */
export const RAIO_MAXIMO_PX = 30;
const LARGURA_CARTAO = 340;
const AFASTAMENTO_CARTAO = 28;
const MARGEM = 16;
// Abaixo do `md`, o cartão vira uma gaveta presa à base da tela.
const LARGURA_GAVETA = 768;

const CamadaBairros = memo(function CamadaBairros({
  bairros,
  preenchimentos,
}: {
  bairros: readonly BairroBase[];
  preenchimentos: Readonly<Record<string, string>>;
}) {
  return bairros.map((bairro) => (
    <path
      key={bairro.nome}
      d={bairro.d}
      data-bairro={bairro.nome}
      vectorEffect="non-scaling-stroke"
      className={`cursor-pointer stroke-borda ${preenchimentos[bairro.nome] ?? "fill-superficie"}`}
    />
  ));
});

const CamadaAgua = memo(function CamadaAgua({
  agua,
}: {
  agua: readonly string[];
}) {
  return agua.map((d, i) => (
    <path
      key={i}
      d={d}
      fillRule="evenodd"
      className="pointer-events-none fill-papel-200"
    />
  ));
});

/**
 * Mapa de tela cheia. Bairros, água e círculos ficam num grupo SVG que
 * escala com a vista; marcadores e o cartão ficam numa camada HTML que só se
 * desloca, para não crescerem com o zoom. Tudo muda por transform (ADR-012).
 */
export function MapaInterativo({
  base,
  controle,
  preenchimentos,
  circulos,
  bairroSelecionado,
  bairroRealcado,
  onRealcar,
  dica,
  pontos,
  predioSelecionado,
  onSelecionarPredio,
  cartao,
  onFecharCartao,
  rotulo,
  textos,
  children,
}: MapaInterativoProps) {
  const {
    vista,
    tamanho,
    escala,
    noMapa,
    pontoLocal,
    emGesto,
    dicaRolagem,
    elemento,
    zoomEm,
    reiniciar,
    eventos,
  } = controle;
  const transicao = emGesto ? SEM_TRANSICAO : TRANSICAO;
  // Sem cursor no mapa (realce vindo do ranking), a dica não tem onde ficar.
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const refCartao = useRef<HTMLDivElement>(null);
  const [alturaCartao, setAlturaCartao] = useState(0);
  const gaveta = tamanho.w < LARGURA_GAVETA;

  useEffect(() => {
    const no = refCartao.current;
    if (!no) return;
    const observador = new ResizeObserver(([entrada]) => {
      if (entrada) setAlturaCartao(entrada.contentRect.height);
    });
    observador.observe(no);
    return () => {
      observador.disconnect();
    };
  }, [cartao?.chave]);

  function aoMover(evento: PointerEvent<HTMLDivElement>) {
    eventos.onPointerMove(evento);
    if (evento.pointerType !== "mouse") return;
    const alvo = evento.target as Element;
    if (alvo.closest("[data-sobreposicao]")) {
      setCursor(null);
      if (bairroRealcado && !alvo.closest("[data-ranking]")) onRealcar(null);
      return;
    }
    setCursor(pontoLocal(evento.clientX, evento.clientY));
    const nome =
      alvo.closest("[data-bairro]")?.getAttribute("data-bairro") ?? null;
    if (nome !== bairroRealcado) onRealcar(nome);
  }

  const contornos = [bairroRealcado, bairroSelecionado]
    .filter(
      (nome, i, lista): nome is string => !!nome && lista.indexOf(nome) === i,
    )
    .map((nome) => base.bairros.find((b) => b.nome === nome))
    .filter((b) => b !== undefined);

  const circulosOrdenados = circulos
    ? base.bairros
        .map((b) => ({ bairro: b, raio: circulos[b.nome] ?? 0 }))
        .filter((c) => c.raio > 0)
        .sort((a, b) => b.raio - a.raio)
    : [];

  let posicaoCartao = { x: 0, y: 0, origem: "0% 50%" };
  if (cartao && !gaveta) {
    const ancora = noMapa(cartao.ancora.x, cartao.ancora.y);
    const cabeDireita =
      ancora.x + AFASTAMENTO_CARTAO + LARGURA_CARTAO + MARGEM <= tamanho.w;
    const x = cabeDireita
      ? ancora.x + AFASTAMENTO_CARTAO
      : ancora.x - AFASTAMENTO_CARTAO - LARGURA_CARTAO;
    const y = ancora.y - alturaCartao / 2;
    posicaoCartao = {
      x: Math.min(tamanho.w - LARGURA_CARTAO - MARGEM, Math.max(MARGEM, x)),
      y: Math.min(tamanho.h - alturaCartao - MARGEM, Math.max(MARGEM, y)),
      origem: cabeDireita ? "0% 50%" : "100% 50%",
    };
  }

  const botaoZoom =
    "flex size-11 cursor-pointer items-center justify-center border border-borda bg-superficie text-texto shadow-cartao focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

  return (
    <div
      ref={elemento}
      role="group"
      aria-label={rotulo}
      {...eventos}
      onPointerMove={aoMover}
      onPointerLeave={() => {
        setCursor(null);
        onRealcar(null);
      }}
      className={`relative size-full cursor-grab overflow-hidden bg-fundo select-none active:cursor-grabbing ${vista.k > 1 ? "touch-none" : "touch-pan-y"}`}
    >
      {tamanho.w > 0 && (
        <svg
          aria-hidden
          viewBox={`0 0 ${String(tamanho.w)} ${String(tamanho.h)}`}
          className="absolute inset-0 size-full"
        >
          <m.g
            initial={false}
            animate={{ x: vista.x, y: vista.y, scale: escala }}
            transition={transicao}
            style={{ transformBox: "view-box", originX: 0, originY: 0 }}
          >
            <CamadaBairros
              bairros={base.bairros}
              preenchimentos={preenchimentos}
            />
            <CamadaAgua agua={base.agua} />
            {circulosOrdenados.map(({ bairro, raio }) => (
              <g
                key={bairro.nome}
                transform={`translate(${String(bairro.centro.x)} ${String(bairro.centro.y)})`}
                className="pointer-events-none"
              >
                <m.circle
                  r={RAIO_MAXIMO_PX}
                  initial={false}
                  animate={{ scale: escala > 0 ? raio / escala : 0 }}
                  transition={transicao}
                  vectorEffect="non-scaling-stroke"
                  className="fill-dado-abandonado stroke-terra-900 opacity-80"
                />
              </g>
            ))}
            {/* Contorno com halo branco: a classe mais escura da rampa é quase
                a cor do traço, e sem o halo a seleção some nela. */}
            {contornos.map((bairro) => {
              const selecionado = bairro.nome === bairroSelecionado;
              return (
                <g key={bairro.nome} className="pointer-events-none fill-none">
                  <path
                    d={bairro.d}
                    vectorEffect="non-scaling-stroke"
                    className={`stroke-branco ${selecionado ? "stroke-6" : "stroke-4"}`}
                  />
                  <path
                    d={bairro.d}
                    vectorEffect="non-scaling-stroke"
                    className={`stroke-noite-900 ${selecionado ? "stroke-3" : "stroke-2"}`}
                  />
                </g>
              );
            })}
          </m.g>
        </svg>
      )}

      {pontos.map((ponto) => {
        const posicao = base.pontos[ponto.id];
        if (!posicao) return null;
        const { x, y } = noMapa(posicao.x, posicao.y);
        const visivel = x >= 0 && x <= tamanho.w && y >= 0 && y <= tamanho.h;
        return (
          <m.div
            key={ponto.id}
            inert={!visivel}
            initial={false}
            animate={{ x, y }}
            transition={transicao}
            className={`absolute top-0 left-0 ${visivel ? "" : "invisible"}`}
          >
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <MarcadorPredio
                situacao={ponto.situacao}
                estado={
                  ponto.id === predioSelecionado ? "selecionado" : "padrao"
                }
                rotulo={ponto.rotulo}
                onSelecionar={() => {
                  onSelecionarPredio(ponto.id);
                }}
              />
            </div>
          </m.div>
        );
      })}

      {bairroRealcado && cursor && !emGesto && (
        <div
          aria-hidden
          style={{
            transform: `translate(${String(cursor.x + 16)}px, ${String(cursor.y + 16)}px)`,
          }}
          className="pointer-events-none absolute top-0 left-0 z-20 max-w-60 bg-superficie p-espaco-3 font-space-grotesk text-14 leading-apuracao text-texto shadow-cartao"
        >
          {dica(bairroRealcado)}
        </div>
      )}

      {children}

      <div
        data-sobreposicao
        className="absolute right-espaco-3 bottom-espaco-3 z-10 flex flex-col"
      >
        <button
          type="button"
          aria-label={textos.aproximar}
          title={textos.aproximar}
          onClick={() => {
            zoomEm(1.6);
          }}
          className={botaoZoom}
        >
          <PlusIcon aria-hidden size={20} />
        </button>
        <button
          type="button"
          aria-label={textos.afastar}
          title={textos.afastar}
          disabled={vista.k <= 1}
          onClick={() => {
            zoomEm(1 / 1.6);
          }}
          className={`${botaoZoom} border-t-0 disabled:cursor-default disabled:text-texto-suave`}
        >
          <MinusIcon aria-hidden size={20} />
        </button>
        <button
          type="button"
          aria-label={textos.inicio}
          title={textos.inicio}
          onClick={reiniciar}
          className={`${botaoZoom} mt-espaco-2`}
        >
          <CornersOutIcon aria-hidden size={20} />
        </button>
      </div>

      <AnimatePresence>
        {cartao && (
          <m.div
            key={cartao.chave}
            ref={refCartao}
            data-sobreposicao
            role="dialog"
            aria-label={cartao.rotulo}
            initial={
              gaveta
                ? { opacity: 0, y: 48 }
                : {
                    opacity: 0,
                    scale: 0.85,
                    x: posicaoCartao.x,
                    y: posicaoCartao.y,
                  }
            }
            animate={
              gaveta
                ? { opacity: 1, y: 0 }
                : {
                    opacity: 1,
                    scale: 1,
                    x: posicaoCartao.x,
                    y: posicaoCartao.y,
                  }
            }
            exit={gaveta ? { opacity: 0, y: 48 } : { opacity: 0, scale: 0.92 }}
            transition={{
              ...POP,
              x: transicao,
              y: gaveta ? POP : transicao,
            }}
            style={
              gaveta ? undefined : { transformOrigin: posicaoCartao.origem }
            }
            className={`absolute z-30 overflow-y-auto bg-superficie shadow-cartao ${gaveta ? "inset-x-espaco-2 bottom-espaco-2 max-h-3/5" : "top-0 left-0 max-h-4/5 w-85"}`}
          >
            <button
              type="button"
              aria-label={textos.fechar}
              title={textos.fechar}
              onClick={onFecharCartao}
              className="absolute top-espaco-2 right-espaco-2 z-10 flex size-11 cursor-pointer items-center justify-center text-texto focus-visible:outline-2 focus-visible:outline-destaque"
            >
              <XIcon aria-hidden size={20} />
            </button>
            {cartao.conteudo}
          </m.div>
        )}
      </AnimatePresence>

      {dicaRolagem && (
        <m.p
          role="status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute bottom-espaco-6 left-1/2 z-40 -translate-x-1/2 bg-noite-900 px-espaco-4 py-espaco-2 font-space-grotesk text-15 leading-mapa-corpo text-noite-100 shadow-cartao"
        >
          {textos.dicaRolagem}
        </m.p>
      )}
    </div>
  );
}
