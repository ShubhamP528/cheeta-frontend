import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., sending the data to your backend)
    console.log("Form submitted", formData);
  };

  return (
    <div className="contact-container bg-gradient-to-r from-green-100 via-blue-100 to-indigo-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 lg:p-10">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6">
          Contact Us
        </h1>

        <div className="text-center mb-10">
          {/* <img
            src="https://via.placeholder.com/150" // Replace with your logo or image
            alt="Contact Us"
            className="w-32 h-32 mx-auto mb-4 rounded-full shadow-md"
          /> */}
          <p className="text-lg text-gray-700">
            We’d love to hear from you! Whether you have a question or need
            assistance, feel free to reach out to us.
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="contact-info mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            How to Reach Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="contact-card p-6 bg-indigo-50 rounded-lg shadow-md hover:bg-indigo-200 transition">
              <FaPhoneAlt className="text-4xl text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Phone Support
              </h3>
              <p className="text-gray-600">
                For immediate concerns, call us at:
              </p>
              <p className="text-indigo-600">++91 9027640571</p>
            </div>
            <div className="contact-card p-6 bg-indigo-50 rounded-lg shadow-md hover:bg-indigo-200 transition">
              <FaEnvelope className="text-4xl text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Email Support
              </h3>
              <p className="text-gray-600">
                For general inquiries, email us at:
              </p>
              <a
                href="mailto:support@cheetachat.com"
                className="text-indigo-600"
              >
                support@cheetachat.com
              </a>
            </div>
            <div className="contact-card p-6 bg-indigo-50 rounded-lg shadow-md hover:bg-indigo-200 transition">
              <FaMapMarkerAlt className="text-4xl text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Our Address
              </h3>
              <p className="text-gray-600">Visit us at our headquarters:</p>
              <p className="text-indigo-600">123 Chat Avenue, Suite 100</p>
              <p className="text-indigo-600">City, Country 12345</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-gray-800 text-lg font-medium mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-800 text-lg font-medium mb-2"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-800 text-lg font-medium mb-2"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full p-4 bg-gray-100 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
