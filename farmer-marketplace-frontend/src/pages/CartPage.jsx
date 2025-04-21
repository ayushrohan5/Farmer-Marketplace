import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const { fetchCartCount } = useCart();
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

  const confirmDelete = (itemId) => {
    setSelectedItemId(itemId);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${selectedItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartItems();
      fetchCartCount();
      setShowConfirm(false);
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const cancelDelete = () => {
    setSelectedItemId(null);
    setShowConfirm(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price, 0);

  return (
    <div className="min-h-screen bg-green-100 p-8 relative">
      <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">Cart is empty</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-4 flex items-center gap-6"
            >
              <img
                src={item.product.image || 'https://via.placeholder.com/150'}
                alt={item.product.name}
                className="w-28 h-28 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-800">{item.product.name}</h3>
                <p className="text-lg text-gray-700">₹{item.product.price}</p>
              </div>
              <button
                onClick={() => confirmDelete(item._id)}
                className="text-red-600 hover:text-red-800 text-xl"
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-semibold text-green-800 mb-4">
            Total: ₹{totalPrice}
          </p>
          <button className="bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-800 transition">
            Proceed to Checkout
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-80">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
