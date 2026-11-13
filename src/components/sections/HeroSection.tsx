import { ehPendente } from "../../content/pendente";
import type { ConteudoHero } from "../../types/pagina-inicial";
import { Container } from "../layout/Container";
import { Botao } from "../ui/Botao";
import { ImagemResponsiva } from "../ui/ImagemResponsiva";
import { Logo } from "../ui/Logo";
import { Texto } from "../ui/Texto";

interface HeroSectionProps {
  conteudo: ConteudoHero;
}

export function HeroSection({ conteudo }: HeroSectionProps) {
  const { fundo, afirmacao, separador, convite, botao } = conteudo;

  return (
    <section className="relative overflow-hidden bg-terra-900">
      {ehPendente(fundo) ? null : (
        <ImagemResponsiva
          imagem={fundo}
          sizes="100vw"
          primeiraDobra
          className="absolute inset-0 size-full object-cover object-bottom opacity-10"
        />
      )}
      <Container className="relative pt-18.5 pb-17 md:pb-13.5">
        <div className="flex flex-col items-center gap-10 md:items-end">
          <div className="flex w-full flex-col items-center gap-3 text-center md:items-end md:gap-2 md:text-right lg:gap-0">
            <h1 className="flex w-full justify-center md:justify-end">
              <Logo />
            </h1>
            <p className="max-w-73.25 font-public-sans text-15 leading-none font-normal tracking-texto text-texto-hero md:max-w-129.75 md:text-24 lg:max-w-179.5 lg:text-28">
              <strong className="font-bold">
                <Texto valor={afirmacao} />
              </strong>
              {separador}
              <br className="hidden md:block" />
              <Texto valor={convite} />
            </p>
          </div>
          <Botao tema="F" rotulo={botao.rotulo} alvo={botao.alvo} />
        </div>
      </Container>
    </section>
  );
}
