import { Navbar } from "../components/layout/Navbar";
import { GuiaDeLeitura } from "../components/sections/GuiaDeLeitura";
import { HeroSection } from "../components/sections/HeroSection";
import { Materia } from "../components/sections/Materia";
import { Quebra } from "../components/sections/Quebra";
import {
  casarao,
  futuro,
  responsaveis,
  ribamar,
  valdemar,
} from "../content/materias";
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
        <Materia conteudo={primeiraMateria} />
        <Quebra conteudo={quebra} />
        <GuiaDeLeitura conteudo={guia} />
        <Materia conteudo={valdemar} />
        <Materia conteudo={casarao} />
        <Materia conteudo={ribamar} />
        <Materia conteudo={responsaveis} />
        <Materia conteudo={futuro} />
      </main>
    </div>
  );
}
