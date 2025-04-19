// Updated Header.jsx with live product search
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const fetchResults = async (query) => {
      if (!query) return setResults([]);
  
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(res.data.products || res.data); // adjust depending on your backend
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    };
  
    const debounceTimeout = setTimeout(() => fetchResults(searchTerm), 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, token]);
  

  return (
    <header className="bg-green-700 text-white p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="text-2xl font-bold">
        🌾 Farmer Market
      </Link>

      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 rounded text-black"
        />
        {results.length > 0 && (
          <ul className="absolute bg-white text-black w-full border rounded mt-1 max-h-60 overflow-y-auto z-10">
            {results.map((item) => (
              <li
                key={item._id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>

        {token && role ? (
          <>
            <Link
              to={role === 'farmer' ? '/farmer-dashboard' : '/customer-dashboard'}
              className="hover:underline"
            >
              Dashboard
            </Link>
            <button onClick={handleLogout} className="ml-2 px-3 py-1 bg-red-500 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;