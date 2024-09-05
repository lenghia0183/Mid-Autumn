import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import { PATH } from "../constants/path";
import Test from "../pages/Test";
import Products from "../pages/Products";

const router = createBrowserRouter([
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
    path: PATH.TEST,
    element: <Test />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
