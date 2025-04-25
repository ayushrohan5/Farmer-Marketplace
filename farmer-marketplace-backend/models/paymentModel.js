const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    }
  ],
  amount: Number,

  orderId: String,
  paymentId: String,
  signature: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
