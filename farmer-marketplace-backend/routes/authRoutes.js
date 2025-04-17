const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/authController');

router.get('/profile', authMiddleware, getProfile);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
