import { site } from "../../content/site";

export function Logo() {
  return (
    <span
      role="img"
      aria-label={site.nome}
      className="logo block w-full max-w-79.75 bg-areia-100 md:max-w-136.25 lg:max-w-160.75"
    />
  );
}
