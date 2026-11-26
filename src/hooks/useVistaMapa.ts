import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";

/** Ponto na tela (px) = ponto do mapa × escala-base × k + (x, y). */
export interface Vista {
  k: number;
  x: number;
  y: number;
}

interface Opcoes {
  lado: number;
  kMaximo: number;
  /** Recebe o elemento sob o dedo ou o cursor quando o gesto foi um toque. */
  onToque: (alvo: Element | null) => void;
}

// Acima disso o gesto conta como arrasto, e o toque não seleciona bairro.
const LIMIAR_ARRASTO_PX = 5;
const DURACAO_DICA_MS = 1800;
// Folga entre o Recife inteiro e a borda da tela.
const OCUPACAO_INICIAL = 0.94;

/**
 * Zoom e arrasto do mapa em tela cheia, sem biblioteca (ADR-021). Tudo em
 * pixels da tela: a escala-base encaixa o quadro do mapa no menor lado do
 * contêiner, e `k` multiplica sobre ela.
 *
 * A roda sozinha rola a página: só aproxima com Ctrl ou ⌘ (a pinça do
 * trackpad chega assim), para o mapa de tela cheia não prender o scroll.
 * No toque, um dedo rola a página com o mapa inteiro; aproximado, move o
 * mapa. Dois dedos sempre aproximam.
 */
