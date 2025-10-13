import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";

import { ReglasPage } from "../pages/rules/rules";
import { PerfilPage } from "../pages/profile/profile";
import { Multiplayer } from "../pages/game/multiplayer/multiplayerGame";
import StoryMode from "../pages/game/story-mode/storyMode";
import {CreateGame} from "../components/game/on-line/create-game";
import { InviteFriend} from "../components/game/on-line/invite-friend";
import { JoinGame } from "../components/game/on-line/join-game";
import { QuickGame } from "../components/game/on-line/quick-game";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/multijugador", element: <Multiplayer /> },
  { path: "/reglas", element: <ReglasPage /> },
  { path: "/perfil", element: <PerfilPage /> },
  { path: "/modo-historia", element: <StoryMode /> },
  { path:"/crear", element:<CreateGame/>},
  { path:"/invitar-amigo", element:<InviteFriend/>},
  { path:"/unirse-partida", element:<JoinGame/>},
  { path: "/partida-rapida", element: <QuickGame />},
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}