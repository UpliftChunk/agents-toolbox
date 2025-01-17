import React, { useState } from "react";
import axios from "axios";

import { Link } from 'react-router-dom';

const AgentCard = ({ agent }) => {
  return (
    <div className="rounded-lg shadow-lg p-4 bg-white w-64 border border-gray-300 transform transition-all duration-300 hover:scale-105">
      {/* Non-button content div */}
      <Link to={`agent/${agent.agent_id}`}>
        {/* <h2 className="text-xl font-bold mb-2">{agent.agent_name}</h2> */}
        <h2 className="text-xl font-bold mb-2">Agent</h2>
        <p 
          className="text-sm text-gray-700 mb-4 line-clamp-2" 
          style={{ minHeight: '3rem', lineHeight: '1.5rem' }}
        >
          {agent.description}
        </p>

        <div className="flex items-center justify-between">
          <span >Category: {agent.category}</span>
          <span className="text-green-600 font-bold">${agent.price}/hr</span>
        </div>
      </Link>

      {/* Button div */}
      <div className='mt-4'>
        <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Buy
        </button>
      </div>
    </div>
  );
};


const RecommendAgentsForAJob = ({jobId}) => {

  const [agents, setAgents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleRequest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/suggest_agents/${jobId}`
      );
      console.log("Response:", response.data);
      setAgents(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAgents([]);
      setErrorMessage(error?.response?.message);
    }
  };
  handleRequest();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Suggest Agents</h1>
      <div className="flex flex-wrap gap-6 justify-center p-6">
         {errorMessage && <div className="text-red-500 w-full text-center">{errorMessage}</div>} 
         {agents.length>0 && agents.map((agent) => (
            <AgentCard key={agent.agent_id} agent={agent} />
         ))}
      </div>
    </div>
  );
};

export default RecommendAgentsForAJob;
