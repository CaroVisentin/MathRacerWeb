import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { RulesPage } from "../pages/rules/rules";
import { ProfilePage } from "../pages/profile/profile";
import { Menu } from "../pages/game/multiplayer/multiplayerGame";
import { StoryMode } from "../pages/game/story-mode/storyMode";
import CreateGame from "../components/game/on-line/create-game";
import InviteFriend from "../components/game/on-line/invite-friend";
import JoinGame from "../components/game/on-line/join-game";
import { QuickGame } from "../components/game/on-line/quick-game";
import { LevelMap } from "../pages/game/story-mode/world/[id]";
import { StoryModeGame } from "../pages/game/story-mode/level/[id]";
import { LoginPage } from "../pages/login/logIn";
import { RegisterPage } from "../pages/register/register";
import { RankingPage } from "../pages/ranking/ranking";
import { GaragePage } from "../pages/garage/garage";
import { StorePage } from "../pages/store/store";
import { ProductDetailsPage } from "../pages/store/product/[id]";
import CartPage from "../pages/cart/cart";
import { MultiplayerGame } from "../components/game/multiplayer/multiplayer";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { PublicRoute } from "../components/auth/PublicRoute";
import { TutorialPage } from "../pages/tutorial/tutorial";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/home",
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
  {
    path: "/multijugador",
    element: <ProtectedRoute><MultiplayerGame /></ProtectedRoute>
  },
  {
    path: "/multijugador/:gameId",
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
    path: "/modo-historia/mundo/:id",
    element: <ProtectedRoute><LevelMap /></ProtectedRoute>,
  },
  {
    path: "/modo-historia/nivel/:id",
    element: <ProtectedRoute><StoryModeGame /></ProtectedRoute>,
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
    path: "/login",
    element: <PublicRoute><LoginPage /></PublicRoute>
  },
  {
    path: "/registro",
    element: <PublicRoute><RegisterPage /></PublicRoute>
  },
  {
    path: "/ranking",
    element: <ProtectedRoute> <RankingPage /> </ProtectedRoute>
  },
  {
    path: "/garage",
    element: <ProtectedRoute> <GaragePage /> </ProtectedRoute>
  },
  {
    path: "/store",
    element: <ProtectedRoute> <StorePage /> </ProtectedRoute>
  },
  {
    path: "/store/product/:id",
    element: <ProtectedRoute> <ProductDetailsPage /> </ProtectedRoute>
  },
  {
    path: "/cart",
    element: <ProtectedRoute> <CartPage /> </ProtectedRoute>
  },
  {
    path: "/tutorial",
    element: <ProtectedRoute> <TutorialPage /> </ProtectedRoute>
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}