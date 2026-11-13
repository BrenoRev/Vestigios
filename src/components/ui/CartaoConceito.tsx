import type { Pendente } from "../../types/content";
import type { Conceito } from "../../types/pagina-inicial";
import { EspacoReservado } from "./EspacoReservado";
import { Texto } from "./Texto";

interface CartaoConceitoProps {
  conceito: Conceito;
  icone: Pendente;
}

export function CartaoConceito({ conceito, icone }: CartaoConceitoProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-raio-16 bg-ferrugem-600 px-8 py-5 text-pagina shadow-cartao md:w-66 md:p-8 lg:w-100">
      <div className="flex items-center gap-4">
        <EspacoReservado pendencia={icone} className="size-7.5 shrink-0" />
        <h4 className="font-ibm-plex-mono text-18 leading-none font-semibold tracking-texto md:text-22">
          <Texto valor={conceito.titulo} />
        </h4>
      </div>
      <p className="font-public-sans text-16 leading-normal font-medium tracking-texto md:text-18">
        <Texto valor={conceito.texto} />
      </p>
    </div>
  );
}
