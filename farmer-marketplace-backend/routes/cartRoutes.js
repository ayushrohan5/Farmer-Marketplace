const express = require('express');
const { addToCart, getCartCount, getCartItems, deleteFromCart, updateCartQuantity, removeFromCart } = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add', verifyToken, addToCart);
router.get('/count', verifyToken, getCartCount);
router.get('/',verifyToken, getCartItems);
router.delete('/:id', verifyToken, deleteFromCart);
router.put('/update', verifyToken, updateCartQuantity);
router.delete('/remove/:productId', verifyToken, removeFromCart);

module.exports = router;
