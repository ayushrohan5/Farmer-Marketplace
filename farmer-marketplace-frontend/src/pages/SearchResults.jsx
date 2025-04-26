import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext'; // 👈 import useCart
import { toast } from 'react-toastify'; // 👈 import toast

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const token = localStorage.getItem('token');
  const searchTerm = query.get('q');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { fetchCartCount } = useCart(); // 👈

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) return;

      try {
        const res = await axios.get(`https://farmer-marketplace-backend.vercel.app/api/products/search?q=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data.products || res.data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };

    fetchSearchResults();
  }, [searchTerm, token]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Search Results for "{searchTerm}"</h2>

      {products.length > 0 ? (
        <div className="space-y-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => navigate(`/product/${product._id}`)}
              className="cursor-pointer flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow hover:scale-[1.02] min-h-[300px] relative"
            >
              <div className="w-full md:w-1/3 h-80 md:h-full overflow-hidden relative">
                <img
                  src={product.image || 'https://via.placeholder.com/300x200.png?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="w-full md:w-2/3 p-6 text-left flex flex-col justify-center min-h-[300px]">
                <h3 className="text-2xl font-bold text-green-800 mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2 line-clamp-3">{product.description}</p>
                <p className="text-green-600 font-semibold text-lg mb-1">₹{product.price}</p>
                <p className="text-sm text-gray-500">Category: {product.category || 'N/A'}</p>
              </div>

          
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
