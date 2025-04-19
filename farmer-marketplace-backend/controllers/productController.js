const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'name email');
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);
    
    const regex = new RegExp(query, 'i');
    const products = await Product.find({ name: regex }).limit(10);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = { getAllProducts, searchProducts, getProductById };

  