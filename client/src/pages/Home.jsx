import React from "react";
import HeroSectio from "../components/home/banner/HeroSectio";
import Booking from "../components/home/booking/Booking";
import Plan from "../components/home/plan/Plan";
import VehicleModel from "../components/home/vehicleModel/VehicleModel";
import WhyUs from "../components/home/whyUs/WhyUs";
import FAQ from "../components/home/faq/FAQ";
import Footer from "../components/footer/Footer";
import Download from "../components/home/download/Download";
import "./style/Home.css";

const Home = () => {
  return (
    <div className="hero-section">
      <HeroSectio />
      {/* <Booking />
      <Plan />
      <VehicleModel />
      <WhyUs />
      <FAQ />
      <Download />
      <Footer /> */}
    </div>
  );
};

export default Home;
