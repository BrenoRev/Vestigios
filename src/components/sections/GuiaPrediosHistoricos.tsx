import type { ConteudoGuia } from "../../types/pagina-inicial";
import { CabecalhoCapitulo } from "../ui/CabecalhoCapitulo";
import { EspacoReservado } from "../ui/EspacoReservado";
import { Texto } from "../ui/Texto";

interface GuiaPrediosHistoricosProps {
  conteudo: ConteudoGuia["prediosHistoricos"];
}

export function GuiaPrediosHistoricos({
  conteudo,
}: GuiaPrediosHistoricosProps) {
  return (
    <>
      <CabecalhoCapitulo cabecalho={conteudo.cabecalho} leve />
      <div className="flex gap-9">
        <EspacoReservado
          pendencia={conteudo.imagem}
          className="hidden min-h-83 w-57.75 shrink-0 md:block"
        />
        <ul className="flex flex-1 flex-col gap-4">
          {conteudo.conceitos.map((conceito, indice) => (
            <li key={indice} className="flex flex-col md:px-5.75">
              <h4 className="font-ibm-plex-mono text-18 leading-none font-semibold tracking-texto text-ferrugem-600 md:flex md:min-h-11 md:items-center md:text-22">
                <Texto valor={conceito.titulo} />
              </h4>
              <p className="font-public-sans text-16 leading-normal font-normal tracking-texto text-tinta-600 md:text-18">
                <Texto valor={conceito.texto} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
