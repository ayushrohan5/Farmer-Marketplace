const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getRazorpayKey, verifyPayment, createOrder, saveOrder, getMyPaidOrders } = require('../controllers/paymentController');

router.post('/create-order',authMiddleware, createOrder);
router.post('/verify-payment', authMiddleware, verifyPayment);
router.get('/get-key', getRazorpayKey);
router.post('/', authMiddleware, saveOrder);
router.get('/my-orders', authMiddleware, getMyPaidOrders);



module.exports = router;
