import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consumer');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const preselectedRole = queryParams.get('role');
    if (preselectedRole === 'farmer' || preselectedRole === 'consumer') {
      setRole(preselectedRole);
    }
  }, [location.search]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://farmer-marketplace-backend.vercel.app/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      toast.success('🎉 Registered successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });
      setTimeout(() => navigate('/login'), 2500);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Try again.', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
    <div className="md:min-h-screen min-h-[50vh] bg-gradient-to-br from-green-300 viagreen-200 to-green-100 to-green-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          className="text-3xl font-bold text-center text-blue-600 mb-4"
        >
          Create Your Account ✨
        </motion.h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-lg text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-lg text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-lg text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-lg text-gray-700 mb-1">Select Role</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="consumer">Consumer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Register
          </motion.button>
        </form>
        <div className="text-center mt-6 text-gray-700 text-base">
  Already have an account?{" "}
  <span
    onClick={() => navigate('/login')}
    className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition duration-300"
  >
    Login
  </span>
</div>

      </motion.div>

      <ToastContainer />
    </div>
    
    </>
  );
};

export default RegisterPage;
