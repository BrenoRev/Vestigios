import type { Pendente } from "../../types/content";

interface EspacoReservadoProps {
  pendencia: Pendente;
  className?: string;
}

export function EspacoReservado({
  pendencia,
  className = "",
}: EspacoReservadoProps) {
  return (
    <div
      aria-hidden
      title={pendencia.descricao}
      data-pendente
      className={`espaco-reservado ${className}`}
    />
  );
}
