const express = require('express');
const { addToCart, getCartCount, getCartItems, deleteFromCart } = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add', verifyToken, addToCart);
router.get('/count', verifyToken, getCartCount);
router.get('/',verifyToken, getCartItems);
router.delete('/:id', verifyToken, deleteFromCart);

module.exports = router;
