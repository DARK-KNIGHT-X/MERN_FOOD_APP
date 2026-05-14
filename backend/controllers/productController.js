const Product = require("../models/Product");

// GET ALL PRODUCTS + SEARCH
exports.getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";

    let query = {};

    if (search.trim() !== "") {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query);

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};