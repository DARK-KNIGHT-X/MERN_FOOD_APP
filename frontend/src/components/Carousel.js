import { useState } from "react";
import "./Carousel.css";

// ✅ Fixed: Unsplash random URLs hata ke reliable food images lagaye
const slides = [
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600",
    title: "Delicious Burgers",
    subtitle: "Fresh • Hot • Tasty",
  },
  {
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1600",
    title: "Yummy Momos",
    subtitle: "Steamed to perfection",
  },
  {
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600",
    title: "Fresh Fruits",
    subtitle: "Healthy & Organic",
  },
];

const Carousel = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
  };

  return (
    <div id="heroCarousel" className="carousel slide carousel-fade">
      <div className="carousel-inner hero-carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item hero-slide ${index === 0 ? "active" : ""}`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="glassy-overlay">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>

              <div className="carousel-search">
                <input
                  type="text"
                  placeholder="Search your favorite food..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;