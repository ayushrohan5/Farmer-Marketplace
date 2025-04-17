import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ProductTable = ({ products, refreshProducts }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleConfirmedDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/farmer/delete-product/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Product deleted successfully');
      refreshProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  return (
    <>
      <motion.table
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-left border-collapse"
      >
        <thead>
          <tr>
            {['Name', 'Price', 'Stock', 'Location', 'Actions'].map(header => (
              <th key={header} className="p-3 border-b font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <motion.tr key={p._id} whileHover={{ scale: 1.02 }} className="transition">
              <td className="p-3 border-b">{p.name}</td>
              <td className="p-3 border-b">₹{p.price}</td>
              <td className="p-3 border-b">{p.stock}</td>
              <td className="p-3 border-b">{p.location}</td>
              <td className="p-3 border-b space-x-2">
                <button
                  onClick={() => navigate(`/edit-product/${p._id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >Edit</button>
                <button
                  onClick={() => confirmDelete(p._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >Delete</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {/* Simple Floating Modal without background overlay */}
      {showConfirm && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded shadow-lg text-center w-80 z-50 border">
          <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
          <p className="mb-4 text-gray-600">This action cannot be undone.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleConfirmedDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              No, Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
