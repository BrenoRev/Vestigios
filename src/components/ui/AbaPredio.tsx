import type { KeyboardEvent } from "react";

export type EstadoAba = "ativa" | "inativa";

interface AbaPredioProps {
  id: string;
  painelId: string;
  numero: string;
  rotulo: string;
  estado: EstadoAba;
  /** Recebe o foco do Tab quando nenhuma aba está ativa. */
  focavel: boolean;
  onAtivar: () => void;
  onTeclado: (evento: KeyboardEvent<HTMLButtonElement>) => void;
}

/** Variantes do Figma (`2:1075`); a ativa usa o marrom `terra/900` da Navbar a pedido do responsável. */
export function AbaPredio({
  id,
  painelId,
  numero,
  rotulo,
  estado,
  focavel,
  onAtivar,
  onTeclado,
}: AbaPredioProps) {
  const ativa = estado === "ativa";

  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={ativa}
      aria-controls={painelId}
      tabIndex={ativa || focavel ? 0 : -1}
      onClick={onAtivar}
      onKeyDown={onTeclado}
      className={`flex cursor-pointer flex-col items-start gap-0.5 px-espaco-4 py-espaco-2 text-left font-public-sans focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque ${ativa ? "bg-terra-900 text-branco" : "bg-papel-200 text-tinta-900"}`}
    >
      <span className="text-12 leading-apuracao font-bold tracking-rotulo uppercase">
        {numero}
      </span>
      <span className="text-15 leading-mapa-corpo">{rotulo}</span>
    </button>
  );
}
