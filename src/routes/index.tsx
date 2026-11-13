import { createBrowserRouter, redirect } from "react-router";
import { Inicio } from "../pages/Inicio";

// O Figma não desenha página 404; até existir uma, caminho desconhecido volta ao início.
export const router = createBrowserRouter([
  { path: "/", Component: Inicio },
  { path: "*", loader: () => redirect("/") },
]);
