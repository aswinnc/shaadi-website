import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Members", path: "/members" },
    { id: 3, name: "Profile", path: "/profile" },
    // { id: 4, name: "Matches", path: "/matches" }, // Removed as per request
    { id: 5, name: "Contact", path: "/contact" },
    { id: 6, name: "Pricing", path: "/pricing" },
    { id: 7, name: "Admin", path: "/admin" },
    { id: 8, name: "Help", path: "/help" },
    // Removed as per request
  ];

  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  const getDisplayName = (user) => {
    if (user.name) {
      return user.name;
    } else if (user.email) {
      let splitName = user.email.split("@")[0];
      return splitName.charAt(0).toUpperCase() + splitName.slice(1);
    }
    return "";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      <header
        className={`${location.pathname === "/" ||
          location.pathname === "/members" ||
          location.pathname === "/mathces" ||
          location.pathname === "/contact" ||
          location.pathname === "/register" ||
          location.pathname === "/login" ||
          location.pathname === "/homeold"
          ? "bg-transparent"
          : "header"
          } w-full h-auto top-0 z-50 backdrop-blur-md`}
      >
        <nav className="w-full h-full flex justify-between items-center px-3 py-1">
          <Logo />
          <ul className="hidden lg:flex items-center gap-2 ">
            {navLinks.map((navLink) => {
              if (
                navLink.name === "Admin" &&
                (!user || user?.role !== "admin")
              ) {
                return null;
              }

              if (
                (navLink.name !== "Profile" &&
                  navLink.name !== "Matches" &&
                  navLink.name !== "Pricing") ||
                user
              ) {
                return (
                  <NavLink
                    key={navLink.id}
                    to={navLink.path}
                    className={`${location.pathname === navLink.path
                      ? "bg-pink-500 text-white"
                      : ""
                      } px-3 py-2 rounded-md hover:bg-pink-300 hover:text-pink-600 transition-all duration-700 font-semibold text-white`}
                  >
                    {navLink.name}
                  </NavLink>
                );
              }

              return null;
            })}
          </ul>
          <div className="hidden lg:flex  gap-2">
            {!user ? (
              <>
                {/* <button
                  className="bg-pink-600 px-6 py-2 rounded-full text-white flex items-center justify-center gap-4"
                  onClick={() => navigate("/homeold")}
                >
                  Go To Homeold
                </button> */}

                <button
                  className="bg-pink-600 px-6 py-2 rounded-full text-white flex items-center justify-center gap-4"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="border-white border-2 px-3 py-2 rounded-full text-white flex items-center justify-center gap-4"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <FaUserCircle size={24} className="text-white" />
                <span
                  className="text-white cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  {getDisplayName(user)}
                </span>
                <button
                  className="border-white border-2 px-3 py-2 rounded-full text-white flex items-center justify-center gap-4 hover:bg-white hover:text-pink-400 transition-all duration-700"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className="lg:hidden flex">
            <button onClick={toggleMobileMenu} className="text-white">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>
      </header>
      <div className={`${location.pathname === "/" ||
        location.pathname === "/members" ||
        location.pathname === "/mathces" ||
        location.pathname === "/contact" ||
        location.pathname === "/register" ||
        location.pathname === "/login"

        ? "bg-white text-black"
        : "header text-white"
        } w-full  h-auto py-10 fixed top-[80px] ${isMobileMenuOpen ? "flex" : "hidden"} flex-col z-50 backdrop-blur-md lg:hidden`}>
        <ul className="flex flex-col items-center gap-2 ">
          {navLinks.map((navLink) => {
            if (
              navLink.name === "Admin" &&
              (!user || user?.role !== "admin")
            ) {
              return null;
            }

            if (
              (navLink.name !== "Profile" &&
                navLink.name !== "Matches" &&
                navLink.name !== "Pricing") ||
              user
            ) {
              return (
                <NavLink
                  key={navLink.id}
                  to={navLink.path}
                  className={`${location.pathname === navLink.path
                    ? "bg-pink-500 text-white"
                    : ""
                    } px-3 py-2 rounded-md hover:bg-pink-300 hover:text-pink-600 transition-all duration-700 font-semibold `}
                >
                  {navLink.name}
                </NavLink>
              );
            }

            return null;
          })}
        </ul>
        <div className="flex flex-col   gap-2">
          {!user ? (
            <>
              <button
                className="bg-pink-600 px-6 py-2 rounded-full  flex items-center justify-center gap-4"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="border-white border-2 px-3 py-2 rounded-full  flex items-center justify-center gap-4"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center pt-5 gap-2">
              <div className="flex gap-2">
                <FaUserCircle size={24} className="" />
                <span
                  className=" cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  {getDisplayName(user)}
                </span>
              </div>
              <button
                className="border-black border-2 px-3 py-2 rounded-full  flex items-center justify-center gap-4 hover:bg-white hover:text-pink-400 transition-all duration-700"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Header;
