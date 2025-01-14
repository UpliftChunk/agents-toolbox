import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const JobForm = () => {
  const { register, 
          handleSubmit, 
         //  watch, 
          setValue } = useForm();
  const [customCategory, setCustomCategory] = useState(false);

  const categories = [
    "Finance",
    "Writing",
    "Healthcare",
    "Technology",
    "Education",
    "Marketing",
    "Design",
    "Sales",
    "Engineering",
    "Customer Support",
    "OTHERS",
  ];

  // Watch the category field to toggle custom category input
//   const selectedCategory = watch("category");

  const navigate = useNavigate();
  const onSubmit = async(data) => {
    if (customCategory) {
      data.category = data.customCategory; // Use the custom category if "OTHERS" is selected
      delete data.customCategory;
    }
    
    delete data.paymentMode;
    console.log(data); 

    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

    try {
      const response = await axios.post( `${backendUrl}/api/v1/create-job`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      console.log("job created Successfully:", response.data);

      const { job } = response.data; // Destructure the response      

      alert("Job Created Successfully");
      navigate(`/u/job/${job._id}`);
    } catch (error) {
      console.error("Job creation failed:", error);
      alert("Job creation failed. Please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white px-6 pt-2 pb-4 mt-2 border border-gray-400 shadow-md rounded-md space-y-2"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Job Details
      </h2>

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          {...register("title", { required: "Title is required" })}
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          rows="4"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      {/* Payment Mode Field */}
      <div className="flex items-center gap-4">
        <label htmlFor="paymentMode" className="text-sm font-medium text-gray-700">
          Payment Mode
        </label>
        <select
          id="paymentMode"
          {...register("paymentMode", { required: "Payment mode is required" })}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="payPerHour">Pay per Hour</option>
          <option value="payPerRequest">Pay per Request</option>
        </select>
      </div>

      {/* Payment Fields */}
      <div className="flex gap-4">
        <div>
          <label htmlFor="minimumPay" className="block text-sm font-medium text-gray-700">
            Minimum Pay
          </label>
          <input
            id="minimumPay"
            {...register("payment.minimumPay", { required: "Minimum pay is required" })}
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="maximumPay" className="block text-sm font-medium text-gray-700">
            Maximum Pay
          </label>
          <input
            id="maximumPay"
            {...register("payment.maximumPay", { required: "Maximum pay is required" })}
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          {...register("category", { required: "Category is required" })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => {
            setCustomCategory(e.target.value === "OTHERS");
            if (e.target.value !== "OTHERS") {
              setValue("customCategory", ""); // Clear the custom category if not "OTHERS"
            }
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Category Field */}
      {customCategory && (
        <div>
          <label
            htmlFor="customCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Custom Category
          </label>
          <input
            id="customCategory"
            {...register("customCategory", { required: "Custom category is required" })}
            type="text"
            className="my-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default JobForm;
