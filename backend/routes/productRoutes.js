const express = require('express');
const router = express.Router();

const { getProductById } = require('../controllers/productController');

// Public routes
router.get('/:id', getProductById);

module.exports = router;