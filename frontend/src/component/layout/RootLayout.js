import React, { useEffect, useState } from 'react'
import Navbar from './RootNavbar.js';
import Footer from './RootFooter.js';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Loading from '../Loading.js'
import { clearAuth, setOnlyUser } from '../../features/AuthSlice.js';

const RootLayout = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  useEffect(()=>{
    axios.get( `${backendUrl}/api/v1/user/me`,{
      withCredentials: true
    })
    .then((response)=>{
      const {user}= response.data;
      console.log("user token is still valid", user);
      dispatch(setOnlyUser({user}));
    })
    .catch((error)=>{
      console.log("token prolly expired or user is not logged in");
      dispatch(clearAuth());
    });
    setLoading(false);
  }, [dispatch, backendUrl])

  if(loading) return <Loading/>
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex">
        <div className="flex-grow">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout