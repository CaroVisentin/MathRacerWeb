import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { RulesPage } from "../pages/rules/rules";
import { ProfilePage } from "../pages/profile/profile";
import { Menu } from "../pages/game/multiplayer/multiplayerGame";
import { StoryMode } from "../pages/game/story-mode/storyMode";
import CreateGame from "../components/game/on-line/create-game";
import { InviteFriend } from "../components/game/on-line/invite-friend";
import { JoinGame } from "../components/game/on-line/join-game";
import { QuickGame } from "../components/game/on-line/quick-game"; import { LevelMap } from "../pages/game/story-mode/world/[id]";
import { StoryModeGame } from "../pages/game/story-mode/level/[id]";
import { MultiplayerGame } from "../components/game/multiplayer/multiplayer";
import { LoginPage } from "../pages/login/logIn";
import { RegisterPage } from "../pages/register/register";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/multijugador", element: <MultiplayerGame /> },
  { path: "/menu", element: <Menu /> },
  { path: "/modo-historia", element: <StoryMode /> },
  { path: "/crear", element: <CreateGame /> },
  { path: "/invitar-amigo", element: <InviteFriend /> },
  { path: "/unirse-partida", element: <JoinGame /> },
  { path: "/partida-rapida", element: <QuickGame /> },
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
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}