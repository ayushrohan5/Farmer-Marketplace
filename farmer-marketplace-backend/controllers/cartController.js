const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');


const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;
  
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
  
    try {
      // Delete the cart item that matches both user and product
      const result = await Cart.deleteOne({ user: userId, product: productId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      return res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  

const updateCartQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body;
    const userId = req.user.id;

    const cartItem = await Cart.findOne({ user: userId, product: productId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (action === 'increment') {
      // Check stock limit
      const product = await Product.findById(productId);
      if (cartItem.quantity < product.stock) {
        cartItem.quantity += 1;
      } else {
        return res.status(400).json({ message: 'Reached max stock limit' });
      }
    } else if (action === 'decrement') {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        return res.status(400).json({ message: 'Minimum quantity is 1' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await cartItem.save();

    res.status(200).json({ message: 'Cart quantity updated successfully' });
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ message: 'Error updating cart', error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    
    if (product.stock === 0) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product already exists in user's cart
    const existingCartItem = await Cart.findOne({ user: userId, product: productId });

    if (existingCartItem) {
      if (existingCartItem.quantity >= product.stock) {
        return res.status(400).json({ message: 'Cannot add more than available stock' });
      }
      
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Cart item quantity updated' });
    }

    // Otherwise create new cart item
    const newCartItem = new Cart({
      user: userId,
      product: productId,
      quantity: 1,
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
      const cartItems = await Cart.find({ user: req.user.id });
  
      const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
      res.json({ count: totalCount });
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

module.exports = { addToCart, getCartCount, getCartItems, deleteFromCart, updateCartQuantity, removeFromCart };
