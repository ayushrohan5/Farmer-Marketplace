import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // 👈
import { toast } from 'react-toastify'; // 👈

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem('token');
  const { fetchCartCount } = useCart(); // 👈

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: product._id,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product added to cart!');
      fetchCartCount(); // 👈 update cart count in header
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (!product) {
    return <div className="text-center mt-10 text-gray-700">Loading...</div>;
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Left: Image */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-xl shadow-md"
        />
      </motion.div>

      {/* Right: Info */}
      <motion.div
        className="w-full md:w-1/2 space-y-4"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-lg text-gray-600">{product.description}</p>
        <div className="text-2xl text-green-600 font-semibold">₹ {product.price}</div>
        <div className="text-md text-gray-500">Weight: {product.weight}</div>
        <div className="text-sm text-gray-400">Category: {product.category}</div>
        <div className="text-sm text-gray-400">Location: {product.location}</div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Add to Cart
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetail;
