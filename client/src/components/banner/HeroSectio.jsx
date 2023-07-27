import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSectio = () => {
  const handleScrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-container">
      <img src="../images/banner.png" alt="banner" />
      <div className="slogan-container">
        <p className="slogan-title">Plan your trip now</p>
        <h3 className="slogan">
          Save <span>Big</span> with our car rental
        </h3>
        <p className="slogan-description">
          Rent the car of your dreams. Unbeatable prices, unlimited miles,
          flexible pick-up options and much more.
        </p>
        <div className="btn-wrapper">
          <button onClick={handleScrollToBooking} className="book-btn">
            <p>Book Now</p>
            <i className="fa-regular fa-circle-check"></i>
          </button>
          <Link to="/learn" className="learn-btn">
            <p>Learn More</p>
            <i class="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSectio;
