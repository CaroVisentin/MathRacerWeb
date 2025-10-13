import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { RulesPage } from "../pages/rules/rules";
import { ProfilePage } from "../pages/profile/profile";
import { Multiplayer } from "../pages/game/multiplayer/multiplayerGame";
import { StoryMode } from "../pages/game/story-mode/storyMode";
import { LevelMap } from "../pages/game/story-mode/world/[id]";
import { StoryModeGame } from "../pages/game/story-mode/level/[id]";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/multijugador", element: <Multiplayer /> },
  { path: "/reglas", element: <RulesPage /> },
  { path: "/perfil", element: <ProfilePage /> },
  { path: "/story-mode", element: <StoryMode /> },
  {
    path: "/story-mode/world/:id",
    element: <LevelMap />,
  },
  {
    path: "/story-mode/level/:id",
    element: <StoryModeGame />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}