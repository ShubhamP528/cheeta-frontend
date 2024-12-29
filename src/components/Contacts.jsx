// src/components/ContactList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate from react-router-dom v6
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import img from "./profile.jpg"; // Profile image for contacts
import { NODE_API_ENDPOINT } from "../utils/utils";
import { setChatUserRe } from "../features/chat";

const ContactList = () => {
  const [allContact, setAllContact] = useState([]);
  const currentUser = useSelector((store) => store.user.user);
  const navigate = useNavigate(); // Access the navigate function for navigation
  const dispatch = useDispatch();

  // console.log(allContact);
  console.log(currentUser);

  // Fetch the contacts when the component mounts
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const allUser = await fetch(`${NODE_API_ENDPOINT}/chat/getAllUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!allUser.ok) {
          throw new Error("Error getting the contact");
        }
        const parsedData = await allUser.json();
        const filteredContact = parsedData.filter((contact) => {
          return contact.userId !== currentUser.username; // Exclude current user from contact list
        });
        setAllContact(filteredContact);
      } catch (error) {
        toast.error(error.message || "Error getting the contact");
      }
    };

    if (currentUser.username) {
      getAllUser();
    }
    console.log("API call");
    console.log(currentUser.username);
    console.log(currentUser.username);
  }, [currentUser.username]);

  const handleContactClick = (contact) => {
    // Use navigate function to navigate to the chat page with the selected contact's userId
    dispatch(setChatUserRe(contact));
    navigate(`/chat/${contact.userId}`);
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-blue-200 to-blue-800 min-h-screen p-6 ">
      <div className="text-white font-bold text-3xl mb-6">
        <h1 className="text-slate-500">Contacts</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-4">
          {allContact.map((contact, index) => (
            <div
              key={index}
              className="relative rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transform hover:scale-105 transition duration-300 hover:cursor-pointer"
              onClick={() => handleContactClick(contact)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-50"></div>
              <div className="relative p-4 flex flex-col items-center text-center">
                <img
                  src={contact.profilePicture || img}
                  alt={contact.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <span className="text-xl font-semibold text-gray-800">
                  {contact.name}
                </span>
                <div className="absolute top-2 right-2 text-white text-2xl opacity-75 hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v12l3 3M12 3L9 6m3-3l3 3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
