import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import Home from "./components/Home/Home";
import { HeroUIProvider } from "@heroui/react";
import Profile from "./components/Profile/Profile";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PostDetails from "./components/PostDetails/PostDetails";
import { ToastContainer } from "react-toastify";
import DetectOfline from "./components/DetectOffline/DetectOfline";
import { useNetworkState } from "react-use";
import ProtectedAuthRoutes from "./components/ProtectedRoute/ProtectedAuthRoutes";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "postdetails/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "Register",
        element: (
          <ProtectedAuthRoutes>
            <Register />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "Login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

const query = new QueryClient();

export default function App() {
  const { online } = useNetworkState();

  return (
    <>
      {!online && <DetectOfline />}
      <QueryClientProvider client={query}>
        <AuthContextProvider>
          <HeroUIProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </HeroUIProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
