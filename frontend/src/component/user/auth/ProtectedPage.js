import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const ProtectedPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="h-full flex flex-col justify-center items-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Please login to access this page
          </h2>
          <div className="flex space-x-4 justify-center">
            <Link
              to="/account?action=login"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/account?action=register"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
      <Outlet />
  );
};

export default ProtectedPage;
