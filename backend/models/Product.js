const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  img: String,   // ✅ FIXED (was image)
  description: String
});

module.exports = mongoose.model('Product', productSchema);