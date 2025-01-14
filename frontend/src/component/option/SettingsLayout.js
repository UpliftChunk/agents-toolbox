import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const SettingsLayout = () => {
  return (
    <div className="h-full flex gap-2">
      {/* Sidebar */}
      <div className="w-1/5 h-full bg-gray-200 p-4">
        <nav className="space-y-4">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg border-y border-gray-400 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-300"
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="my-agents"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg border-y border-gray-400 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-300"
              }`
            }
          >
            My Agents
          </NavLink>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg border-y border-gray-400 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-300"
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
