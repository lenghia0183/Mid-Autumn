import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import { PATH } from "../constants/path";

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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
