import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  const fetchCartItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cartItems || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartItems();
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">Cart is empty</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={item.product.image || 'https://via.placeholder.com/150'}
                alt={item.product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-green-800">{item.product.name}</h3>
              <p className="text-lg text-gray-700 mb-2">₹{item.product.price}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600 hover:text-red-800 flex items-center gap-2"
              >
                <FaTrash /> Remove
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="text-center mt-8">
          <button className="bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-800 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
