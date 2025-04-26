import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
  const [name, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [existingProducts, setExistingProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('https://farmer-marketplace-backend.vercel.app/api/farmer/my-products', {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setExistingProducts(response.data.products || []);
  //     } catch (err) {
  //       console.error('Error fetching existing products:', err);
  //       toast.error('Failed to fetch products');
  //     }
  //   };

  //   fetchProducts();
  // }, [token]);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const alreadyExists = existingProducts.some(
      (product) => product.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (alreadyExists) {
      toast.warning('⚠️ Product already exists!');
      return;
    }

    try {
      const response = await axios.post(
        'https://farmer-marketplace-backend.vercel.app/api/farmer/add-product',
        { name, price, stock, weight, description, image, category, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('✅ Product added successfully!');
      setExistingProducts((prev) => [...prev, response.data.product]);

      // Clear form
      setProductName('');
      setPrice('');
      setStock('');
      setWeight('');
      setDescription('');
      setImage('');
      setCategory('');
      setLocation('');
      setTimeout(() => {
        navigate('/farmer-dashboard');
      }, 1500);
    } catch (err) {
      console.error('Error adding product:', err);
      toast.error('❌ Failed to add product.');
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">🌿 Add Product</h1>
        <form onSubmit={handleAddProduct} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Weight</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
};

export default AddProduct;