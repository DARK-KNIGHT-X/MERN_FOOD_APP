const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware'); 
const { createOrder, verifyPayment } = require('../controllers/orderController');

// Protected routes
router.post('/create', authMiddleware, createOrder);
router.post('/verify', authMiddleware, verifyPayment);

module.exports = router;