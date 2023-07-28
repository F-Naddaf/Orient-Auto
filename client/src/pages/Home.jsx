import React from "react";
import HeroSectio from "../components/banner/HeroSectio";
import Booking from "../components/booking/Booking";
import Plan from "../components/plan/Plan";
import VehicleModel from "../components/vehicleModel/VehicleModel";
import WhyUs from "../components/whyUs/WhyUs";
import "./Home.css";

const Home = () => {
  return (
    <div className="hero-section">
      <HeroSectio />
      <Booking />
      <Plan />
      <VehicleModel />
      <WhyUs />
    </div>
  );
};

export default Home;
