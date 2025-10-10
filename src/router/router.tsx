import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { ReglasPage } from "../pages/reglas/reglas";
import { PerfilPage } from "../pages/perfil/perfil";
import { PartidaMultijugador } from "../pages/juego/multijugador/partidaMultijugador";
import LevelSelection from "../pages/juego/modo-historia/level-map";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/multijugador", element: <PartidaMultijugador /> },
  { path: "/reglas", element: <ReglasPage /> },
  { path: "/perfil", element: <PerfilPage /> },
  { path: "/modo-historia", element: <LevelSelection />}
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}