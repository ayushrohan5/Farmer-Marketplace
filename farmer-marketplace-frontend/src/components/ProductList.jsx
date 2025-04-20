import React, { useState } from 'react';
import ProductCard from './ProductCard';

const majorLocations = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Noida',
  'Ahmedabad',
  'Pune',
  'Jaipur',
  'Lucknow',
];

const ProductList = ({ products }) => {
  const productsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Filter by location
  let filteredProducts = selectedLocation
  ? products.filter((product) =>
      product.location?.toLowerCase() === selectedLocation.toLowerCase()
    )
  : products;


  // Sort by price
  if (sortOrder === 'lowToHigh') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'highToLow') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex p-6">
      {/* Sidebar Filter */}
      <div className="w-1/4 pr-6">
        <h2 className="text-xl font-semibold mb-4">📍 Filter by Location</h2>
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="w-full p-2 border border-gray-300 rounded-lg mb-6"
        >
          <option value="">All Locations</option>
          {majorLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Sort by Price */}
        <h2 className="text-xl font-semibold mb-4">💰 Sort by Price</h2>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Product List */}
      <div className="w-3/4">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🌾 All Products</h1>
        <div className="flex flex-wrap gap-8" id="shopping">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found in this location.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-green-700 text-white rounded-lg mr-2"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => paginate(pageNumber + 1)}
              className={`px-4 py-2 ${
                currentPage === pageNumber + 1 ? 'bg-green-700 text-white' : 'bg-gray-200'
              } rounded-lg mx-1`}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-green-700 text-white rounded-lg ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
