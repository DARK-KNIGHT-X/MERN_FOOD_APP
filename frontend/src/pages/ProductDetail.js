import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load product");
      });
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>Loading product details...</h2>;

  return (
    <div className="product-detail-container">

      {/* ✅ FIXED */}
      <img src={product.img} alt={product.name} />

      <h2>{product.name}</h2>
      <p>₹{product.price}</p>
      <p>{product.description}</p>

      <button
        onClick={() =>
          addToCart({
            id: product._id,
            name: product.name,
            img: product.img,   // ✅ FIXED
            price: product.price,
            qty: 1,
            size: "regular",
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}