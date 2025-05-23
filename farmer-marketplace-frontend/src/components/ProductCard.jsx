import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();
  const token = localStorage.getItem('token');
  const [quantityInCart, setQuantityInCart] = useState(0);
  const [maxReached, setMaxReached] = useState(false);

  const fetchProductQuantity = async () => {
    try {
      const res = await axios.get('https://farmer-marketplace-backend.vercel.app/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const item = res.data.cartItems.find(
        (item) => item.product._id === product._id
      );
      const quantity = item ? item.quantity : 0;
      setQuantityInCart(quantity);
      setMaxReached(quantity >= product.stock);
    } catch (err) {
      console.error('Error fetching cart quantity:', err);
    }
  };

  useEffect(() => {
    fetchProductQuantity();
  }, []);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await axios.post(
        'https://farmer-marketplace-backend.vercel.app/api/cart/add',
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Product added to cart!');
      fetchCartCount();
      fetchProductQuantity();
    } catch (err) {
      console.error('Failed to add to cart:', err);
      toast.error(err?.response?.data?.message || 'Error adding to cart');
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await axios.delete(`https://farmer-marketplace-backend.vercel.app/api/cart/remove/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info('Product removed from cart');
      fetchCartCount();
      fetchProductQuantity();
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const updateQuantity = async (type) => {
    if (type === 'decrement' && quantityInCart === 1) {
      handleRemoveFromCart();
    } else {
      try {
        await axios.put(
          `https://farmer-marketplace-backend.vercel.app/api/cart/update`,
          {
            productId: product._id,
            action: type,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchCartCount();
        fetchProductQuantity();
      } catch (err) {
        console.error('Failed to update quantity:', err);
        toast.error(err?.response?.data?.message || 'Error updating cart');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={() => navigate(`/product/${product._id}`)}
      className="relative cursor-pointer backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl shadow-md p-4 w-60 mx-1 transition-all duration-300 hover:shadow-xl"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-36 object-cover rounded-lg mb-2"
      />
      <h3 className="text-md font-bold text-black mb-1">{product.name}</h3>
      <p className="text-sm text-black line-clamp-2">{product.description}</p>
      <div className="mt-2">
        <span className="text-sm font-semibold text-green-700">₹ {product.price}</span>
      </div>
      <div className="text-sm text-gray-700 mt-1">{product.weight}</div>

      {quantityInCart === 0 ? (
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 cursor-pointer right-4 bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 z-10"
        >
          Add to Cart
        </button>
      ) : (
        <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity('decrement');
              }}
              className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded text-sm"
            >
              –
            </button>
            <span className="text-sm font-semibold">{quantityInCart}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity('increment');
              }}
              className={`px-2 py-1 rounded text-sm ${
                maxReached ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              disabled={maxReached}
              title={maxReached ? 'Max stock reached' : ''}
            >
              +
            </button>
          </div>
          {maxReached && (
            <span className="text-xs text-red-600 mt-1">Max stock reached</span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
