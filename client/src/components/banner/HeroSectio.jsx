import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSectio = () => {
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
        <Link to="/rent" className="rent-btn">
          Book Now
        </Link>
        <Link to="/rent" className="rent-btn">
          Learn More
          <i class="fa-regular fa-circle-check"></i>
        </Link>
      </div>
      {/* <div className="slogan-container">
        <h2 className="slogan">Your Ultimate Travel Companion</h2>
        <Link to="/rent" className="rent-btn">
          Rent Now
        </Link>
      </div> */}
    </div>
  );
};

export default HeroSectio;
