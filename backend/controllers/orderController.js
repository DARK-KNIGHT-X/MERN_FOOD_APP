const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "YOUR_KEY_ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET"
});

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const amount = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcpt_" + Math.floor(Math.random() * 10000)
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = await Order.create({
      userId: req.user._id,
      items: cart.items,
      amount,
      paymentStatus: "pending"
    });

    res.status(201).json({ razorpayOrder, dbOrder: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { dbOrderId } = req.body;
    if (!dbOrderId) return res.status(400).json({ message: "Invalid request" });

    await Order.findByIdAndUpdate(dbOrderId, { paymentStatus: "paid" });
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };