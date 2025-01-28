import React from "react";
import {
  FaShieldAlt,
  FaLock,
  FaClipboardCheck,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container bg-gradient-to-r from-green-100 via-teal-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 lg:p-10">
        <h1 className="text-4xl font-extrabold text-center text-teal-600 dark:text-teal-400 mb-6">
          Privacy Policy
        </h1>

        <div className="text-center mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Your privacy is very important to us. This Privacy Policy explains
            how we collect, use, and protect your personal information when you
            use our app, Cheeta Chat.
          </p>
        </div>

        {/* Information Collection Section */}
        <div className="information-collection mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Information We Collect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="info-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md hover:bg-teal-200 dark:hover:bg-gray-600 transition">
              <FaShieldAlt className="text-4xl text-teal-600 dark:text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Personal Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We collect basic personal information such as your name, email
                address, and profile picture to provide you with a personalized
                experience.
              </p>
            </div>
            <div className="info-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md hover:bg-teal-200 dark:hover:bg-gray-600 transition">
              <FaLock className="text-4xl text-teal-600 dark:text-teal-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Messages and Chats
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We store your messages and chat history to allow you to access
                and manage your conversations across devices securely.
              </p>
            </div>
          </div>
        </div>

        {/* How We Use Your Data Section */}
        <div className="how-we-use-data mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            How We Use Your Data
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We use the data we collect to improve your experience on Cheeta Chat
            and provide a better, more secure messaging service.
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li className="mb-2">To send and receive messages securely.</li>
            <li className="mb-2">
              To personalize your experience and profile.
            </li>
            <li className="mb-2">
              To provide customer support and troubleshoot any issues.
            </li>
            <li className="mb-2">
              To send updates, alerts, or information relevant to our service.
            </li>
          </ul>
        </div>

        {/* Data Protection Section */}
        <div className="data-protection mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            How We Protect Your Data
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We take your privacy seriously and employ strong security measures
            to protect your personal information and data.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="protection-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaClipboardCheck className="text-4xl text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  End-to-End Encryption
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All your messages are encrypted, ensuring that only you and
                  your recipient can read them.
                </p>
              </div>
            </div>
            <div className="protection-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaShieldAlt className="text-4xl text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Secure Data Storage
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data is stored securely using the latest security
                  practices to prevent unauthorized access.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Rights Section */}
        <div className="your-rights mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Your Rights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You have the right to access, correct, or delete your personal
            information, and you can exercise your rights through the settings
            in your account or by contacting our support team.
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li className="mb-2">Access your personal data at any time.</li>
            <li className="mb-2">
              Request the correction or deletion of your data.
            </li>
            <li className="mb-2">
              Withdraw consent for data processing (if applicable).
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="contact-us mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions or concerns about this Privacy Policy or
            how we handle your data, please contact us:
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="contact-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaEnvelope className="text-4xl text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Email Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  For questions, email us at:
                </p>
                <a
                  href="mailto:privacy@cheetachat.com"
                  className="text-teal-600 dark:text-teal-400"
                >
                  privacy@cheetachat.com
                </a>
              </div>
            </div>
            <div className="contact-card p-6 bg-teal-50 dark:bg-gray-700 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaPhoneAlt className="text-4xl text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Phone Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  For immediate concerns, call us at:
                </p>
                <p className="text-teal-600 dark:text-teal-400">
                  +91 9027640571
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
          © 2024 Cheeta Chat. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
