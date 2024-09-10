import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import { PATH } from "../constants/path";
import Test from "../pages/Test";
import Products from "../pages/Products";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: PATH.HOME,
        element: <Home />,
      },
      {
        path: PATH.PRODUCTS,
        element: <Products />,
      },
      {
        path: PATH.ABOUT,
        element: <About />,
      },
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
      {
        path: PATH.TEST,
        element: <Test />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
