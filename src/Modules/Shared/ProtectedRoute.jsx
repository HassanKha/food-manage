import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { LoggedData } = useContext(AuthContext);
  const location = useLocation();

  const token = localStorage.getItem("token");
  const path = location.pathname;

  // If not logged in at all
  if (!token || !LoggedData) {
    return <Navigate to="/login" />;
  }

  // 🛑 Log out if not SystemUser and trying to access /dashboard/favs
  if (path === "/dashboard/favs" && LoggedData?.userGroup !== "SystemUser") {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  // 🛑 Log out if SystemUser and trying to access forbidden paths
  const forbiddenForSystemUser = ["/dashboard/categories", "/dashboard/users"];
  if (forbiddenForSystemUser.includes(path) && LoggedData?.userGroup === "SystemUser") {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
}
