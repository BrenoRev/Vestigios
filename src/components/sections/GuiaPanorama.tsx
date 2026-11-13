import type { ConteudoGuia } from "../../types/pagina-inicial";
import { CabecalhoCapitulo } from "../ui/CabecalhoCapitulo";
import { EspacoReservado } from "../ui/EspacoReservado";
import { Estatistica } from "../ui/Estatistica";
import { PendenciaApuracao } from "../ui/PendenciaApuracao";
import { Texto } from "../ui/Texto";

interface GuiaPanoramaProps {
  conteudo: ConteudoGuia["panorama"];
}

const LARGURAS_PROTEGIDOS = ["w-59", "w-50"];
const LARGURAS_FORA_DA_CONTA = ["w-76.5", "w-67.5"];

const TITULO =
  "font-work-sans text-22 leading-texto font-bold tracking-texto text-tinta-600 lg:text-25";
const TEXTO =
  "font-public-sans text-16 leading-texto font-normal tracking-texto text-tinta-600 md:text-18";

export function GuiaPanorama({ conteudo }: GuiaPanoramaProps) {
  const { protegidos, foraDaConta, custo } = conteudo;

  return (
    <>
      <CabecalhoCapitulo cabecalho={conteudo.cabecalho} />
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-6.5">
          <h4 className={TITULO}>{protegidos.titulo}</h4>
          <div className="flex flex-wrap gap-x-27 gap-y-5.5">
            {protegidos.estatisticas.map((dado, indice) => (
              <Estatistica
                key={indice}
                dado={dado}
                className={LARGURAS_PROTEGIDOS[indice]}
              />
            ))}
          </div>
          <p className={TEXTO}>
            <Texto valor={protegidos.observacao} />
          </p>
        </div>

        <div className="flex flex-col gap-6.5">
          <div>
            <h4 className={TITULO}>{foraDaConta.titulo}</h4>
            <p className={`max-w-153.75 ${TEXTO}`}>
              <Texto valor={foraDaConta.observacao} />
            </p>
          </div>
          <div className="flex flex-col gap-9">
            <div className="flex flex-wrap gap-x-9.75 gap-y-5.5">
              {foraDaConta.estatisticas.map((dado, indice) => (
                <Estatistica
                  key={indice}
                  dado={dado}
                  className={LARGURAS_FORA_DA_CONTA[indice]}
                />
              ))}
            </div>
            <PendenciaApuracao
              pendencia={foraDaConta.pendencia}
              className="w-full max-w-99.75"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6.5">
          <h4 className={TITULO}>{custo.titulo}</h4>
          <div className="flex flex-col gap-4.5 md:flex-row">
            <EspacoReservado
              pendencia={custo.imagem}
              className="h-76.75 w-full shrink-0 md:w-75.5 lg:h-82.75 lg:w-113.5"
            />
            <div className="flex flex-col gap-6.5 md:flex-1">
              <p className={TEXTO}>
                <Texto valor={custo.texto} />
              </p>
              <PendenciaApuracao
                pendencia={custo.pendencia}
                className="w-full max-w-63.5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
