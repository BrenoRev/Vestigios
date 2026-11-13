import type { ConteudoGuia } from "../../types/pagina-inicial";
import { CabecalhoCapitulo } from "../ui/CabecalhoCapitulo";
import { EspacoReservado } from "../ui/EspacoReservado";
import { FaixaDestaque } from "../ui/FaixaDestaque";
import { Texto } from "../ui/Texto";

interface GuiaProtecaoProps {
  conteudo: ConteudoGuia["protecao"];
}

export function GuiaProtecao({ conteudo }: GuiaProtecaoProps) {
  return (
    <>
      <CabecalhoCapitulo cabecalho={conteudo.cabecalho} />
      <ul className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-5.5 lg:gap-9">
        {conteudo.instituicoes.map((instituicao) => (
          <li key={instituicao.nome} className="flex items-start gap-2">
            <EspacoReservado
              pendencia={instituicao.logo}
              className="h-23 w-23.25 shrink-0"
            />
            <div className="flex flex-col gap-1.5">
              <p className="font-ibm-plex-mono text-18 leading-none font-semibold tracking-texto text-ferrugem-600 underline decoration-from-font lg:text-22">
                <Texto valor={instituicao.esfera} />
              </p>
              <p className="font-public-sans text-16 leading-texto font-medium tracking-texto text-tinta-600 lg:text-18">
                {instituicao.nome}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="max-w-128.5 font-public-sans text-16 leading-texto font-medium tracking-texto text-tinta-600 md:text-18 lg:max-w-145.75">
        <Texto valor={conteudo.iep} />
      </p>
      <FaixaDestaque texto={conteudo.obrigacao} />
      <div className="flex flex-col items-center gap-9">
        <EspacoReservado pendencia={conteudo.imagem} className="h-67 w-full" />
        <FaixaDestaque texto={conteudo.impasse} centralizado />
      </div>
    </>
  );
}
