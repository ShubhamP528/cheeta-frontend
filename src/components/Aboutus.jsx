import React from "react";
import { FaPhoneAlt, FaEnvelope, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="about-us-container bg-gradient-to-r from-green-100 via-teal-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 lg:p-10">
        <h1 className="text-4xl font-extrabold text-center text-teal-600 dark:text-teal-400 mb-6">
          About Cheeta Chat
        </h1>

        <div className="text-center mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Stay connected with your loved ones and colleagues using Cheeta Chat
            – the fastest and most secure messaging app for real-time
            communication.
          </p>
        </div>

        {/* Features Section */}
        <div className="features mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Why Choose Cheeta Chat?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="feature-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md hover:bg-teal-200 dark:hover:bg-gray-600 transition">
              <FaUsers className="text-4xl text-teal-600 dark:text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Group Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay connected with groups of friends, family, or colleagues in
                real-time, whether for work or fun.
              </p>
            </div>
            <div className="feature-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md hover:bg-teal-200 dark:hover:bg-gray-600 transition">
              <FaPhoneAlt className="text-4xl text-teal-600 dark:text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Voice & Video Calls
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience high-quality voice and video calls, no matter where
                you are in the world.
              </p>
            </div>
            <div className="feature-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md hover:bg-teal-200 dark:hover:bg-gray-600 transition">
              <FaEnvelope className="text-4xl text-teal-600 dark:text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Rich Media Sharing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Send pictures, videos, and audio messages with ease to express
                yourself better.
              </p>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="how-to-use mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            How to Get Started
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Getting started with Cheeta Chat is easy! Simply download the app,
            sign up or log in, and start chatting with your contacts. Our
            intuitive interface makes it simple to send messages, make calls,
            and more.
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
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
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We would love to hear from you! Whether you have a question or need
            support, reach out to us using any of the methods below:
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="contact-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaEnvelope className="text-4xl text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Email Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get in touch with our support team at:
                </p>
                <a
                  href="mailto:support@cheetachat.com"
                  className="text-teal-600 dark:text-teal-400"
                >
                  support@cheetachat.com
                </a>
              </div>
            </div>
            <div className="contact-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaPhoneAlt className="text-4xl text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Phone Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Call us at:</p>
                <p className="text-teal-600 dark:text-teal-400">
                  +91 9027640571
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
