import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";

const AgentDetails = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/agent/${id}`);
        setAgent(response?.data?.agent);
        console.log(response?.data?.agent);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentData();
  }, [id, backendUrl]);

  if (loading) return <div className="flex justify-center items-center p-4 text-2xl">Loading...</div>;
  if (!agent) return <div className="flex justify-center items-center p-4 text-2xl">Agent details not found</div>

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <div className="max-w-5xl w-full">
        {/* Agent Details Header */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8 border-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-semibold text-gray-800">{agent.agent_name}</h1>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 focus:outline-none">
              Buy Now
            </button>
          </div>
          <p className="text-gray-600 text-lg">{agent.description}</p>
        </div>

        {/* Agent Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow-xl rounded-lg p-6 border-2">
            <p className="text-xl font-semibold">Agent Specifications</p>
            <hr className="mb-3 mt-1 border border-gray-500"/>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-semibold">Preferred VM:</span> {agent.specs.vm}</li>
              <li><span className="font-semibold">CPU:</span> {agent.specs.cpu}</li>
              <li><span className="font-semibold">GPU:</span> {agent.specs.gpu}</li>
              <li><span className="font-semibold">Memory:</span> {agent.specs.memory} GB</li>
            </ul>
          </div>

          {/* Agent Pricing & Usage Information */}
          <div className="bg-white shadow-xl rounded-lg p-6 border-2">
            <p className="text-xl font-semibold">Pricing & Usage Information</p>
            <hr className="mb-3 mt-1 border border-gray-500"/>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-semibold">Price per Hour:</span> ${agent.pricePerHour}</li>
              <li><span className="font-semibold">Active Instances:</span> {agent.numOfActiveInstances}</li>
              <li><span className="font-semibold">Total Buys:</span> {agent.totalBuys}</li>
              <li><span className="font-semibold">Rating:</span> {agent.rating}/5</li>
            </ul>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8 border-2">
          <p className="text-xl font-semibold">Use Cases</p>
          <hr className="mb-3 mt-1 border border-gray-500"/>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {agent.usecases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
        </div>

        {/* Footer: Created by Information */}
        <div className="bg-white shadow-xl rounded-lg p-6 border-2">
          <p className="text-sm text-gray-500">Created by <span className="font-semibold">{agent.creatorName}</span> on {new Date(agent.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
