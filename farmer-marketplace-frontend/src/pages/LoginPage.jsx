import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      toast.success('🎉 Login successful!', {
        position: 'top-center',
        autoClose: 2000,
      });

      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      console.error('Login failed', err);
      toast.error('❌ Login failed! Please check your credentials.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="text-3xl font-bold text-center text-purple-700 mb-6"
        >
          Welcome Back 👋
        </motion.h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Login
          </motion.button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          New user?{' '}
          <Link
            to="/register"
            className="text-purple-700 font-semibold hover:underline transition duration-200"
          >
            Signup
          </Link>
        </div>
      </motion.div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
