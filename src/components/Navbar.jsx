import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/auth";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user.user);
  const location = useLocation();

  // Sync dark mode with localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Hide Navbar on specific routes
  if (location.pathname.startsWith("/chat/")) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-teal-700 to-cyan-800 dark:from-gray-800 dark:to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link
            to="/"
            className="text-white font-bold text-2xl tracking-wide hover:text-teal-300 dark:hover:text-gray-300 transition-colors"
          >
            Cheeta
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser?.email ? (
              <>
                <Link
                  to="/"
                  className="px-4 py-2 text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-lg shadow-md transition-all"
                >
                  Home
                </Link>
                <Link
                  to="/contact-list"
                  className="px-4 py-2 text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-lg shadow-md transition-all"
                >
                  Chats
                </Link>
                <Link
                  to="/profile"
                  className="px-4 py-2 text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-lg shadow-md transition-all"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-lg shadow-md transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-lg shadow-md transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-lg shadow-md transition-all"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Right Section: Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden md:block text-white hover:bg-teal-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-lg px-4 py-2 shadow-md transition-all focus:outline-none"
            >
              {isDarkMode ? (
                <FaSun className="h-6 w-6" />
              ) : (
                <FaMoon className="h-6 w-6" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:bg-teal-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-lg px-4 py-2 shadow-md transition-all"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-teal-700 dark:bg-gray-800 relative">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {currentUser?.email ? (
              <>
                <Link
                  to="/"
                  onClick={toggleMobileMenu}
                  className="block text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-md px-3 py-2 text-base font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/contact-list"
                  onClick={toggleMobileMenu}
                  className="block text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-md px-3 py-2 text-base font-medium"
                >
                  Chats
                </Link>
                <Link
                  to="/profile"
                  onClick={toggleMobileMenu}
                  className="block text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-md px-3 py-2 text-base font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-md px-3 py-2 text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="block text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-md px-3 py-2 text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMobileMenu}
                  className="block text-white hover:bg-teal-500 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-md px-3 py-2 text-base font-medium"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Dark Mode Button at Bottom-Right */}
          <button
            onClick={toggleDarkMode}
            className="absolute bottom-4 right-4 text-white hover:bg-teal-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 rounded-full p-4 shadow-md transition-all"
          >
            {isDarkMode ? (
              <FaSun className="h-6 w-6" />
            ) : (
              <FaMoon className="h-6 w-6" />
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
