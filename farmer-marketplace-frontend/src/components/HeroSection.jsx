import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // assuming role is stored at login time

  // Dashboard path based on role
  const dashboardLink = role === 'farmer' ? '/farmer-dashboard' : '/customer-dashboard';
  const shoppingLink = role === 'farmer' ? '' : 'shopping';

  return (
    <section className="bg-gradient-to-br from-green-100 via-white to-green-200 min-h-[90vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-green-700 mb-4"
      >
        🌱 Welcome to Farmer Market
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl"
      >
        Connecting local farmers directly with conscious consumers. Support
        local. Eat fresh. Live healthy.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {!token ? (
          <>
            <Link
              to="/register?role=farmer"
              className="px-6 py-3 bg-green-600 text-white rounded-full text-lg hover:bg-green-700 transition-all duration-300"
            >
              🚜 Join as Farmer
            </Link>
            <Link
              to="/register?role=consumer"
              className="ml-4 px-6 py-3 bg-white border border-green-600 text-green-700 rounded-full text-lg hover:bg-green-100 transition-all duration-300"
            >
              🛒 Shop as Customer
            </Link>
          </>
        ) : (
          <>
            {role === "consumer" && (
              <a
                href="#shopping"
                className="px-6 py-3 bg-green-700 text-white rounded-full text-lg hover:bg-green-800 transition-all duration-300 mr-[9px]"
              >
                🛒 Shop now
              </a>
            )}
            <Link
              to={dashboardLink}
              className="px-6 py-3 bg-green-700 text-white rounded-full text-lg hover:bg-green-800 transition-all duration-300"
            >
              🚀 Go to Dashboard
            </Link>
          </>
        )}
      </motion.div>

      {/* Decorative animation circles */}
      <motion.div
        className="absolute w-64 h-64 bg-green-300 rounded-full opacity-30 top-[-50px] right-[-50px]"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-green-200 rounded-full opacity-30 bottom-[-40px] left-[-40px]"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
    </section>
  );
};

export default HeroSection;
