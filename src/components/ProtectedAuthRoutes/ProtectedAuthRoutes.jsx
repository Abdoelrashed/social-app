import { Navigate } from "react-router";

export default function ProtectedAuthRoutes({ children }) {
  if (!localStorage.getItem("userToken")) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
}
