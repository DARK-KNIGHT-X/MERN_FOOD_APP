const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user._id,
    }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const amount = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = await Order.create({
      userId: req.user._id,
      items: cart.items,
      amount,
      paymentStatus: "pending",
    });

    // Frontend ke expected format mein response
    res.status(201).json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      dbOrderId: newOrder._id,
      success: true,
    });
  } catch (err) {
    console.error("ORDER ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { dbOrderId } = req.body;

    if (!dbOrderId) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    await Order.findByIdAndUpdate(dbOrderId, {
      paymentStatus: "paid",
    });

    await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { items: [] }
    );

    res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: err.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};