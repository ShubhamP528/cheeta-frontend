import { Outlet, useLocation } from "react-router-dom"; // useLocation to get the current route
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { retrieveAuth } from "./features/auth";
import { NODE_API_ENDPOINT } from "./utils/utils";

function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Get current location

  useEffect(() => {
    dispatch(retrieveAuth());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${NODE_API_ENDPOINT}/chat/hii`, {
          method: "GET",
        });
        console.log(response);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 10 minutes
    const interval = setInterval(fetchData, 1 * 60 * 1000);

    // Cleanup function to clear interval
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once

  // Don't render Footer on the chat page
  const shouldShowFooter = !location.pathname.startsWith("/chat");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ToastContainer />
      <main className="flex-1">
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;
