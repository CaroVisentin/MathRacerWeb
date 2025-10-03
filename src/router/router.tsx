import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { PartidaMultijugador } from "../pages/partidaMultijugador";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/multijugador", element: <PartidaMultijugador /> },
  // { path: "/historia", element: <Historia /> },
  // { path: "/practica", element: <Practica /> },
  // { path: "/ranking", element: <Ranking /> },
  // { path: "/garage", element: <Garage /> },
  // { path: "/shop", element: <Shop /> },


//   { path: "/about", element: <About /> },
//   { 
//     path: "/dashboard",
//     element: <Dashboard />,
//     children: [
//       { path: "settings", element: <Settings /> }
//     ]
//   }
 // { path: "/multijugador", element: <PartidaMultijugador /> }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}