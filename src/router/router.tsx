import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { RulesPage } from "../pages/rules/rules";
import { ProfilePage } from "../pages/profile/profile";
import { Menu } from "../pages/game/multiplayer/multiplayerGame";
import { StoryMode } from "../pages/game/story-mode/storyMode";
import CreateGame from "../components/game/on-line/create-game";
import { InviteFriend } from "../components/game/on-line/invite-friend";
import { JoinGame } from "../components/game/on-line/join-game";
import { QuickGame } from "../components/game/on-line/quick-game";
import { LevelMap } from "../pages/game/story-mode/world/[id]";
import { StoryModeGame } from "../pages/game/story-mode/level/[id]";
import { MultiplayerGame } from "../components/game/multiplayer/multiplayer";
import { LoginPage } from "../pages/login/logIn";
import { RegisterPage } from "../pages/register/register";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { PublicRoute } from "../components/auth/PublicRoute";


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <ProtectedRoute><Home /></ProtectedRoute> 
  },
  { 
    path: "/multijugador", 
    element: <ProtectedRoute><MultiplayerGame /></ProtectedRoute> 
  },
  { 
    path: "/menu", 
    element: <ProtectedRoute><Menu /></ProtectedRoute> 
  },
  { 
    path: "/modo-historia", 
    element: <ProtectedRoute><StoryMode /></ProtectedRoute> 
  },
  { 
    path: "/crear", 
    element: <ProtectedRoute><CreateGame /></ProtectedRoute> 
  },
  { 
    path: "/invitar-amigo", 
    element: <ProtectedRoute><InviteFriend /></ProtectedRoute> 
  },
  { 
    path: "/unirse-partida", 
    element: <ProtectedRoute><JoinGame /></ProtectedRoute> 
  },
  { 
    path: "/partida-rapida", 
    element: <ProtectedRoute><QuickGame /></ProtectedRoute> 
  },
  { 
    path: "/reglas", 
    element: <ProtectedRoute><RulesPage /></ProtectedRoute> 
  },
  { 
    path: "/perfil", 
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute> 
  },
  { 
    path: "/story-mode", 
    element: <ProtectedRoute><StoryMode /></ProtectedRoute> 
  },
  {
    path: "/story-mode/world/:id",
    element: <ProtectedRoute><LevelMap /></ProtectedRoute>,
  },
  {
    path: "/story-mode/level/:id",
    element: <ProtectedRoute><StoryModeGame /></ProtectedRoute>,
  },
  { 
    path: "/login", 
    element: <PublicRoute><LoginPage /></PublicRoute> 
  },
  { 
    path: "/register", 
    element: <PublicRoute><RegisterPage /></PublicRoute> 
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}