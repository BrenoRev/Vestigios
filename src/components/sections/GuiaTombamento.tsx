import type { ConteudoGuia } from "../../types/pagina-inicial";
import { CabecalhoCapitulo } from "../ui/CabecalhoCapitulo";
import { EspacoReservado } from "../ui/EspacoReservado";
import { EtapaTombamento } from "../ui/EtapaTombamento";
import { Texto } from "../ui/Texto";

interface GuiaTombamentoProps {
  conteudo: ConteudoGuia["tombamento"];
}

const POSICAO_DAS_ETAPAS = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-1 lg:row-start-3",
  "lg:col-start-2 lg:row-start-4",
];

export function GuiaTombamento({ conteudo }: GuiaTombamentoProps) {
  const { mudancas, funcionamento, destaque } = conteudo;

  return (
    <div className="flex flex-col gap-10">
      <CabecalhoCapitulo cabecalho={conteudo.cabecalho} />

      <h4 className="font-work-sans text-18 leading-texto font-medium tracking-texto text-tinta-600 md:text-25">
        <Texto valor={mudancas.titulo} />
      </h4>
      <ul className="grid gap-y-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
        {mudancas.efeitos.map((efeito, indice) => (
          <li key={indice} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 md:gap-4">
              <EspacoReservado
                pendencia={efeito.icone}
                className="size-7.5 shrink-0"
              />
              <h5 className="font-ibm-plex-mono text-18 leading-none font-semibold tracking-texto text-ferrugem-600 md:text-22">
                <Texto valor={efeito.titulo} />
              </h5>
            </div>
            <p className="pl-9.5 font-public-sans text-16 leading-normal font-medium tracking-texto text-tinta-600 md:pl-11.5">
              <Texto valor={efeito.texto} />
            </p>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3">
        <h4 className="font-work-sans text-18 leading-texto font-medium tracking-texto text-tinta-600 md:text-25">
          <Texto valor={funcionamento.titulo} />
        </h4>
        <p className="max-w-174.75 font-public-sans text-16 leading-texto font-normal tracking-texto text-tinta-600 md:text-18">
          <Texto valor={funcionamento.introducao} />
        </p>
      </div>
      <ol className="grid gap-4.5 p-2.5 lg:grid-cols-2 lg:gap-2.5">
        {funcionamento.etapas.map((etapa, indice) => (
          <EtapaTombamento
            key={indice}
            numero={indice + 1}
            etapa={etapa}
            className={POSICAO_DAS_ETAPAS[indice]}
          />
        ))}
      </ol>

      <div className="flex w-full flex-col items-center gap-3 self-center rounded-raio-16 bg-branco/80 px-8 py-5.5 text-center shadow-cartao lg:max-w-168.25">
        <EspacoReservado pendencia={destaque.icone} className="size-7.5" />
        <h4 className="font-ibm-plex-mono text-16 leading-none font-semibold tracking-texto text-ferrugem-600 lg:text-18">
          <Texto valor={destaque.titulo} />
        </h4>
        <p className="font-public-sans text-16 leading-normal font-medium tracking-texto text-tinta-600">
          <Texto valor={destaque.texto} />
        </p>
      </div>
    </div>
  );
}
