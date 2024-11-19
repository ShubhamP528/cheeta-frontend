import { Outlet, useLocation } from "react-router-dom"; // useLocation to get the current route
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { retrieveAuth } from "./features/auth";

function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Get current location

  useEffect(() => {
    dispatch(retrieveAuth());
  }, [dispatch]);

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
