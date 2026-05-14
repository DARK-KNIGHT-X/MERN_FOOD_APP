import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch products
  const fetchProducts = async (searchText = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/products?search=${searchText}`
      );
      setProducts(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Pass fetchProducts function to Carousel */}
      <Carousel onSearch={fetchProducts} />

      <h1 className="home-title">Our Products</h1>

      {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products found 😕</p>
          ) : (
            products.map((p) => <ProductCard key={p._id} product={p} />)
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
