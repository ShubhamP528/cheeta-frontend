import React from "react";
import { FaPhoneAlt, FaEnvelope, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="about-us-container bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-6 lg:p-10">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6">
          About Cheeta Chat
        </h1>

        <div className="text-center mb-10">
          {/* <img
            src="https://via.placeholder.com/150" // Placeholder for app logo or an image
            alt="Cheeta Chat Logo"
            className="w-32 h-32 mx-auto mb-4 rounded-full shadow-md"
          /> */}
          <p className="text-lg text-gray-700">
            Stay connected with your loved ones and colleagues using Cheeta Chat
            – the fastest and most secure messaging app for real-time
            communication.
          </p>
        </div>

        {/* Features Section */}
        <div className="features mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Why Choose Cheeta Chat?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="feature-card p-6 bg-indigo-50 rounded-lg shadow-md hover:bg-indigo-200 transition">
              <FaUsers className="text-4xl text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Group Chat
              </h3>
              <p className="text-gray-600">
                Stay connected with groups of friends, family, or colleagues in
                real-time, whether for work or fun.
              </p>
            </div>
            <div className="feature-card p-6 bg-indigo-50 rounded-lg shadow-md hover:bg-indigo-200 transition">
              <FaPhoneAlt className="text-4xl text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Voice & Video Calls
              </h3>
              <p className="text-gray-600">
                Experience high-quality voice and video calls, no matter where
                you are in the world.
              </p>
            </div>
            <div className="feature-card p-6 bg-indigo-50 rounded-lg shadow-md hover:bg-indigo-200 transition">
              <FaEnvelope className="text-4xl text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Rich Media Sharing
              </h3>
              <p className="text-gray-600">
                Send pictures, videos, and audio messages with ease to express
                yourself better.
              </p>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="how-to-use mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            How to Get Started
          </h2>
          <p className="text-gray-700 mb-4">
            Getting started with Cheeta Chat is easy! Simply download the app,
            sign up or log in, and start chatting with your contacts. Our
            intuitive interface makes it simple to send messages, make calls,
            and more.
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li className="mb-2">
              Sign up using your email or social media account.
            </li>
            <li className="mb-2">
              Add contacts manually or sync from your phone contacts.
            </li>
            <li className="mb-2">
              Start chatting instantly via text, audio, or video.
            </li>
            <li className="mb-2">
              Customize your profile and settings to fit your preferences.
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="contact-us mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            We would love to hear from you! Whether you have a question or need
            support, reach out to us using any of the methods below:
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="contact-card p-6 bg-indigo-50 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaEnvelope className="text-4xl text-indigo-600" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800">
                  Email Support
                </h3>
                <p className="text-gray-600">
                  Get in touch with our support team at:
                </p>
                <a
                  href="mailto:support@cheetachat.com"
                  className="text-indigo-600"
                >
                  support@cheetachat.com
                </a>
              </div>
            </div>
            <div className="contact-card p-6 bg-indigo-50 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaPhoneAlt className="text-4xl text-indigo-600" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800">
                  Phone Support
                </h3>
                <p className="text-gray-600">Call us at:</p>
                <p className="text-indigo-600">+91 9027640571</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
