import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { login } from "../features/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${NODE_API_ENDPOINT}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
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

  const responseGoogle = async (response) => {
    console.log("Google response:", response);
    if (response.credential) {
      const token = response.credential;
      setLoading(true);
      const resp = await fetch(`${NODE_API_ENDPOINT}/auth/google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (!resp.ok) {
        setLoading(false);
        throw new Error("Invalid credentials");
      }
      setLoading(false);
      const data = await resp.json();
      dispatch(login(data));
      toast.success("Logged in successfully!");
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
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
              "Sign Up"
            )}
          </button>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
        <div className="flex justify-center space-x-4 mb-4 mt-6">
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
            <GoogleLogin
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

export default Signup;
