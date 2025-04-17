import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Get role to check if user is farmer or customer

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token || role === 'farmer') return; // Don't fetch if user is a farmer
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [token, role]); // Depend on both token and role

  return (
    <>
      <HeroSection />

      {token && role === 'consumer' && (
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-4">🌾 Featured Products</h1>
          <div className="flex flex-wrap gap-2" id ="shopping">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
