import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FarmerDashboard from './pages/FarmerDashboard';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import CustomerDashboard from './pages/CustomerDashboard';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUs';
import { ToastContainer } from 'react-toastify';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
