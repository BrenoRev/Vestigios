import type { Estatistica as EstatisticaConteudo } from "../../types/pagina-inicial";
import { Texto } from "./Texto";

interface EstatisticaProps {
  dado: EstatisticaConteudo;
  tamanhoNumero?: string;
  className?: string;
}

export function Estatistica({
  dado,
  tamanhoNumero = "text-44",
  className = "",
}: EstatisticaProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p className="flex items-end gap-1.5 font-ibm-plex-mono leading-none font-semibold tracking-texto text-ferrugem-600">
        <span className={`underline decoration-from-font ${tamanhoNumero}`}>
          <Texto valor={dado.numero} />
        </span>
        {dado.unidade ? (
          <span className="text-28 lg:text-36">{dado.unidade}</span>
        ) : null}
      </p>
      <p className="font-public-sans text-16 leading-texto tracking-texto text-tinta-600 md:text-18">
        <Texto valor={dado.legenda} />
      </p>
    </div>
  );
}
