import ProfilePng from '../../images/Profile.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineMenu } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import SearchBar from '../agent/SearchBarForAgent';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../../features/AuthSlice';



const ProfileDropdown = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const avatarUrl = user?.avatar?.url || ProfilePng;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  const handleLogout = async () => {
    try {
      const response = await axios.get( `${backendUrl}/api/v1/user/logout`,{
        withCredentials: true
      });
      console.log(response.data); // Log the response data to the console
      dispatch(clearAuth());
      // If logout is successful, show an alert and perform any additional logic (e.g., redirecting)
      alert("Logout successful!");
      navigate('/explore');
      
    } catch (error) {
      console.error("Logout Error:", error);

      // If there's an error, show an alert and handle accordingly
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="w-8 h-8 cursor-pointer" onClick={toggleDropdown}>
        <img src={avatarUrl} alt="profile_image" className="rounded-full w-full h-full object-cover" />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <Link to="/u/settings/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};


const RootNavbar = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <nav className="bg-blue-600 text-white py-2 shadow-md">
      <div className="px-10 flex justify-between items-center">
        <div className="flex gap-10 items-center">
          <Link to="/u/settings/profile" className="scale-[2]">
            <MdOutlineMenu title='settings'/>
          </Link>
          <SearchBar/>
        </div>
        <div className="flex gap-10 items-center">
          <Link to="/u/jobs" className="hover:underline">Manage Jobs</Link>
          <Link to="/u/create-agent" className="hover:underline">Create Agent</Link>
          <Link to="/explore" className="hover:underline">Explore</Link>
          {
            auth?.user &&  
            <Link to="/u/notifications" className="scale-[1.25]" title='Notifications'>
              <FaBell/>
            </Link>
          }
          {
            auth?.user && <ProfileDropdown user={auth.user}/>
          }
          {
            (!auth?.user) && <Link to="/account?action=login" className="hover:underline">Login</Link>
          }
          {
            (!auth?.user) && <Link to="/account?action=register" className="hover:underline">Register</Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default RootNavbar