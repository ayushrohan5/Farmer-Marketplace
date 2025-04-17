const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'delivered'], default: 'pending' },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
