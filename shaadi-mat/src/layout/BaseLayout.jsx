import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BaseLayout = () => {
  const location = useLocation();
  const { user, isInitializing } = useContext(AuthContext);

  if (isInitializing) {
    return null; // Or a loading spinner
  }

  // User requested to allow access to Home even if logged in.
  // if (user && (location.pathname === "/" || location.pathname === "/home")) {
  //   return <Navigate to="/profile" replace />;
  // }

  return (
    <>
      <main className="w-full h-full">
        <Header className="z-10" />
        <div className="w-full h-full">
          {location.pathname === "/" || location.pathname === "/home" ? (
            <Home />
          ) : (
            <Outlet />
          )}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default BaseLayout;
