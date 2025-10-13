import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { RulesPage } from "../pages/rules/rules";
import { ProfilePage } from "../pages/profile/profile";
import { Multiplayer } from "../pages/game/multiplayer/multiplayerGame";
import StoryMode from "../pages/game/story-mode/storyMode";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/multijugador", element: <Multiplayer /> },
  { path: "/reglas", element: <RulesPage /> },
  { path: "/perfil", element: <ProfilePage /> },
  { path: "/modo-historia", element: <StoryMode /> }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}