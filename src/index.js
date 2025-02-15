import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store";
import Chat from "./components/Chat";
import { SocketProvider } from "./context/SocketProvider";
import Contacts from "./components/Contacts";
import AboutUs from "./components/Aboutus";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermAndCondition";
import ContactUs from "./components/ContactUs";
import CallingPage from "./components/CallingPage";
import VideoCallPage from "./components/VideoCalling";
import AudioCalling from "./components/AudioCalling";
import ProfilePage from "./components/ProfilePage";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    // errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/contact-list",
        element: <Contacts />,
      },
      {
        path: "/calling",
        element: <CallingPage />,
      },
      {
        path: "/videoCalling",
        element: <VideoCallPage />,
      },
      {
        path: "/audioCalling",
        element: <AudioCalling />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/chat/:contactId",
        element: (
          <SocketProvider>
            <Chat />
          </SocketProvider>
        ),
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/term-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </GoogleOAuthProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
