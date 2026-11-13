import type { Texto as TextoConteudo } from "../../types/content";
import { Texto } from "./Texto";

interface FaixaDestaqueProps {
  texto: TextoConteudo;
  centralizado?: boolean;
}

export function FaixaDestaque({
  texto,
  centralizado = false,
}: FaixaDestaqueProps) {
  return (
    <p
      className={`max-w-131 font-public-sans text-16 leading-texto font-medium tracking-texto text-pagina md:text-18 ${
        centralizado ? "text-center" : ""
      }`}
    >
      <span className="bg-faixa-destaque box-decoration-clone px-2 py-0.5">
        <Texto valor={texto} />
      </span>
    </p>
  );
}
