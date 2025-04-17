import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="bg-green-700 text-white p-4 shadow-md flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold">
        🌾 Farmer Market
      </Link>

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