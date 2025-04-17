import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/150'}
            alt={product.name}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-700">₹ {product.price} per {product.unit}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
            Order Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
