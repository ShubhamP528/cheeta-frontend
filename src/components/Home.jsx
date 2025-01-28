import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../features/auth";

const Home = () => {
  const currentUser = useSelector((store) => store.user.user);

  return (
    <div className="bg-gradient-to-r from-teal-600 to-cyan-800 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col items-center justify-center px-4">
      {/* Welcome Section */}
      <section className="text-center max-w-2xl py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Welcome to ChatApp
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Connect with friends and family effortlessly. Start conversations,
          join voice and video calls, and stay connected—all in one place!
        </p>
        {!currentUser.email && (
          <div className="flex justify-center space-x-4">
            <Link to="/signup">
              <button className="bg-cyan-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-cyan-600 transition">
                Get Started
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-gray-300 text-cyan-600 px-6 py-3 rounded-md shadow-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition">
                Log In
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mt-16 w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          What You Can Do
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="h-12 w-12 text-cyan-600 dark:text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Instant Messaging
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start real-time conversations with friends anytime.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="h-12 w-12 text-cyan-600 dark:text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.28 4.28a1 1 0 010 1.42l-4.28 4.28m0 0L10 15m5-5l-4.28-4.28a1 1 0 00-1.42 0L5 10m0 0l4.28 4.28"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Voice and Video Calls
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enjoy high-quality calls to stay connected in real-time.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="h-12 w-12 text-cyan-600 dark:text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h18v18H3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Personalized Profiles
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Build your profile and let friends connect with you.
            </p>
          </div>
        </div>
      </section>

      {/* Welcome/Sign-up Section */}
      {currentUser.email ? (
        <section className="mt-16 mb-8 w-full max-w-4xl bg-cyan-600 text-white rounded-lg p-8 text-center shadow-md">
          <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
          <p className="text-lg mb-6">
            Start chatting or make a call to your friends now!
          </p>
          <Link to="/contact-list">
            <button className="bg-white text-cyan-600 px-8 py-3 rounded-md shadow-md hover:bg-gray-200 transition">
              Go to Chats
            </button>
          </Link>
        </section>
      ) : (
        <section className="mt-16 mb-8 w-full max-w-4xl bg-cyan-600 text-white rounded-lg p-8 text-center shadow-md">
          <h2 className="text-3xl font-semibold mb-4">Join ChatApp Today!</h2>
          <p className="text-lg mb-6">
            Sign up and start connecting with people from all over the world.
          </p>
          <Link to="/signup">
            <button className="bg-white text-cyan-600 px-8 py-3 rounded-md shadow-md hover:bg-gray-200 transition">
              Create an Account
            </button>
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;
