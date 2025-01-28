import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../features/auth";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { ColorRing } from "react-loader-spinner";
import { GoogleLogin } from "@react-oauth/google"; // Import from react-oauth/google

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [gLoading, setgLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${NODE_API_ENDPOINT}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      dispatch(login(data));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.open(`${NODE_API_ENDPOINT}/auth/google`, "_self"); // Redirect to Google Auth route
  };

  const responseGoogle = async (response) => {
    console.log("Google response:", response); // Log the entire Google response object

    if (response.credential) {
      const token = response.credential;
      setgLoading(true);

      // Send the token to the backend for validation
      const resp = await fetch(`${NODE_API_ENDPOINT}/auth/google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // Send token as JSON body
      });

      if (!resp.ok) {
        setgLoading(false);
        throw new Error("Invalid credentials");
      }
      setgLoading(false);
      const data = await resp.json();
      dispatch(login(data));
      toast.success("Logged in successfully!");
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-teal-800 dark:bg-gray-800">
      <div className="w-full max-w-md bg-teal-900 dark:bg-gray-900 text-black dark:text-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white dark:text-blue-400">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:text-white"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex justify-center items-center dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperClass="flex justify-center"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              "Login"
            )}
          </button>
          <p className="text-center text-white mt-4 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-gray-300 hover:underline dark:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </form>
        <div className="flex justify-center space-x-4 mb-4 mt-6">
          {gLoading ? (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperClass="flex justify-center"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            <GoogleLogin
              text="Login with Google"
              shape="circular"
              onSuccess={responseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
