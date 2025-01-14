
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AgentCard from './AgentCard';
import { setKeyword } from '../../features/KeywordSlice';
import { useDispatch } from 'react-redux';


const ExplorePageAgents = () => {
  const [agents, setAgents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";


  // Log the query parameters every time the URL changes
  useEffect(() => {
    dispatch(setKeyword(""));  
    let link =  `${backendUrl}/api/v1/agents`;
    axios.get(link)
      .then((response) => {
        console.log("fetched agents"); 
        setAgents(response.data.agents);
        setErrorMessage("");
      })
      .catch((error) => {
        let message = "No agents found...";
        setErrorMessage(message);
        console.error("Error fetching agents:", error);
      })
  }, [dispatch, backendUrl]);


  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {errorMessage && <div className="text-red-500 w-full text-center">{errorMessage}</div>} 
      {agents.length>0 && agents.map((agent) => (
        <AgentCard key={agent._id} agent={agent} />
      ))}
    </div>
  );
};

export default ExplorePageAgents