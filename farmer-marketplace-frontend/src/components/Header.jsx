import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const searchRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Live search
  useEffect(() => {
    const fetchResults = async (query) => {
      if (!query) return setResults([]);

      try {
        const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(res.data.products || res.data);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    };

    const debounceTimeout = setTimeout(() => fetchResults(searchTerm), 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, token]);

  // Hide search results on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle Enter key press
  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);  // Navigate to search results page
      setResults([]);  // Clear live results
    }
  };

  return (
    <header className="bg-green-700 text-white p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="text-2xl font-bold">
        🌾 Farmer Market
      </Link>

      {/* Search Bar for Consumers Only */}
      {role === 'consumer' && (
        <div className="relative w-full max-w-md flex items-center gap-2" ref={searchRef}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleEnterPress}  /* Handle Enter key press */
            placeholder="Search products..."
            className="w-full p-2 rounded text-black placeholder-white"
          />
          <button
            onClick={() => {
              if (searchTerm.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                setResults([]);  // Clear live results
              }
            }}
            className="bg-white text-green-700 p-2 rounded hover:bg-gray-200"
          >
            <FaSearch className="w-5 h-5 text-green-500" />
          </button>

          {results.length > 0 && (
            <ul className="absolute bg-white text-black w-full border rounded mt-1 max-h-60 overflow-y-auto z-10 top-full left-0">
              {results.map((item) => (
                <li
                  key={item._id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    navigate(`/product/${item._id}`);
                    setResults([]);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>

        {token && role ? (
          <>
          <Link to="/aboutus" className="hover:underline">About us</Link>
            <Link
              to={role === 'farmer' ? '/farmer-dashboard' : '/customer-dashboard'}
              className="hover:underline"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
           <Link to="/aboutus" className="hover:underline">About us</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
