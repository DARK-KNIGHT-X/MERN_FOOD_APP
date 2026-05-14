import { useState } from "react";
import "./Carousel.css";

const Carousel = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
  };

  return (
    <div id="heroCarousel" className="carousel slide carousel-fade">
      <div className="carousel-inner hero-carousel-inner">
        {/* Slide 1 */}
        <div
          className="carousel-item active hero-slide"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/random/1600x800?burger')",
          }}
        >
          <div className="glassy-overlay">
            <h1>Delicious Burgers</h1>
            <p>Fresh • Hot • Tasty</p>

            {/* Search Component */}
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

        {/* Slide 2 */}
        <div
          className="carousel-item hero-slide"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/random/1600x800?momos')",
          }}
        >
          <div className="glassy-overlay">
            <h1>Yummy Momos</h1>
            <p>Steamed to perfection</p>

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

        {/* Slide 3 */}
        <div
          className="carousel-item hero-slide"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/random/1600x800?fruits')",
          }}
        >
          <div className="glassy-overlay">
            <h1>Fresh Fruits</h1>
            <p>Healthy & Organic</p>

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
