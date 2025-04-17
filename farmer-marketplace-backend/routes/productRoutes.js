const { getAllProducts } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const express = require('express');
const router = express.Router();

// GET /api/products
router.get('/', authMiddleware, getAllProducts);

module.exports = router;
