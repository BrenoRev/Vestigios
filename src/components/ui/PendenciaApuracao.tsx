import type { Pendente } from "../../types/content";

interface PendenciaApuracaoProps {
  pendencia: Pendente;
  className?: string;
}

export function PendenciaApuracao({
  pendencia,
  className = "",
}: PendenciaApuracaoProps) {
  return (
    <p
      data-pendente
      className={`bg-papel-100 px-2 py-1 font-ibm-plex-mono text-14 leading-apuracao whitespace-pre-line text-ferrugem-700 ${className}`}
    >
      {pendencia.descricao}
    </p>
  );
}
