import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { PartidaMultijugador } from "../pages/partidaMultijugador";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
//   { path: "/about", element: <About /> },
//   { 
//     path: "/dashboard",
//     element: <Dashboard />,
//     children: [
//       { path: "settings", element: <Settings /> }
//     ]
//   }
  { path: "/multijugador", element: <PartidaMultijugador /> }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}