import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';

const CustomerDashboard = () => {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-green-700">🌾 Welcome, {user.name || 'Customer'}!</h1>

      <div className="flex space-x-4 mb-6">
        {/* <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded ${
            activeTab === 'products' ? 'bg-green-600 text-white' : 'bg-white border'
          }`}
        >
          🛒 Bro Products
        </button> */}
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded ${
            activeTab === 'orders' ? 'bg-green-600 text-white' : 'bg-white border'
          }`}
        >
          📦 My Orders
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded ${
            activeTab === 'profile' ? 'bg-green-600 text-white' : 'bg-white border'
          }`}
        >
          🧑 Profile
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        {activeTab === 'products' && <ProductList />}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">📦 Your Orders</h2>
            <p className="text-gray-500">Order listing feature coming soon...</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">🧾 Your Profile Info</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
