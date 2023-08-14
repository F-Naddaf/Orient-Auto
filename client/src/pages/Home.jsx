import React from "react";
import HeroSectio from "../components/home/banner/HeroSectio";
import Booking from "../components/home/booking/Booking";
import Plan from "../components/home/plan/Plan";
import VehicleModel from "../components/home/vehicleModel/VehicleModel";
import WhyUs from "../components/home/whyUs/WhyUs";
import FAQ from "../components/home/faq/FAQ";
import Footer from "../components/footer/Footer";
import Download from "../components/home/download/Download";

const Home = () => {
  return (
    <>
      <HeroSectio />
      <Booking />
      <Plan />
      <VehicleModel />
      <WhyUs />
      <FAQ />
      <Download />
    </>
  );
};

export default Home;
