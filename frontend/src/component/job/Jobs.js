import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    // Fetch previous jobs from link.1
    axios.get(`${backendUrl}/api/v1/my-jobs`,{
      withCredentials: true
    })
      .then((response) => {
        setJobs(response.data.jobs); // Assuming the response contains an array of jobs
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, [backendUrl]);

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="w-1/2 space-y-6 p-6 rounded-lg border-4 shadow-lg">
        {/* Section 1: Button */}
        <div className="flex justify-center">
          <Link to={'/u/create-job'}>
            <div className="w-fit bg-green-600 text-white text-2xl px-4 py-2 rounded-lg hover:bg-green-700 transition ">
            <div className="flex justify-center items-center gap-2">
              <IoIosAddCircleOutline className="scale-125 mt-[2px]"/> 
              <div>
                Create Job Post
              </div>
            </div>
            </div>
          </Link>

        </div>

        {/* Section 2: Previous Jobs */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-black pb-2">
            Previous Jobs
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <ul className="space-y-4 rounded-md ">
              {jobs.map((job, index) => (
                <Link to={`/u/job/${job._id}`} key={index}>
                  <li
                    key={index}
                    className="my-1 flex justify-between items-center bg-white p-4 rounded-lg shadow border border-gray-400 hover:scale-[1.03] hover:border-black transition-all"
                  >
                    {/* Job Details */}
                    <div>
                      <h3 className="text-lg font-medium">{job.title}</h3>
                      <p className="text-gray-600 line-clamp-1">{job.description}</p>
                    </div>
                    {/* Job Status */}
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        job.status === "Open"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No previous jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
