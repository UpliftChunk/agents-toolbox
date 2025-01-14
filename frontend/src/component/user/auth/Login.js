import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  const onSubmit = async (data) => {
    try {
      const response = await axios.post( `${backendUrl}/api/v1/user/login`, data, {
        withCredentials: true, // Important for sending and receiving cookies
      });
      console.log("Login Successful:", response.data);
      const { token, user } = response.data; // Destructure the response
      
      dispatch(setAuth({ token, user })); // Store token and user in Redux
      alert("Login Successful");
      navigate('/explore');

    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border-4 border-gray-300 shadow-lg rounded-lg p-6 max-w-md w-full mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="mb-6 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 flex items-center p-2 border border-gray-300 rounded-md">
            <input
               id="password"
               type={showPassword ? "text" : "password"}
               className="block w-full rounded-md outline-none"
               {...register("password", { required: "Password is required" })}
            />
            <button
               type="button"
               onClick={togglePasswordVisibility}
               className=" text-gray-500 "
            >
               {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
        </div>

        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
