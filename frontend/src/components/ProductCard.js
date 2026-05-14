import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const price = product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      img: product.img,   // ✅ FIXED
      price: price,
      qty: qty,
      size: "regular",
    });

    navigate("/cart");
  };

  return (
    <div className="food-card">

      {/* ✅ FIXED */}
      <img src={product.img} alt={product.name} className="food-img" />

      <h2 className="food-title">{product.name}</h2>

      <div className="select-group">
        <select
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value))}
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <p className="price">Total: ₹{price * qty}</p>

      <button className="add-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;