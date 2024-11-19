// src/components/Navbar.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user.user);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-2xl">
              Cheeta
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-200 hover:text-white">
              Home
            </Link>
            <Link to="/contact-list" className="text-gray-200 hover:text-white">
              Chats
            </Link>
            <Link to="/profile" className="text-gray-200 hover:text-white">
              Profile
            </Link>
            {currentUser.email ? (
              <>
                <span className="text-gray-200">Hello, {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-200 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-200 hover:text-white">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-200 hover:text-white">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Profile & Mobile Menu Button */}
          <div className="flex items-center">
            {currentUser.email && (
              <div className="relative flex items-center text-white">
                <span className="mr-2">{currentUser.name}</span>
                <button className="focus:outline-none">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser.profilePicture} // Replace with actual profile image
                    alt="User profile"
                    loading="lazy"
                  />
                </button>
              </div>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-200 hover:text-white focus:outline-none ml-4"
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
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/contact-list"
              className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMobileMenu}
            >
              Chats
            </Link>
            <Link
              to="/profile"
              className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMobileMenu}
            >
              Profile
            </Link>
            {currentUser.email ? (
              <>
                <span className="block text-gray-200 px-3 py-2 rounded-md text-base font-medium">
                  Hello, {currentUser.name}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMobileMenu}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
