import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../Login/Login";

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("userToken")) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}
