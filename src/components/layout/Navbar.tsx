import { useState } from "react";
import type { ItemNavegacao } from "../../types/pagina-inicial";

interface NavbarProps {
  rotulo: string;
  itens: readonly ItemNavegacao[];
}

export function Navbar({ rotulo, itens }: NavbarProps) {
  const [ativo, setAtivo] = useState(itens[0]?.alvo);

  return (
    <header className="absolute inset-x-0 top-0 z-10 bg-terra-900/60 backdrop-blur-navbar">
      <nav aria-label={rotulo} className="relative">
        <ul className="rolagem-oculta flex gap-11 overflow-x-auto px-6 py-4 md:px-9 lg:justify-center lg:gap-11.5 lg:px-0">
          {itens.map((item) => {
            const selecionado = item.alvo === ativo;
            return (
              <li key={item.alvo} className="shrink-0">
                <a
                  href={`#${item.alvo}`}
                  aria-current={selecionado ? "location" : undefined}
                  onClick={() => {
                    if (document.getElementById(item.alvo)) setAtivo(item.alvo);
                  }}
                  className={`block font-ibm-plex-mono text-16 leading-texto tracking-texto whitespace-nowrap text-branco capitalize focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
                    selecionado ? "font-bold underline" : "font-normal"
                  }`}
                >
                  {item.rotulo}
                </a>
              </li>
            );
          })}
        </ul>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-26.5 bg-linear-to-r from-terra-900/0 via-terra-900/84 via-46% to-terra-900/84 md:w-40.5 lg:hidden"
        />
      </nav>
    </header>
  );
}
