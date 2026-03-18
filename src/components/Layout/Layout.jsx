import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import MyNavbar from "./../Navbar/Navbar";
export default function Layout() {
  return (
    <>
      <MyNavbar />

      <div className="container w-[80%] bg-slate-700 mx-auto p-4 min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
