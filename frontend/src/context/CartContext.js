import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (data && data.items && Array.isArray(data.items)) {
          const formattedCart = data.items.map((item) => ({
            id: item.productId._id,
            name: item.productId.name,
            img: item.productId.img,   // ✅ FIXED
            price: item.productId.price,
            qty: item.quantity,
            size: "regular",
          }));

          setCart(formattedCart);
        }
      } catch (err) {
        console.error("Fetch cart error:", err);
      }
    };

    fetchCart();
  }, []);

  // Add to cart
  const addToCart = async (product) => {
    try {
      await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: product.qty,
        }),
      });
    } catch (err) {
      console.error("Add to cart error:", err);
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, qty: item.qty + product.qty }
            : item
        );
      }

      return [...prevCart, product];
    });
  };

  // Remove
  const removeFromCart = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.error("Remove error:", err);
    }

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update qty
  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;