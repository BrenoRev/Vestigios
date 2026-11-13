import type { ConteudoPrimeiraMateria } from "../../types/pagina-inicial";
import { Container } from "../layout/Container";
import { Texto } from "../ui/Texto";

interface PrimeiraMateriaProps {
  conteudo: ConteudoPrimeiraMateria;
}

export function PrimeiraMateria({ conteudo }: PrimeiraMateriaProps) {
  const { alvo, rotulo, titulo, blocos, citacao } = conteudo;

  return (
    <section id={alvo} className="bg-pagina py-5.5 md:py-12 lg:py-18">
      <Container>
        <header className="flex flex-col gap-2 text-ruina-900 md:gap-3.5">
          <p className="font-ibm-plex-mono text-16 leading-none md:text-22">
            {rotulo}
          </p>
          <h2 className="font-newsreader text-36 leading-none font-semibold md:text-48 lg:text-64">
            <Texto valor={titulo} />
          </h2>
        </header>
        <div className="flex flex-col gap-12 py-5">
          {blocos.map((bloco, indice) => (
            <div key={indice} className="flex flex-col gap-4">
              <h3 className="font-newsreader text-28 leading-subtitulo font-medium tracking-titulo text-ruina-900 md:text-36 lg:text-40">
                <Texto valor={bloco.subtitulo} />
              </h3>
              <p className="font-public-sans text-16 leading-texto font-medium tracking-texto text-texto-materia md:text-18">
                <Texto valor={bloco.texto} />
              </p>
            </div>
          ))}
        </div>
        <figure className="flex flex-col items-center gap-3.5 pt-10 text-center">
          <blockquote className="font-dm-serif-display text-28 leading-citacao tracking-titulo text-ferrugem-600 md:text-36 lg:text-48">
            <Texto valor={citacao.texto} />
          </blockquote>
          <figcaption className="font-ibm-plex-mono text-14 leading-texto font-medium tracking-texto text-texto-materia lg:text-18">
            <Texto valor={citacao.autor} />
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
