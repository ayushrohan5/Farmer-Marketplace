import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Results</h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
