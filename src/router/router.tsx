import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { ReglasPage } from "../pages/reglas/reglas";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/reglas", element: <ReglasPage /> },
//   { path: "/about", element: <About /> },
//   { 
//     path: "/dashboard",
//     element: <Dashboard />,
//     children: [
//       { path: "settings", element: <Settings /> }
//     ]
//   }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}