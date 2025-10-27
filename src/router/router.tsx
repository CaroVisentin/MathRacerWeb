import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { RulesPage } from "../pages/rules/rules";
import { ProfilePage } from "../pages/profile/profile";
import { Menu } from "../pages/game/multiplayer/multiplayerGame";
import { StoryMode } from "../pages/game/story-mode/storyMode";
import CreateGame from "../components/game/on-line/create-game";
import { InviteFriend } from "../components/game/on-line/invite-friend";
import { JoinGame } from "../components/game/on-line/join-game";
//import { QuickGame } from "../components/game/on-line/quick-game"; 
import { LevelMap } from "../pages/game/story-mode/world/[id]";
import { StoryModeGame } from "../pages/game/story-mode/level/[id]";
//import { MultiplayerGame } from "../components/game/multiplayer/multiplayer";
import { LoginPage } from "../pages/login/logIn";
import { RegisterPage } from "../pages/register/register";
import { RankingPage } from "../pages/ranking/ranking";
import { GaragePage } from "../pages/garage/garage";
import { StorePage } from "../pages/store/store";
import { ProductDetailsPage } from "../pages/store/product/[id]";
import CartPage from "../pages/cart/cart";
import { MultiplayerGame } from "../components/game/multiplayer/multiplayer";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/multijugador", element: <Menu/> },
 // { path: "/menu", element: <Menu /> },
  { path: "/modo-historia", element: <StoryMode /> },
  { path: "/crear", element: <CreateGame /> },
  { path: "/invitar-amigo", element: <InviteFriend /> },
  { path: "/unirse-partida", element: <JoinGame /> },
  { path: "/partida-rapida", element: <MultiplayerGame /> },
  { path: "/reglas", element: <RulesPage /> },
  { path: "/perfil", element: <ProfilePage /> },
  { path: "/modo-historia", element: <StoryMode /> },
  {
    path: "/modo-historia/mundo/:id",
    element: <LevelMap />,
  },
  {
    path: "/modo-historia/nivel/:id",
    element: <StoryModeGame />,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/ranking", element: <RankingPage /> },
  { path: "/garage", element: <GaragePage /> },
  { path: "/store", element: <StorePage /> },
  { path: "/store/product/:id", element: <ProductDetailsPage /> },
  { path: "/cart", element: <CartPage /> }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}