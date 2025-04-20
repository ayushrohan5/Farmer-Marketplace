import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import ProductList from '../components/ProductList';
import Testimonials from '../components/Testimonials';

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
        <ProductList products={products} />
        
      )}
      <Testimonials />
    </>
  );
};

export default HomePage;
