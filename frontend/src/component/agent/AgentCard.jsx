// src/components/AgentCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AgentCard = ({ agent }) => {
  return (
    <div className="rounded-lg shadow-lg p-4 bg-white w-64 border border-gray-300 transform transition-all duration-300 hover:scale-105">
      {/* Non-button content div */}
      <Link to={`agent/${agent._id}`}>
        <h2 className="text-xl font-bold mb-2">{agent.agent_name}</h2>
        <p className="text-sm text-gray-700 mb-1">
           Created by: {agent.creatorName}
        </p>
        <p 
          className="text-sm text-gray-700 mb-4 line-clamp-2" 
          style={{ minHeight: '3rem', lineHeight: '1.5rem' }}
        >
          {agent.usecases.length > 0
            ? `Use Cases: ${agent.usecases.join(', ')}`
            : agent.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-bold">Rating: {agent.rating}⭐</span>
          <span className="text-green-600 font-bold">${agent.pricePerHour}/hr</span>
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

export default AgentCard;
