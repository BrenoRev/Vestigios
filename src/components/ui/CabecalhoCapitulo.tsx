import type { Cabecalho } from "../../types/pagina-inicial";
import { Texto } from "./Texto";

interface CabecalhoCapituloProps {
  cabecalho: Cabecalho;
  leve?: boolean;
}

export function CabecalhoCapitulo({
  cabecalho,
  leve = false,
}: CabecalhoCapituloProps) {
  const peso = leve ? "font-normal" : "font-medium";

  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="font-newsreader text-32 leading-subtitulo font-medium tracking-titulo text-ruina-900 md:text-36 lg:text-40">
        <Texto valor={cabecalho.titulo} />
      </h3>
      <div
        className={`flex max-w-174.75 flex-col gap-6.5 font-public-sans text-16 leading-texto tracking-texto text-tinta-600 md:text-18 ${peso}`}
      >
        {cabecalho.paragrafos.map((paragrafo, indice) => (
          <p key={indice}>
            <Texto valor={paragrafo} />
          </p>
        ))}
      </div>
    </div>
  );
}
