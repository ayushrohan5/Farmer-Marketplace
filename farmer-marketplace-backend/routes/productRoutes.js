const { getAllProducts, searchProducts, getProductById } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const express = require('express');
const router = express.Router();

// GET /api/products
router.get('/', authMiddleware, getAllProducts);
router.get('/search', authMiddleware, searchProducts);
router.get('/:id',authMiddleware, getProductById);

module.exports = router;
