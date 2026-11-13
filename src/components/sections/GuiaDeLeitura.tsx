import type { ConteudoGuia } from "../../types/pagina-inicial";
import { Container } from "../layout/Container";
import { CapituloGuia } from "../ui/CapituloGuia";
import { GuiaDeterioracao } from "./GuiaDeterioracao";
import { GuiaDuracao } from "./GuiaDuracao";
import { GuiaPanorama } from "./GuiaPanorama";
import { GuiaPrediosHistoricos } from "./GuiaPrediosHistoricos";
import { GuiaProtecao } from "./GuiaProtecao";
import { GuiaTombamento } from "./GuiaTombamento";

interface GuiaDeLeituraProps {
  conteudo: ConteudoGuia;
}

export function GuiaDeLeitura({ conteudo }: GuiaDeLeituraProps) {
  const capitulos = [
    <GuiaPrediosHistoricos
      key="predios-historicos"
      conteudo={conteudo.prediosHistoricos}
    />,
    <GuiaDeterioracao key="deterioracao" conteudo={conteudo.deterioracao} />,
    <GuiaTombamento key="tombamento" conteudo={conteudo.tombamento} />,
    <GuiaProtecao key="protecao" conteudo={conteudo.protecao} />,
    <GuiaDuracao key="duracao" conteudo={conteudo.duracao} />,
    <GuiaPanorama key="panorama" conteudo={conteudo.panorama} />,
  ];

  const rotuloDoTotal = "/" + String(capitulos.length);

  return (
    <section id={conteudo.alvo} className="bg-pagina py-5.5 md:py-12 lg:py-18">
      <Container className="flex flex-col gap-15">
        <header className="flex flex-col gap-3.5 text-ruina-900">
          <p className="font-ibm-plex-mono text-16 leading-none md:text-22">
            {conteudo.rotulo}
          </p>
          <h2 className="font-newsreader text-36 leading-none font-semibold md:text-48 lg:text-64">
            {conteudo.titulo}
          </h2>
          <p className="font-public-sans text-16 leading-texto font-medium tracking-texto text-tinta-600 md:text-22">
            {conteudo.introducao}
          </p>
        </header>
        <div className="flex flex-col gap-9">
          {capitulos.map((capitulo, indice) => (
            <CapituloGuia
              key={capitulo.key}
              numero={indice + 1}
              total={rotuloDoTotal}
            >
              {capitulo}
            </CapituloGuia>
          ))}
        </div>
      </Container>
    </section>
  );
}
