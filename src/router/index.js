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
import ChangePassword from "../pages/ChangePassword";
import Favorite from "../pages/Favorite";
import ViewedProduct from "../pages/ViewedProduct";
import Order from "../pages/Order";
import ContactUs from "../pages/Contact";
import Checkout from "../pages/Checkout";
import ProductDetail from "../pages/ProductDetail";
import { authLoader } from "../loaders/authentications";

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
        path: PATH.PRODUCT_DETAIL,
        element: <ProductDetail />,
      },
      {
        path: PATH.ABOUT,
        element: <About />,
      },
      {
        path: PATH.CART,
        element: <Cart />,
        loader: authLoader,
      },
      {
        path: PATH.CONTACT,
        element: <ContactUs />,
      },
      {
        path: PATH.CHECKOUT,
        element: <Checkout />,
        loader: authLoader,
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
        loader: authLoader,
      },
      {
        path: PATH.CHANGE_PASSWORD,
        element: <ChangePassword />,
        loader: authLoader,
      },
      {
        path: PATH.FAVORITE,
        element: <Favorite />,
        loader: authLoader,
      },
      {
        path: PATH.VIEWED_PRODUCTS,
        element: <ViewedProduct />,
        loader: authLoader,
      },
      {
        path: PATH.ORDER,
        element: <Order />,
        loader: authLoader,
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
