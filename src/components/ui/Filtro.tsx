export type EstadoFiltro = "ativo" | "inativo";

interface FiltroProps {
  rotulo: string;
  estado: EstadoFiltro;
  onAlternar: () => void;
}

/**
 * Variantes Ativo e Inativo do Figma (`2:1068`). O ativo usa o marrom
 * `terra/900` da Navbar a pedido do responsável; o inativo segue o tema.
 */
export function Filtro({ rotulo, estado, onAlternar }: FiltroProps) {
  const ativo = estado === "ativo";

  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onAlternar}
      className={`min-h-11 cursor-pointer px-espaco-4 py-espaco-3 font-space-grotesk text-15 leading-mapa-corpo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque ${ativo ? "bg-terra-900 text-fundo" : "border border-borda bg-fundo text-texto"}`}
    >
      {rotulo}
    </button>
  );
}
