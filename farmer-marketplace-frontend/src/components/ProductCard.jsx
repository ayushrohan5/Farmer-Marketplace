import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl shadow-md p-4 w-60 mx-1 transition-all duration-300 hover:shadow-xl"
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
    </motion.div>
  );
};

export default ProductCard;
