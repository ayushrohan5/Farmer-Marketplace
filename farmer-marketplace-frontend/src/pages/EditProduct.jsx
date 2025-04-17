import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    image: '',
    category: '',
    location: '',
    description: ''
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/farmer/my-products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const target = res.data.products.find(p => p._id === id);
        setForm(target);
      } catch (err) {
        toast.error('Product fetch failed');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/farmer/update-product/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Updated successfully');
      setTimeout(() => {
        navigate('/farmer-dashboard');
      }, 1500); // 1 second delay
      
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Product Name"
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            placeholder="Price"
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            placeholder="Stock"
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
            placeholder="Image URL"
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Category"
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Location"
            className="p-3 border rounded-lg w-full"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          placeholder="Description"
          className="w-full p-3 border rounded-lg h-32 resize-none"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
        >
          Update Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
