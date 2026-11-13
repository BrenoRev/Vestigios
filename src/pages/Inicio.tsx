import { Navbar } from "../components/layout/Navbar";
import { GuiaDeLeitura } from "../components/sections/GuiaDeLeitura";
import { HeroSection } from "../components/sections/HeroSection";
import { PrimeiraMateria } from "../components/sections/PrimeiraMateria";
import { Quebra } from "../components/sections/Quebra";
import {
  guia,
  hero,
  navegacao,
  primeiraMateria,
  quebra,
  rotuloNavegacao,
} from "../content/pagina-inicial";

export function Inicio() {
  return (
    <div className="relative bg-pagina">
      <Navbar rotulo={rotuloNavegacao} itens={navegacao} />
      <main>
        <HeroSection conteudo={hero} />
        <PrimeiraMateria conteudo={primeiraMateria} />
        <Quebra conteudo={quebra} />
        <GuiaDeLeitura conteudo={guia} />
      </main>
    </div>
  );
}
