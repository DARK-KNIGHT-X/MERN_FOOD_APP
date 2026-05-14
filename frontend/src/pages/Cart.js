import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      // 🚀 STEP 1: Create Order
      const res = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          amount: totalPrice,
        }),
      });

      const data = await res.json();
      console.log("ORDER RESPONSE:", data);

      if (!data.orderId) {
        alert("Order creation failed ❌");
        return;
      }

      // 🚀 STEP 2: Razorpay Options
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // replace this
        amount: data.amount,
        currency: "INR",
        name: "Food App",
        description: "Order Payment",
        order_id: data.orderId,

        handler: async function (response) {
          try {
            // 🚀 STEP 3: Verify Payment
            const verifyRes = await fetch(
              "http://localhost:5000/api/orders/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  dbOrderId: data.dbOrderId,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert("Payment Successful 🎉");

              // optional: clear cart after success
              window.location.reload();
            } else {
              alert("Payment verification failed ❌");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Verification error ❌");
          }
        },

        prefill: {
          name: "User",
          email: "test@email.com",
        },

        theme: {
          color: "#ff7f50",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed ❌");
    }
  };

  if (cart.length === 0) {
    return <h2 className="empty-cart">🛒 Cart is empty</h2>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div className="cart-item" key={item.id + item.size}>
          <img src={item.img} alt={item.name} />

          <div className="cart-details">
            <h4>{item.name}</h4>
            <p>₹ {item.price}</p>

            <div className="qty-controls">
              <button
                onClick={() =>
                  updateQty(item.id, item.size, item.qty - 1)
                }
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() =>
                  updateQty(item.id, item.size, item.qty + 1)
                }
              >
                +
              </button>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id, item.size)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-total">
        <h3>Total: ₹ {totalPrice}</h3>

        <button className="checkout-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Cart;