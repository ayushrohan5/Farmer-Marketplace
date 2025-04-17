const express = require('express');
const { addProduct, deleteProduct, updateProduct, getFarmerProducts } = require('../controllers/farmerController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-product', authMiddleware, addProduct);
router.get('/my-products', authMiddleware, getFarmerProducts);
router.put('/update-product/:id', authMiddleware, updateProduct);
router.delete('/delete-product/:id', authMiddleware, deleteProduct);

module.exports = router;
