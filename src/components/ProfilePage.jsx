import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user); // Assuming the user data is in Redux
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  console.log(user);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Call your update API or dispatch an action to update the user info in Redux
    // After saving data, you can show a success message.
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500  to-teal-500 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl bg-green-300 bg-transparent dark:bg-gray-900 rounded-3xl shadow-xl p-8 space-y-6">
        {/* Profile Header */}
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-lg">
            <img
              src={user?.profilePicture || "/default-profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          {/* User Name */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {user?.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user?.email}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user?.phone}
          </p>
        </div>

        {/* User Info Form (Editable Mode) */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            ) : (
              <p className="mt-2 text-xl text-gray-800 dark:text-white">
                {user?.name}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            ) : (
              <p className="mt-2 text-xl text-gray-800 dark:text-white">
                {user?.email}
              </p>
            )}
          </div>

          {/* <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Phone
            </label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleChange}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            ) : (
              <p className="mt-2 text-xl text-gray-800 dark:text-white">
                {user?.phone}
              </p>
            )}
          </div> */}
        </div>

        {/* Buttons (Edit/Save/Cancel) */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleEditClick}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-xl shadow-md w-32 transition dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl shadow-md w-32 transition dark:bg-green-600 dark:hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
