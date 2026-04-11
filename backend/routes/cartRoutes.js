const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware'); 
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

// Protected routes
router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.delete('/remove/:id', authMiddleware, removeFromCart);

module.exports = router;