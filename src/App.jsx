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


function App() {
const getInitialLoggedData = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
};
  const [LoggedData, setLoggedData] = useState(getInitialLoggedData);

  const SaveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    encodedToken = jwtDecode(encodedToken);
    setLoggedData(encodedToken);

  }


  useEffect(() => {
  if (!LoggedData) {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        setLoggedData(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token"); // Clean up
      
      }
    } 
  }
}, []);


  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login SaveLoginData={SaveLoginData} />,
        },
        {
          path: "login",
          element: <Login SaveLoginData={SaveLoginData} />,
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
          element: <Login />,
        },
      ],
      errorElement: <Notfound />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute><MasterLayout LoggedData={LoggedData} /> </ProtectedRoute> ,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "recipes",
          element: <RecipesData />,
        },
        {
          path: "recipe-data",
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
  ]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
