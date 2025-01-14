import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AgentForm = () => {
  const [items, setItems] = useState([]); // State to store usecases
  const [item, setItem] = useState(""); // State to store usecases
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      agent_name: "",
      description: "",
      usecases: [],
      pricePerHour: 5,
      image: {
        name: "",
        tag: "latest"
      },
      specs: {
        vm: "ubuntu",
        cpu: 1,
        gpu: 0,
        memory: 4,
      },
      accessToken: "",
      video: null,
    },
  });

  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  const onSubmit = async(data) => {
    data.usecases = items; // Assign items array to usecases
    delete data.video;
    console.log("Form Data: ", data);


    try {
      const response = await axios.post( `${backendUrl}/api/v1/create-agent`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      console.log("agent created Successfully:", response.data);

      const { agent } = response.data; // Destructure the response      

      alert("Agent Created Successfully");
      navigate(`/agent/${agent._id}`);
    } catch (error) {
      console.error("agent creation failed:", error);
      alert("Agent creation failed. Please try again");
    }
  };

  const addItem = () => {
    console.log("at add Item");
    console.log(item);
    console.log(items);
    const newItem = item;
    if (newItem && !items.includes(newItem)) {
      setItems((prev) => [...prev, newItem]);
      setItem(""); // Clear the input field
    }
    console.log(items);
  };

  const removeItem = (item) => {
    setItems((prev) => prev.filter((i) => i !== item));
  };

  const specsOptions = {
    vm: ["ubuntu", "windows", "macOS", "centOS", "debian"],
    cpu: [1, 2, 4, 8, 16],
    gpu: [0, 1, 2, 4, 8],
    memory: [2, 4, 8, 16, 32, 64],
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-3">
      <form
        className="bg-white shadow-md rounded-lg w-3/4 lg:w-1/2 p-8 space-y-6 border-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Create New Agent
        </h2>

        {/* Agent Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Agent Name
          </label>
          <input
            {...register("agent_name", { required: "Agent name is required" })}
            className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter agent name"
          />
          {errors.agent_name && (
            <p className="text-sm text-red-500 mt-1">{errors.agent_name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter agent description"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Usecases */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Use Cases
          </label>
          <div className="flex items-center space-x-2">
            <input
              name="usecase"
              className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Add a use case"
              value={item}
              onChange={(e)=>setItem(e.target.value)}
            />
            <button
              onClick={addItem}
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-full"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item)}
                  className="ml-2 text-gray-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <hr className="border border-gray-400"/>
        
        {/* Image details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Image details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image name
              </label>
              <input
                {...register("image.name", { required: "image name is required" })}
                className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Enter docker image name"
              />
              {errors.image?.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.image?.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                tag
              </label>
              <input
                {...register("image.tag", { required: "tag is required" })}
                className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.image?.tag && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.image?.tag.message}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Access Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Access Token
          </label>
          <input
            {...register("accessToken", { required: "Access token is required" })}
            className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter access token"
          />
          {errors.accessToken && (
            <p className="text-sm text-red-500 mt-1">{errors.accessToken.message}</p>
          )}
        </div>

        <hr className="border border-gray-400"/>

        {/* Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Specifications</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(specsOptions).map(([key, options]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {
                    (key==="vm")?("Preferred "+key):(key)
                  }
                </label>
                <select
                  {...register(`specs.${key}`)}
                  className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <hr className="border border-gray-400"/>

        {/* Price Per Hour */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price Per Hour ($)
          </label>
          <input
            {...register("pricePerHour", { required: "Price is required" })}
            type="number"
            className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          {errors.pricePerHour && (
            <p className="text-sm text-red-500 mt-1">{errors.pricePerHour.message}</p>
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Video
          </label>
          <input
            {...register("video")}
            type="file"
            accept="video/*"
            className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AgentForm;
