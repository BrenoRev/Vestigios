import type { ConteudoGuia } from "../../types/pagina-inicial";
import { CabecalhoCapitulo } from "../ui/CabecalhoCapitulo";
import { Estatistica } from "../ui/Estatistica";
import { PendenciaApuracao } from "../ui/PendenciaApuracao";

interface GuiaDuracaoProps {
  conteudo: ConteudoGuia["duracao"];
}

const LARGURAS = ["w-59", "w-47.5"];

export function GuiaDuracao({ conteudo }: GuiaDuracaoProps) {
  return (
    <>
      <CabecalhoCapitulo cabecalho={conteudo.cabecalho} leve />
      <div className="flex flex-wrap items-center gap-x-6.5 gap-y-5.5 lg:gap-x-12.5">
        {conteudo.estatisticas.map((dado, indice) => (
          <Estatistica
            key={indice}
            dado={dado}
            tamanhoNumero="text-36 lg:text-44"
            className={LARGURAS[indice]}
          />
        ))}
        <PendenciaApuracao
          pendencia={conteudo.pendencia}
          className="w-full max-w-76.25"
        />
      </div>
    </>
  );
}
