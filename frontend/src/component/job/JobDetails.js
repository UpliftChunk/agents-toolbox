import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    // Fetch job details
    axios
      .get(`${backendUrl}/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setJob(response.data?.job);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch job details. Please try again later.");
        setLoading(false);
      });
  }, [id, backendUrl]);

  if (loading) {
    return <div className="text-center mt-8">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg px-8 py-2 my-2 border border-gray-400">
      {/* Job Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 underline">{job.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          Posted on: {new Date(job.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Category and Description */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Category</h2>
          <p className="text-gray-600 bg-gray-200 p-3 rounded-md">{job.category}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Status</h2>
          <p
            className={`text-white py-3 px-3 rounded-md text-center ${
              job.status === "Open" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {job.status}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-600 bg-gray-200 p-4 rounded-md">{job.description}</p>
      </div>

      {/* Payment Info */}
      <div className="gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Payment Range</h2>
          <p className="text-gray-600 bg-gray-200 p-3 rounded-md">
            ${job.payment.minimumPay} to ${job.payment.maximumPay}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h2>
        <div className="bg-gray-200 p-4 rounded-md">
          <p className="text-gray-600">
            <span className="font-semibold">Name:</span> {job.contact_info.name}
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Email:</span> {job.contact_info.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
