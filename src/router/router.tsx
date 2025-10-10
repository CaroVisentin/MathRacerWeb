import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { ReglasPage } from "../pages/reglas/reglas";
import { PerfilPage } from "../pages/perfil/perfil";
import { PartidaMultijugador } from "../pages/juego/multijugador/partidaMultijugador";
import StoryMode from "../pages/juego/story-mode/storyMode";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/multijugador", element: <PartidaMultijugador /> },
  { path: "/reglas", element: <ReglasPage /> },
  { path: "/perfil", element: <PerfilPage /> },
  { path: "/modo-historia", element: <StoryMode /> }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}