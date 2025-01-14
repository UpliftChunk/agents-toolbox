import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Default to Login
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to get and set query params

  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "register") {
      setIsLogin(false); // Set to Register if action is 'register'
    } else {
      setIsLogin(true); // Default to Login
    }
  }, [searchParams]);

  const toggleAction = (toLogin) => {
    setIsLogin(toLogin);
    setSearchParams({ action: toLogin ? "login" : "register" }); // Update the action query parameter
  };

  return (
    <div className="flex flex-col items-center pt-10 px-4">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`text-lg px-6 py-2 rounded-t-lg ${
            isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => toggleAction(true)} // Set to Login
        >
          Login
        </button>
        <button
          className={`text-lg px-6 py-2 rounded-t-lg ${
            !isLogin ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => toggleAction(false)} // Set to Register
        >
          Register
        </button>
      </div>
      {/* Conditionally Render Login or Register Component */}
      <div className="w-full max-w-lg">
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default LoginRegister;
