import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Component/Home/Home";
import Products from "./Component/Products/Products";
import Register from "./Component/Register/Register";
import Notfound from "./Component/Notfound/Notfound";
import Cart from "./Component/Cart/Cart";
import Brands from "./Component/Brands/Brands";
import WishList from "./Component/WishList/Wishlist";
import Categories from "./Component/Categories/Categories";
import Logout from "./Component/Logout/Logout";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./Component/Login/Login";
import ProtectedRoutes from "./Component/ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from 'react-toastify';
import Adrress from "./Component/Address/Address";

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "product-details/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "address/:id",
          element: (
            <ProtectedRoutes>
              <Adrress />
            </ProtectedRoutes>
          ),
        },
        { path: "logout", element: <Logout /> },
        { path: "*", element: <Notfound /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <>
      <CartContextProvider>
        <RouterProvider router={routes} />;
      </CartContextProvider>
      <ToastContainer theme='colored' autoClose={3000} />
    </>
  );
}
