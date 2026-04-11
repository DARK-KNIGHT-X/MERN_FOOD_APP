const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

// Third argument ensures exact collection name in Atlas
module.exports = mongoose.model('User', userSchema, 'user');