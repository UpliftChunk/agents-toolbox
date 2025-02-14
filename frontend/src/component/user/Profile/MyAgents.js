import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AgentCard from '../../agent/AgentCard';


const MyAgents = () => {
  const [agents, setAgents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  // Log the query parameters every time the URL changes
  useEffect(() => {
    let link = `${backendUrl}/api/v1/my-agents`;
    axios.get(link, {
      withCredentials: true
    })
      .then((response) => {
        console.log("fetched agents"); 
        setAgents(response.data.agents);
        if(response.data?.agents.length>0) setErrorMessage("");
        else setErrorMessage("The user created no agents...");
      })
      .catch((error) => {
        let message = "The user created no agents...";
        setErrorMessage(message);
        console.error("Error fetching agents:", error);
      })
  }, [backendUrl]);


  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {errorMessage && <div className="text-red-500 w-full text-center mt-28 text-xl">{errorMessage}</div>} 
      {agents.length>0 && agents.map((agent) => (
        <AgentCard key={agent._id} agent={agent} />
      ))}
    </div>
  );
};

export default MyAgents