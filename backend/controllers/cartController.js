const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if(quantity <= 0) return res.status(400).json({ message: "Invalid quantity" });

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user._id,
      items: [{ productId, quantity }]
    });
  } else {
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
  }

  res.json(cart);
};

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  res.json(cart);
};

const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(item => item.productId.toString() !== req.params.id);
  await cart.save();
  res.json(cart);
};

module.exports = { addToCart, getCart, removeFromCart };