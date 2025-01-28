import React from "react";
import {
  FaGavel,
  FaUsers,
  FaShieldAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const TermsAndConditions = () => {
  return (
    <div className="terms-conditions-container bg-gradient-to-b from-teal-600 to-cyan-800 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 lg:p-10">
        <h1 className="text-4xl font-extrabold text-center text-teal-500 dark:text-teal-400 mb-6">
          Terms and Conditions
        </h1>

        <div className="text-center mb-10">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Please read these Terms and Conditions carefully before using the
            Cheeta Chat service. By using our app, you agree to comply with
            these terms and conditions.
          </p>
        </div>

        {/* Terms of Use Section */}
        <div className="terms-of-use mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Terms of Use
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="term-card p-6 bg-teal-50 dark:bg-teal-900 rounded-lg shadow-md hover:bg-teal-200 dark:hover:bg-teal-700 transition">
              <FaUsers className="text-4xl text-teal-500 dark:text-teal-300 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                User Eligibility
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You must be at least 13 years of age to use Cheeta Chat. By
                using our service, you confirm that you meet the minimum age
                requirement.
              </p>
            </div>
            <div className="term-card p-6 bg-teal-50 dark:bg-teal-900 rounded-lg shadow-md hover:bg-teal-200 dark:hover:bg-teal-700 transition">
              <FaGavel className="text-4xl text-teal-500 dark:text-teal-300 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Acceptable Use
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You agree not to use Cheeta Chat for illegal activities,
                harassment, or any activities that violate the rights of others.
              </p>
            </div>
          </div>
        </div>

        {/* Account Responsibility Section */}
        <div className="account-responsibility mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Account Responsibility
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You are responsible for maintaining the confidentiality of your
            account information, including your username and password. You agree
            to notify us immediately if you suspect any unauthorized use of your
            account.
          </p>
        </div>

        {/* Privacy and Data Section */}
        <div className="privacy-and-data mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Privacy and Data
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We respect your privacy and handle your data in accordance with our
            Privacy Policy. Please refer to our Privacy Policy to understand how
            your data is collected, used, and stored.
          </p>
          <a
            href="/privacy-policy"
            className="text-teal-500 dark:text-teal-300 hover:underline"
          >
            Read our Privacy Policy here.
          </a>
        </div>

        {/* Contact Information Section */}
        <div className="contact-info mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Contact Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us at:
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="contact-card p-6 bg-teal-50 dark:bg-teal-900 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaEnvelope className="text-4xl text-teal-500 dark:text-teal-300" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Email Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  For inquiries, email us at:
                </p>
                <a
                  href="mailto:support@cheetachat.com"
                  className="text-teal-500 dark:text-teal-300"
                >
                  support@cheetachat.com
                </a>
              </div>
            </div>
            <div className="contact-card p-6 bg-teal-50 dark:bg-teal-900 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaPhoneAlt className="text-4xl text-teal-500 dark:text-teal-300" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Phone Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  For immediate concerns, call us at:
                </p>
                <p className="text-teal-500 dark:text-teal-300">
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

export default TermsAndConditions;
