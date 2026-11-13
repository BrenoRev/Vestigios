import type { ConteudoGuia } from "../../types/pagina-inicial";
import { CabecalhoCapitulo } from "../ui/CabecalhoCapitulo";
import { CartaoConceito } from "../ui/CartaoConceito";

interface GuiaDeterioracaoProps {
  conteudo: ConteudoGuia["deterioracao"];
}

export function GuiaDeterioracao({ conteudo }: GuiaDeterioracaoProps) {
  return (
    <>
      <CabecalhoCapitulo cabecalho={conteudo.cabecalho} />
      <div className="flex flex-col gap-4 md:flex-row md:gap-14 lg:gap-9.25">
        {conteudo.sentidos.map((sentido, indice) => (
          <CartaoConceito
            key={indice}
            conceito={sentido}
            icone={sentido.icone}
          />
        ))}
      </div>
    </>
  );
}
