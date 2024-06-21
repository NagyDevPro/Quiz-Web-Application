import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ admin }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role")
  const isAdmin = (role === "admin");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (admin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
//   const isLoggedIn = !!sessionStorage.getItem("token");

//   if (isLoggedIn) {
//     return <Navigate to="/" replace />;
//   }

  return <Outlet />;
};

export { ProtectedRoute, PublicRoute };