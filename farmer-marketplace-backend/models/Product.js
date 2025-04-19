const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 1 },
  weight: { type: String, required: true },
  description: { type: String, required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  image: { type: String },
  location: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', productSchema);
