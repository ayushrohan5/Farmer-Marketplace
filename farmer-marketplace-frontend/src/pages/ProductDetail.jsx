import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantityInCart, setQuantityInCart] = useState(0);
  const [maxReached, setMaxReached] = useState(false);
  const token = localStorage.getItem('token');
  const { fetchCartCount } = useCart();

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(res.data);
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };

  const fetchProductQuantity = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const item = res.data.cartItems.find(
        (item) => item.product._id === id
      );
      const quantity = item ? item.quantity : 0;
      setQuantityInCart(quantity);
      setMaxReached(quantity >= product?.stock);
    } catch (err) {
      console.error('Error fetching cart quantity:', err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchProductQuantity();
    }
  }, [product]);

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: product._id,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product added to cart!');
      fetchCartCount();
      fetchProductQuantity();
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error(err?.response?.data?.message || 'Failed to add to cart');
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${product._id}`, {
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
          `http://localhost:5000/api/cart/update`,
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

        {/* Cart Actions */}
        {quantityInCart === 0 ? (
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-4 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity('decrement')}
                className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
              >
                –
              </button>
              <span className="text-md font-semibold">{quantityInCart}</span>
              <button
                onClick={() => updateQuantity('increment')}
                className={`px-3 py-1 rounded text-sm ${
                  maxReached
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                disabled={maxReached}
                title={maxReached ? 'Max stock reached' : ''}
              >
                +
              </button>
            </div>
            {maxReached && (
              <span className="text-sm text-red-600">Max stock reached</span>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductDetail;
