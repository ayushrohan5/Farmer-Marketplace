const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock, description, weight, category, image, location } = req.body;
    const product = new Product({
      name, price, stock, weight, description, category, image, location, farmer: req.user.id
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
};

exports.getFarmerProducts = async (req, res) => {
  try {
    const products = await Product.find({farmer: req.user.id });
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id});
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};