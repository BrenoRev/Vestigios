import type { Imagem } from "../../types/content";

interface ImagemResponsivaProps {
  imagem: Imagem;
  /** Largura ocupada em cada breakpoint do protótipo, no formato do atributo `sizes`. */
  sizes: string;
  primeiraDobra?: boolean;
  className?: string;
}

// Crédito e legenda ficam com a seção, porque a forma de exibi-los vem do protótipo.
export function ImagemResponsiva({
  imagem,
  sizes,
  primeiraDobra = false,
  className,
}: ImagemResponsivaProps) {
  const { sources, img } = imagem.arquivo;

  return (
    <picture>
      {Object.entries(sources).map(([formato, srcset]) => (
        <source
          key={formato}
          type={`image/${formato}`}
          srcSet={srcset}
          sizes={sizes}
        />
      ))}
      <img
        src={img.src}
        width={img.w}
        height={img.h}
        alt={imagem.alt}
        sizes={sizes}
        loading={primeiraDobra ? "eager" : "lazy"}
        fetchPriority={primeiraDobra ? "high" : "auto"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
