const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/paymentModel');
const Cart = require('../models/Cart'); // Adjust path as needed
const Order = require('../models/paymentModel');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});



const saveOrder = async (req, res) => {
  try {
    const { cartItems, razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;

    const order = new Order({
      user: req.user._id,
      products: cartItems.map(item => ({
        productId: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      })),
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: 'Paid',
    });

    await order.save();

    // Clear the cart
    await Cart.deleteMany({ user: req.user._id });

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Order Save Error:', err);
    res.status(500).json({ success: false, message: 'Order saving failed' });
  }
};


const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // convert to paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};



const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  const isAuthentic = generatedSignature === razorpay_signature;

  if (isAuthentic) {
    // Save payment
    await Payment.create({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      user: req.user._id,
    });

    // Clear user's cart
    await Cart.deleteMany({ user: req.user._id });

    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
};



const getRazorpayKey = (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
  };
  
  module.exports = { createOrder, verifyPayment, getRazorpayKey, saveOrder };