import type { SituacaoPredio } from "../../types/mapa";

export type EstadoMarcador = "padrao" | "selecionado";

interface MarcadorPredioProps {
  situacao: SituacaoPredio;
  estado: EstadoMarcador;
  rotulo: string;
  onSelecionar: () => void;
}

export const COR_SITUACAO: Record<SituacaoPredio, string> = {
  abandonado: "bg-dado-abandonado",
  reversao: "bg-dado-reversao",
  a_confirmar: "bg-dado-a-confirmar",
};

/**
 * Variantes Padrão e Selecionado do Figma (`2:1084`). A troca é instantânea,
 * como a do Menu: o Figma não anima o marcador. A área de toque tem os 44 px
 * do Fundamentos.
 */
export function MarcadorPredio({
  situacao,
  estado,
  rotulo,
  onSelecionar,
}: MarcadorPredioProps) {
  const cor = COR_SITUACAO[situacao];

  return (
    <button
      type="button"
      aria-label={rotulo}
      aria-pressed={estado === "selecionado"}
      onClick={onSelecionar}
      className="flex size-11 cursor-pointer items-center justify-center rounded-raio-cheio focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
    >
      {estado === "selecionado" ? (
        <span
          aria-hidden
          className={`relative size-10 rounded-raio-cheio ${cor}`}
        >
          <span className="absolute inset-1.75 rounded-raio-cheio border-3 border-branco" />
        </span>
      ) : (
        <span
          aria-hidden
          className={`size-4.5 rounded-raio-cheio border-2 border-noite-900 ${cor}`}
        />
      )}
    </button>
  );
}
