import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./Modules/Authentication/Login";
import Register from "./Modules/Authentication/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./Modules/Authentication/ForgetPassword";
import ResetPassword from "./Modules/Authentication/ResetPassword";
import AuthLayout from "./Modules/Shared/AuthLayout";
import Notfound from "./Modules/Shared/Notfound";
import MasterLayout from "./Modules/Shared/MasterLayout";
import Dashboard from "./Modules/Dashboard/Dashboard";
import RecipesData from "./Modules/Recipes/RecipesData";
import CategoriesList from "./Modules/Categories/CategoriesList";
import CategoryData from "./Modules/Categories/CategoryData";
import UsersList from "./Modules/Users/UsersList";
import FavList from "./Modules/Favourites/FavList";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./Modules/Shared/ProtectedRoute";
import RecipesList from "./Modules/Recipes/RecipesList";
import VerifyEmail from "./Modules/Authentication/VerifyEmail";

function App() {
 

  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login  />,
        },
        {
          path: "login",
          element: <Login  />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forget-pass",
          element: <ForgetPassword />,
        },
        {
          path: "reset-pass",
          element: <ResetPassword />,
        },
        {
          path: "verify-account",
          element: <VerifyEmail />,
        },
      ],
      errorElement: <Notfound />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout  />{" "}
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "recipes",
          element: <RecipesList />,
        },
        {
          path: "recipe-data",
          element: <RecipesData />,
        },
        {
          path: "recipe-data/:id",
          element: <RecipesData />,
        },
        {
          path: "categories",
          element: <CategoriesList />,
        },
        {
          path: "category-data",
          element: <CategoryData />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path: "favs",
          element: <FavList />,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