export function useVistaMapa({ lado, kMaximo, onToque }: Opcoes) {
  const [tamanho, setTamanho] = useState({ w: 0, h: 0 });
  const [vistaBruta, setVista] = useState<Vista>({ k: 1, x: 0, y: 0 });
  const [emGesto, setEmGesto] = useState(false);
  const [dicaRolagem, setDicaRolagem] = useState(false);
  const elemento = useRef<HTMLDivElement>(null);
  const ponteiros = useRef(new Map<number, { x: number; y: number }>());
  const gesto = useRef({ moveu: false, alvo: null as Element | null });
  const temporizadorDica = useRef<number | undefined>(undefined);

  const escalaBase =
    (Math.min(tamanho.w, tamanho.h) / lado) * OCUPACAO_INICIAL || 0;

  const limitar = useCallback(
    (v: Vista): Vista => {
      const k = Math.min(kMaximo, Math.max(1, v.k));
      const medida = lado * escalaBase * k;
      const eixo = (posicao: number, dimensao: number) =>
        medida <= dimensao
          ? (dimensao - medida) / 2
          : Math.min(0, Math.max(dimensao - medida, posicao));
      return { k, x: eixo(v.x, tamanho.w), y: eixo(v.y, tamanho.h) };
    },
    [escalaBase, kMaximo, lado, tamanho],
  );

  const aplicar = useCallback(
    (calcular: (atual: Vista) => Vista) => {
      setVista((atual) => limitar(calcular(limitar(atual))));
    },
    [limitar],
  );

  useEffect(() => {
    const no = elemento.current;
    if (!no) return;
    const observador = new ResizeObserver(([entrada]) => {
      if (entrada)
        setTamanho({
          w: entrada.contentRect.width,
          h: entrada.contentRect.height,
        });
    });
    observador.observe(no);
    return () => {
      observador.disconnect();
    };
  }, []);

  // Limitada a cada render: quando o contêiner muda de tamanho (rotação,
  // redimensionar), a vista se recentra sem um efeito extra.
  const vista = useMemo(() => limitar(vistaBruta), [limitar, vistaBruta]);

  const noMapa = useCallback(
    (px: number, py: number) => ({
      x: px * escalaBase * vista.k + vista.x,
      y: py * escalaBase * vista.k + vista.y,
    }),
    [escalaBase, vista],
  );

  const pontoLocal = useCallback((clientX: number, clientY: number) => {
    const caixa = elemento.current?.getBoundingClientRect();
    return caixa
      ? { x: clientX - caixa.left, y: clientY - caixa.top }
      : { x: 0, y: 0 };
  }, []);

  const zoomEm = useCallback(
    (fator: number, px?: number, py?: number) => {
      const cx = px ?? tamanho.w / 2;
      const cy = py ?? tamanho.h / 2;
      aplicar((atual) => {
        const k = Math.min(kMaximo, Math.max(1, atual.k * fator));
        const razao = k / atual.k;
        return {
          k,
          x: cx - (cx - atual.x) * razao,
          y: cy - (cy - atual.y) * razao,
        };
      });
    },
    [aplicar, kMaximo, tamanho],
  );

  const enquadrar = useCallback(
    (caixa: readonly number[], ocupacao = 0.5, kLimite = kMaximo) => {
      const [x0 = 0, y0 = 0, x1 = lado, y1 = lado] = caixa;
      if (escalaBase === 0) return;
      const k = Math.min(
        kLimite,
        Math.max(
          1,
          (Math.min(tamanho.w, tamanho.h) * ocupacao) /
            (Math.max(x1 - x0, y1 - y0, 1) * escalaBase),
        ),
      );
      const s = escalaBase * k;
      aplicar(() => ({
        k,
        x: tamanho.w / 2 - s * ((x0 + x1) / 2),
        y: tamanho.h / 2 - s * ((y0 + y1) / 2),
      }));
    },
    [aplicar, escalaBase, kMaximo, lado, tamanho],
  );

  const reiniciar = useCallback(() => {
    aplicar(() => ({ k: 1, x: 0, y: 0 }));
  }, [aplicar]);

  useEffect(() => {
    const no = elemento.current;
    if (!no) return;
    function aoRolar(evento: WheelEvent) {
      if (!evento.ctrlKey && !evento.metaKey) {
        setDicaRolagem(true);
        window.clearTimeout(temporizadorDica.current);
        temporizadorDica.current = window.setTimeout(() => {
          setDicaRolagem(false);
        }, DURACAO_DICA_MS);
        return;
      }
      evento.preventDefault();
      const { x, y } = pontoLocal(evento.clientX, evento.clientY);
      zoomEm(Math.exp(-evento.deltaY * 0.01), x, y);
    }
    no.addEventListener("wheel", aoRolar, { passive: false });
    return () => {
      no.removeEventListener("wheel", aoRolar);
      window.clearTimeout(temporizadorDica.current);
    };
  }, [pontoLocal, zoomEm]);

  function aoPressionar(evento: PointerEvent<HTMLDivElement>) {
    if (evento.pointerType === "mouse" && evento.button !== 0) return;
    const alvo = evento.target as Element;
    // Controles flutuantes ficam dentro do contêiner, mas não arrastam o mapa.
    if (alvo.closest("button, input, select, a, [data-sobreposicao]")) return;
    if (ponteiros.current.size === 0) gesto.current = { moveu: false, alvo };
    ponteiros.current.set(evento.pointerId, {
      x: evento.clientX,
      y: evento.clientY,
    });
    evento.currentTarget.setPointerCapture(evento.pointerId);
  }

  function aoMover(evento: PointerEvent<HTMLDivElement>) {
    const anterior = ponteiros.current.get(evento.pointerId);
    if (!anterior) return;
    const atual = { x: evento.clientX, y: evento.clientY };
    const [outro] = [...ponteiros.current.entries()].filter(
      ([id]) => id !== evento.pointerId,
    );

    if (outro) {
      const [, p] = outro;
      const antes = Math.hypot(anterior.x - p.x, anterior.y - p.y);
      const depois = Math.hypot(atual.x - p.x, atual.y - p.y);
      const meio = pontoLocal((atual.x + p.x) / 2, (atual.y + p.y) / 2);
      if (antes > 0) zoomEm(depois / antes, meio.x, meio.y);
      gesto.current.moveu = true;
      setEmGesto(true);
    } else {
      const dx = atual.x - anterior.x;
      const dy = atual.y - anterior.y;
      if (!gesto.current.moveu && Math.hypot(dx, dy) < LIMIAR_ARRASTO_PX)
        return;
      gesto.current.moveu = true;
      const toqueComMapaInteiro =
        evento.pointerType === "touch" && vista.k === 1;
      if (!toqueComMapaInteiro) {
        setEmGesto(true);
        aplicar((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
      }
    }
    ponteiros.current.set(evento.pointerId, atual);
  }

  function aoSoltar(evento: PointerEvent<HTMLDivElement>) {
    if (!ponteiros.current.delete(evento.pointerId)) return;
    if (ponteiros.current.size > 0) return;
    setEmGesto(false);
    if (!gesto.current.moveu && evento.type === "pointerup")
      onToque(gesto.current.alvo);
  }

  return {
    vista,
    tamanho,
    escala: escalaBase * vista.k,
    noMapa,
    pontoLocal,
    emGesto,
    dicaRolagem,
    elemento,
    zoomEm,
    enquadrar,
    reiniciar,
    eventos: {
      onPointerDown: aoPressionar,
      onPointerMove: aoMover,
      onPointerUp: aoSoltar,
      onPointerCancel: aoSoltar,
    },
  };
}
