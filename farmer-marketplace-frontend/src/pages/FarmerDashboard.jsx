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
      const res = await axios.get('http://localhost:5000/api/farmer/my-products', {
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
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">🌾 Your Products</h1>
        <button
          onClick={() => navigate('/add-product')}
          className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700 transition"
        >
          ➕ Add Product
        </button>
      </div>
      <ProductTable products={products} refreshProducts={fetchProducts} />
    </div>
  );
};

export default FarmerDashboard;