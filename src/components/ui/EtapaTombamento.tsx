import type { Etapa } from "../../types/pagina-inicial";
import { Texto } from "./Texto";

interface EtapaTombamentoProps {
  numero: number;
  etapa: Etapa;
  className?: string;
}

export function EtapaTombamento({
  numero,
  etapa,
  className = "",
}: EtapaTombamentoProps) {
  return (
    <li className={`flex min-h-39.5 flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="flex size-8.75 shrink-0 items-center justify-center rounded-full bg-ferrugem-600 font-ibm-plex-mono text-18 font-semibold text-pagina drop-shadow-etapa md:size-10 md:text-22">
          {numero}
        </span>
        <h5 className="font-ibm-plex-mono text-18 leading-none font-semibold tracking-texto text-ferrugem-600 md:text-22">
          {etapa.titulo}
        </h5>
      </div>
      <div className="flex flex-col gap-4 pl-11.75 font-public-sans text-16 leading-normal font-normal tracking-texto text-tinta-600 md:pl-13 md:text-18">
        {etapa.paragrafos.map((paragrafo, indice) => (
          <p key={indice}>
            <Texto valor={paragrafo} />
          </p>
        ))}
      </div>
    </li>
  );
}
