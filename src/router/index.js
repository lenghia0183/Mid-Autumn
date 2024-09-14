import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import { PATH } from "../constants/path";
import Test from "../pages/Test";
import Products from "../pages/Products";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AuthLayout from "../layouts/AuthLayout";
import Cart from "../pages/Carts";
import ProfileLayout from "../layouts/ProfileLayout";
import ProfileEdit from "../pages/ProfileEdit";

const router = createBrowserRouter([
  // main layout
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
        path: PATH.CART,
        element: <Cart />,
      },
      {
        path: PATH.TEST,
        element: <Test />,
      },
    ],
  },

  // auth layout
  {
    path: PATH.AUTH,
    element: <AuthLayout />,
    children: [
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
      {
        path: PATH.SIGN_UP,
        element: <SignUp />,
      },
    ],
  },

  // profileLayout
  {
    path: PATH.PROFILE,
    element: <ProfileLayout />,
    children: [
      {
        path: PATH.PROFILE_EDIT,
        element: <ProfileEdit />,
      },
    ],
  },

  // not found
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
