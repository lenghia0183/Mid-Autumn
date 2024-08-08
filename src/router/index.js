import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import { PATH } from "../constants/path";
import Test from "../pages/Test";

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <Home />,
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
