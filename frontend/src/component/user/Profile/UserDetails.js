import React from "react";
import { useSelector } from "react-redux";
import ProfileImg from "../../../images/Profile.png"; // Fallback image

const UserDetails = () => {

  // Fetch user data from Redux state
  const user = useSelector((state) => state.auth.user);

  // Fallback handling for undefined user or avatar
  const avatarUrl = user?.avatar?.url || ProfileImg;
  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt="User Avatar"
        className="w-64 h-64 rounded-full object-cover mb-4 p-1 border-2 border-gray-500"
      />

      {/* User Details */}
      {user ? (
        <div className="w-full max-w-md space-y-4">
          {/* Name Field */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-300 rounded-md">
              {user.name}
            </div>
          </div>

          {/* Email Field */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border border-gray-300 rounded-md">
              {user.email}
            </div>
          </div>

          {/* Joined Date */}
          <p className="text-gray-500 text-sm">Joined on {joinedDate}</p>
        </div>
      ) : (
        <p className="text-gray-500 text-center">User data is not available.</p>
      )}
    </div>
  );
};

export default UserDetails;
