import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {

  return (
    <div className="p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-4">🌾 Featured Products</h1>
          <div className="flex flex-wrap gap-2" id ="shopping">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
  );
};

export default ProductList;
