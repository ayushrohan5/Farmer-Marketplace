import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductTable from '../components/ProductTable';

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://farmer-marketplace-backend.vercel.app/api/farmer/my-products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 text-center sm:text-left">
          🌾 Your Products
        </h1>
        <button
          onClick={() => navigate('/add-product')}
          className="bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full shadow hover:bg-green-700 transition w-full sm:w-auto"
        >
          ➕ Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <ProductTable products={products} refreshProducts={fetchProducts} />
      </div>
    </div>
  );
};

export default FarmerDashboard;
