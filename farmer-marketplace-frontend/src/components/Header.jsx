import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaTrash, FaBars } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartCount, fetchCartCount } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const cartRef = useRef(null);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data.cartItems || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCartItems();
      fetchCartCount();
    } catch (err) {
      console.error('Error deleting cart item:', err);
    }
  };

  useEffect(() => {
    if (showCartDropdown) {
      fetchCartItems();
    }
  }, [showCartDropdown]);

  // Live search
  useEffect(() => {
    const fetchResults = async (query) => {
      if (!query) return setResults([]);
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data.products || res.data);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    };

    const debounceTimeout = setTimeout(() => fetchResults(searchTerm), 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  // Hide dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!searchRef.current?.contains(e.target)) setResults([]);
      if (!cartRef.current?.contains(e.target)) setShowCartDropdown(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setResults([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="bg-green-700 text-white p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 relative">
      {/* Mobile menu icon */}
      <button 
        className="md:hidden absolute top-4 left-4 text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars className="w-6 h-6" />
      </button>

      <Link to="/" className="text-2xl font-bold">
        🌾 Farmer Market
      </Link>

      {role === "consumer" && (
        <div
          className="relative w-full max-w-md flex items-center gap-2"
          ref={searchRef}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleEnterPress}
            placeholder="Search products..."
            className="w-full p-2 rounded text-black placeholder-white"
          />
          <button
            onClick={() => {
              if (searchTerm.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                setResults([]);
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

      {/* Cart count for small screens */}
      {role === "consumer" && (
        <span
          onClick={() => navigate("/cart")}
          className="md:hidden absolute top-4 right-4 bg-white text-green-700 px-3 py-1 rounded-full font-bold cursor-pointer"
        >
          🛒 {cartCount}
        </span>
      )}

      {/* Mobile Menu Content */}
      <nav 
        className={`md:flex-row md:space-x-4 flex flex-col items-center space-y-4 md:space-y-0 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <Link to="/" className="hover:underline">Home</Link>

        {/* {role === "consumer" && (
          // <span
          //   onClick={() => navigate("/cart")}
          //   className="bg-white text-green-700 px-3 py-1 rounded-full font-bold cursor-pointer"
          // >
          //   🛒 {cartCount}
          // </span>
        )} */}

        <Link to="/aboutus" className="hover:underline">About us</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>

        {token && role ? (
          <>
            <Link
              to={role === "farmer" ? "/farmer-dashboard" : "/customer-dashboard"}
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
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
