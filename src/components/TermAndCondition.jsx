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
    <div className="terms-conditions-container bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 lg:p-10">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6">
          Terms and Conditions
        </h1>

        <div className="text-center mb-10">
          {/* <img
            src="https://via.placeholder.com/150" // Replace with your logo or image
            alt="Terms and Conditions"
            className="w-32 h-32 mx-auto mb-4 rounded-full shadow-md"
          /> */}
          <p className="text-lg text-gray-700">
            Please read these Terms and Conditions carefully before using the
            Cheeta Chat service. By using our app, you agree to comply with
            these terms and conditions.
          </p>
        </div>

        {/* Terms of Use Section */}
        <div className="terms-of-use mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Terms of Use
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="term-card p-6 bg-indigo-50 rounded-lg shadow-md hover:bg-indigo-200 transition">
              <FaUsers className="text-4xl text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                User Eligibility
              </h3>
              <p className="text-gray-600">
                You must be at least 13 years of age to use Cheeta Chat. By
                using our service, you confirm that you meet the minimum age
                requirement.
              </p>
            </div>
            <div className="term-card p-6 bg-indigo-50 rounded-lg shadow-md hover:bg-indigo-200 transition">
              <FaGavel className="text-4xl text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Acceptable Use
              </h3>
              <p className="text-gray-600">
                You agree not to use Cheeta Chat for illegal activities,
                harassment, or any activities that violate the rights of others.
              </p>
            </div>
          </div>
        </div>

        {/* Account Responsibility Section */}
        <div className="account-responsibility mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Account Responsibility
          </h2>
          <p className="text-gray-700 mb-4">
            You are responsible for maintaining the confidentiality of your
            account information, including your username and password. You agree
            to notify us immediately if you suspect any unauthorized use of your
            account.
          </p>
        </div>

        {/* Privacy and Data Section */}
        <div className="privacy-and-data mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Privacy and Data
          </h2>
          <p className="text-gray-700 mb-4">
            We respect your privacy and handle your data in accordance with our
            Privacy Policy. Please refer to our Privacy Policy to understand how
            your data is collected, used, and stored.
          </p>
          <a href="/privacy-policy" className="text-indigo-600 hover:underline">
            Read our Privacy Policy here.
          </a>
        </div>

        {/* Termination Section */}
        <div className="termination mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Termination of Account
          </h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to suspend or terminate your account if we
            believe you have violated these Terms and Conditions. This includes,
            but is not limited to, engaging in harmful or unlawful activity.
          </p>
        </div>

        {/* Limitation of Liability Section */}
        <div className="limitation-of-liability mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            In no event shall Cheeta Chat or its affiliates be liable for any
            damages arising from the use or inability to use our service,
            including, but not limited to, loss of data or profits.
          </p>
        </div>

        {/* Indemnity Section */}
        <div className="indemnity mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Indemnity
          </h2>
          <p className="text-gray-700 mb-4">
            You agree to indemnify and hold harmless Cheeta Chat, its
            affiliates, employees, and contractors from any claims, damages, or
            liabilities arising from your use of the service or violation of
            these Terms and Conditions.
          </p>
        </div>

        {/* Governing Law Section */}
        <div className="governing-law mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Governing Law
          </h2>
          <p className="text-gray-700 mb-4">
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of the jurisdiction where Cheeta Chat
            operates.
          </p>
        </div>

        {/* Changes to Terms Section */}
        <div className="changes-to-terms mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Changes to Terms
          </h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify these Terms and Conditions at any
            time. Changes will be communicated via email or a notification in
            the app.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="contact-info mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Contact Information
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us at:
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="contact-card p-6 bg-indigo-50 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/3">
              <FaEnvelope className="text-4xl text-indigo-600" />
              <div>
                <h3 className="font-semibold text-xl text-gray-800">
                  Email Support
                </h3>
                <p className="text-gray-600">For inquiries, email us at:</p>
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
                <p className="text-gray-600">
                  For immediate concerns, call us at:
                </p>
                <p className="text-indigo-600">+91 9027640571</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 mt-10">
          © 2024 Cheeta Chat. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
