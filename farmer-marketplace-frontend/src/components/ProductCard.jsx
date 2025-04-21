import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // adjust path as needed
import { toast} from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent card click
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: product._id,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success('Product added to cart successfully');

      fetchCartCount(); // Update header count
      
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  return (
    <>
   
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
      <div className="text-sm text-gray-700 mt-1">
        {product.weight}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="absolute bottom-4 cursor-pointer right-4 bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 z-10"
      >
        Add to Cart
      </button>
     
    </motion.div>
  
     </>
  );
};

export default ProductCard;
