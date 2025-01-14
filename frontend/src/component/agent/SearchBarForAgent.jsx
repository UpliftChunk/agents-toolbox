import React, { useCallback, useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setKeyword } from '../../features/KeywordSlice';

const SearchBar = () => {
  const keyword = useSelector((state) => state.keyword);
  const [searchQuery, setSearchQuery] = useState(keyword);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const handleSearch = useCallback(() => {
    if (location.pathname !== '/') return navigate('/');
  }, [location, navigate]);

  // Using useRef to keep track of the searchQuery value for the latest update
  const debouncedQuery = useRef(searchQuery);
  const timerRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(setKeyword(searchQuery)); 
      handleSearch();
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    debouncedQuery.current = event.target.value; // Always update the ref

    // Clear the previous timer if the input changes again
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer
    timerRef.current = setTimeout(() => {
      dispatch(setKeyword(debouncedQuery.current));  // Use the debounced value from the ref
      handleSearch();
    }, 500); // 500ms debounce delay
  };

  useEffect(() => {
    console.log("updated keyword in search bar from other component");
    setSearchQuery(keyword)
  }, [keyword])

  return (
    <div className="relative flex items-center gap-2 rounded-full bg-white px-4 py-2">
      <input
        type="text"
        placeholder="Search Agents..."
        className=" text-black focus:outline-none w-80 shadow-md"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="my-auto text-gray-500 hover:text-black"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
