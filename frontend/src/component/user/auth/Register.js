import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/AuthSlice";
import { useNavigate } from "react-router-dom";

const ErrorComponent = ({ error }) => {
  if (!error) return null;

  // Check if the error starts with "User validation failed"
  if (error.startsWith('User validation failed')) {
    // Remove the "User validation failed: " part
    const errorMessage = error.replace('User validation failed: ', '');

    // Split the error message by commas and then process each key-value pair
    const errorMessages = errorMessage.split(', ').reduce((acc, curr) => {
      const [key, message] = curr.split(': ');
      if (key && message) {
        acc[key] = message;
      }
      return acc;
    }, {});

    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-md">
        {Object.entries(errorMessages).map(([key, message]) => (
          <div key={key} className="text-sm font-medium">
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {message}
          </div>
        ))}
      </div>
    );
  }

  // If error does not start with "User validation failed", return the error as is
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded-md">
      <div className="text-sm font-medium">{error}</div>
    </div>
  );
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const [profileImage, setProfileImage] = useState(null);
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState(null);
   
   const togglePasswordVisibility = () => {
   setShowPassword(!showPassword);
   };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (profileImage) {
        formData.append("avatar", profileImage);
      }

      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
      const response = await axios.post( `${backendUrl}/api/v1/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Registration Successful:", response.data);

      const { token, user } = response.data; // Destructure the response      
      dispatch(setAuth({ token, user })); // Store token and user in Redux

      alert("Registration Successful");
      setError(null);
      navigate('/explore');
    } catch (err) {
      console.error("Registration Error:", err);
      console.log(err.response.data.message);
      setError(err.response.data.message);
      alert("Registration Failed");
    }
  };

  return (
    <div>
      {error && <ErrorComponent error={error}/>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border-4 border-gray-300 shadow-lg rounded-lg p-6 max-w-md w-full mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            id="profileImage"
            type="file"
            className="mt-1 block w-full cursor-pointer"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
