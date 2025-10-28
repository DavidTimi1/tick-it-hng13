import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext.jsx";
import MenuIcon from "../assets/menu.svg";
import CloseIcon from "../assets/close.svg";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-[90rem] mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-green-700">
          Tick-it
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-4 text-gray-700">
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/auth/login"
                  className=" hover:text-green-600 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/" className=" hover:text-green-600 transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className=" hover:text-green-600 transition"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tickets"
                  className=" hover:text-green-600 transition"
                >
                  Tickets
                </NavLink>
              </li>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </ul>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden flex items-center p-2 text-gray-700 hover:text-green-600 transition"
        >
          <img
            src={MenuIcon}
            alt="Menu icon"
            className={`w-6 h-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
          />
          <img
            src={CloseIcon}
            alt="Close icon"
            className={`w-6 h-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-white shadow-md`}
      >
        <ul className="flex flex-col items-center p-4 space-y-4">
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/auth/login"
                  className="text-gray-700 hover:text-green-600 transition py-2"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition my-2"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/"
                  className=" hover:text-green-600 transition py-2"
                  onClick={toggleMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className=" hover:text-green-600 transition py-2"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tickets"
                  className=" hover:text-green-600 transition py-2"
                  onClick={toggleMobileMenu}
                >
                  Tickets
                </NavLink>
              </li>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition my-2"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
