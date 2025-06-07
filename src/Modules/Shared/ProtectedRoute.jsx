import { useContext } from "react";
import { Navigate } from "react-router-dom";
import  { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({  children }) {
    let {LoggedData} = useContext(AuthContext); // 👈 Use context to save login data

  if (localStorage.getItem("token") || LoggedData) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}