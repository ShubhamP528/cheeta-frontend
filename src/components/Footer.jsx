// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8 mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-2xl font-bold">Cheeta</span>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-4 text-sm mb-4 md:mb-0">
            <Link to="/about" className="hover:text-gray-200">
              About Us
            </Link>
            <Link to="/privacy-policy" className="hover:text-gray-200">
              Privacy Policy
            </Link>
            <Link to="/term-and-conditions" className="hover:text-gray-200">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24h11.494v-9.294H9.691v-3.62h3.129V8.412c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.917.001c-1.504 0-1.794.715-1.794 1.76v2.31h3.587l-.467 3.62h-3.12V24h6.116c.733 0 1.326-.593 1.326-1.326V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.918 4.918 0 00-8.384 4.482 13.955 13.955 0 01-10.141-5.148 4.92 4.92 0 001.523 6.573 4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.946 4.89a4.934 4.934 0 01-2.224.085 4.93 4.93 0 004.6 3.417 9.867 9.867 0 01-6.1 2.105c-.395 0-.787-.023-1.175-.067a13.94 13.94 0 007.548 2.212c9.056 0 14.002-7.506 14.002-14.002 0-.213-.005-.426-.014-.637A10.025 10.025 0 0024 4.557z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.306.974.975 1.244 2.242 1.306 3.608.058 1.266.068 1.646.068 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.306 3.608-.975.974-2.242 1.244-3.608 1.306-1.266.058-1.646.068-4.85.068s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.306-.974-.975-1.244-2.242-1.306-3.608-.058-1.266-.068-1.646-.068-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.306-3.608.975-.974 2.242-1.244 3.608-1.306 1.266-.058 1.646-.068 4.85-.068m0-2.163C8.755 0 8.329.012 7.053.07 5.481.135 4.05.635 3.002 1.684.954 3.732.454 5.163.388 6.735.33 8.011.318 8.437.318 12c0 3.563.012 3.989.07 5.265.066 1.572.566 3.003 1.614 4.051 1.048 1.048 2.479 1.548 4.051 1.614 1.276.058 1.702.07 5.265.07 3.563 0 3.989-.012 5.265-.07 1.572-.066 3.003-.566 4.051-1.614 1.048-1.048 1.548-2.479 1.614-4.051.058-1.276.07-1.702.07-5.265 0-3.563-.012-3.989-.07-5.265-.066-1.572-.566-3.003-1.614-4.051-1.048-1.048-2.479-1.548-4.051-1.614-1.276-.058-1.702-.07-5.265-.07z" />
                <circle cx="12" cy="12" r="3.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} ChatApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
