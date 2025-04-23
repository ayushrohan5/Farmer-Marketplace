import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [razorpayKey, setRazorpayKey] = useState('');

  const { fetchCartCount } = useCart();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCartItems();
    fetchRazorpayKey();
  }, []);

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

  const fetchRazorpayKey = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/payment/get-key');
      setRazorpayKey(data.key);
    } catch (err) {
      console.error('Failed to load Razorpay key', err);
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const { data: order } = await axios.post(
        'http://localhost:5000/api/payment/create-order',
        { amount: totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'FarmFresh',
        description: 'Cart Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              'http://localhost:5000/api/payment/verify-payment',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verifyRes.data.success) {
              toast.success('🎉 Payment Successful!');
              fetchCartCount();
              setCartItems([]); // Optionally clear cart
            } else {
              alert('❌ Payment verification failed');
            }
          } catch (err) {
            console.error('Verification error', err);
          }
        },
        theme: {
          color: '#38a169',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

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
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-800 font-semibold">
                  Subtotal: ₹{item.product.price * item.quantity}
                </p>
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
          <button
            onClick={handleCheckout}
            className="bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-green-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
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
