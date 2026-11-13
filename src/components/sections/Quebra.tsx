import { ehProvisorio } from "../../content/pendente";
import type { ConteudoQuebra } from "../../types/pagina-inicial";
import { Container } from "../layout/Container";

interface QuebraProps {
  conteudo: ConteudoQuebra;
}

export function Quebra({ conteudo }: QuebraProps) {
  const { estrofes } = conteudo;
  const marcado = ehProvisorio(estrofes);
  const texto = (marcado ? estrofes.conteudo : estrofes)
    .map((versos) => versos.join("\n"))
    .join("\n\n");

  return (
    <section className="bg-pagina py-9.5 md:py-17 lg:py-18">
      <Container>
        <figure className="mx-auto w-58 md:w-83.75 lg:w-108">
          <p className="font-newsreader text-22 leading-citacao font-normal tracking-titulo whitespace-pre-line text-preto md:text-28 lg:text-34">
            {marcado ? (
              <mark className="texto-provisorio" title={estrofes.motivo}>
                {texto}
              </mark>
            ) : (
              texto
            )}
          </p>
        </figure>
      </Container>
    </section>
  );
}
