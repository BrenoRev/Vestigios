import type { ReactNode } from "react";

interface CapituloGuiaProps {
  numero: number;
  total: string;
  children: ReactNode;
}

export function CapituloGuia({ numero, total, children }: CapituloGuiaProps) {
  return (
    <div className="flex items-stretch gap-3 md:gap-5.5">
      <div
        aria-hidden
        className="flex w-5.75 shrink-0 flex-col items-center gap-2 md:w-14.25"
      >
        <div className="flex h-5 w-full items-center justify-center bg-marcador-guia font-ibm-plex-mono text-branco md:h-7">
          <span className="text-14 underline decoration-from-font md:text-18">
            {numero}
          </span>
          <span className="hidden text-16 font-light md:inline">{total}</span>
        </div>
        <div className="w-0.5 flex-1 bg-marcador-guia" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-8">{children}</div>
    </div>
  );
}
