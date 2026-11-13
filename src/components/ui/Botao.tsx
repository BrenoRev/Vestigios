type Tema = "A" | "B" | "C" | "D" | "E" | "F";

interface BotaoProps {
  rotulo: string;
  alvo: string;
  tema?: Tema;
}

const ESTILOS: Record<Tema, { base: string; hover?: string }> = {
  A: {
    base: "borda-1-5 border-terra-900 text-terra-900 backdrop-blur-botao",
  },
  B: { base: "bg-ferrugem-600 text-areia-100", hover: "bg-botao-b-hover" },
  C: {
    base: "borda-1-5 border-noite-100 bg-noite-900 text-noite-100",
    hover: "bg-botao-c-hover",
  },
  D: { base: "bg-ferrugem-700 text-branco", hover: "bg-botao-d-hover" },
  E: { base: "bg-laranja-400 text-noite-900", hover: "bg-botao-e-hover" },
  F: { base: "borda-1-5 border-branco text-branco backdrop-blur-botao" },
};

export function Botao({ rotulo, alvo, tema = "B" }: BotaoProps) {
  const { base, hover } = ESTILOS[tema];

  return (
    <a
      href={`#${alvo}`}
      className={`group relative inline-flex min-h-11 items-center justify-center rounded-raio-12 px-3.5 py-2 font-work-sans text-14 leading-normal font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:text-16 lg:px-6 lg:py-3 lg:text-22 ${base}`}
    >
      {hover ? (
        <span
          aria-hidden
          className={`absolute inset-0 rounded-raio-12 opacity-0 transition-opacity duration-300 ease-out-cubic group-hover:opacity-100 ${hover}`}
        />
      ) : null}
      <span className="relative">{rotulo}</span>
    </a>
  );
}
