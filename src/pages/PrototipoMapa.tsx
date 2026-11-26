import { domAnimation, LazyMotion } from "motion/react";
import { Navbar } from "../components/layout/Navbar";
import { MapaDosDados } from "../components/sections/MapaDosDados";
import { navegacao, rotuloNavegacao } from "../content/pagina-inicial";
import baseMapa from "../prototipo/mapa-base.json";
import { gerarIndicadoresMock } from "../prototipo/mapa-indicadores-mock";
import { textosMapa } from "../prototipo/mapa-interface";
import { prediosMock } from "../prototipo/mapa-mock";
import type { BaseMapa } from "../types/mapa";

const base: BaseMapa = baseMapa;
const serie = gerarIndicadoresMock(base);

export function PrototipoMapa() {
  return (
    <div data-tema="c" className="min-h-dvh bg-pagina text-texto">
      <p
        role="note"
        className="bg-laranja-400 py-espaco-2 text-center font-ibm-plex-mono text-12 leading-apuracao text-noite-900"
      >
        {textosMapa.aviso}
      </p>
      <div>
        {/* O translúcido da Navbar é pensado sobre fundo escuro (o Hero); aqui o fundo noite repõe esse tom. */}
        <div className="bg-noite-900">
          <Navbar
            rotulo={rotuloNavegacao}
            itens={navegacao}
            ativoInicial="mapa-dos-dados"
            posicao="fluxo"
          />
        </div>
        <main>
          {/* `m.*` com domAnimation: o componente motion completo pesa ~30 KB gzip a mais. */}
          <LazyMotion features={domAnimation} strict>
            <MapaDosDados
              predios={prediosMock}
              base={base}
              serie={serie}
              textos={textosMapa}
            />
          </LazyMotion>
        </main>
      </div>
    </div>
  );
}
