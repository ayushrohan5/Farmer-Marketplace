const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  try {
    // console.log('Decoded User from Token:', req.user);
    const { productId } = req.body;

    // Add item for the current user
    const newCartItem = new Cart({
      user: req.user.id, // Set user from decoded token
      product: productId,
    });

    await newCartItem.save();
    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(400).json({ message: 'Error adding to cart', error: error.message });
  }
};

const getCartCount = async (req, res) => {
  try {
    const count = await Cart.countDocuments({ user: req.user.id });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get cart count', error: err.message });
  }
};

const getCartItems = async (req, res) => {
    try {
      const cartItems = await Cart.find({ user: req.user.id }).populate('product');
      res.status(200).json({ cartItems });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch cart items' });
    }
  };
  const deleteFromCart = async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete cart item' });
    }
  };

module.exports = { addToCart, getCartCount, getCartItems, deleteFromCart };
