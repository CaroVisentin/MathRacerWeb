import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";

import { ReglasPage } from "../pages/rules/rules";
import { PerfilPage } from "../pages/profile/profile";
import { Multiplayer } from "../pages/game/multiplayer/multiplayerGame";
import StoryMode from "../pages/game/story-mode/storyMode";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/multijugador", element: <Multiplayer /> },
  { path: "/reglas", element: <ReglasPage /> },
  { path: "/perfil", element: <PerfilPage /> },
  { path: "/modo-historia", element: <StoryMode /> }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}