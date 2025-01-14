import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import AgentCard from './AgentCard';


const AllAgents = () => {
  const [agents, setAgents] = useState([]);
  const keyword = useSelector((state) => state.keyword);
  const [errorMessage, setErrorMessage] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  // Log the query parameters every time the URL changes
  useEffect(() => {
    let link =  `${backendUrl}/api/v1/agents`;
    if(keyword !== ''){
      link+= `?keyword=${keyword}`;
    }

    axios.get(link)
      .then((response) => {
        console.log("fetched agents"); 
        setAgents(response.data.agents);
        setErrorMessage("");
      })
      .catch((error) => {
        let message = "No agents found";
        if(keyword) message += ` related to ${keyword}`;
        message += "...";
        setErrorMessage(message);
        console.error("Error fetching agents:", error);
      })
  }, [keyword, backendUrl]);


  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {errorMessage && <div className="text-red-500 w-full text-center">{errorMessage}</div>} 
      {agents.length>0 && agents.map((agent) => (
        <AgentCard key={agent._id} agent={agent} />
      ))}
    </div>
  );
};

export default AllAgents