const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

// ✅ THIS FIXES YOUR ERROR
router.get("/", getProducts);

// single product
router.get("/:id", getProductById);

module.exports = router;