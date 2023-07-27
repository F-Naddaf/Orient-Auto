import React from "react";
import HeroSectio from "../components/banner/HeroSectio";
import Booking from "../components/booking/Booking";
import "./Home.css";

const Home = () => {
  return (
    <div className="hero-section">
      <HeroSectio />
      <Booking />
      <h1>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
        consequatur sunt quia praesentium reiciendis consectetur rem illo animi
        itaque aliquid, tenetur alias obcaecati aspernatur doloremque tempora
        incidunt adipisci officiis veniam.
      </h1>
      <h1>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
        consequatur sunt quia praesentium reiciendis consectetur rem illo animi
        itaque aliquid, tenetur alias obcaecati aspernatur doloremque tempora
        incidunt adipisci officiis veniam.
      </h1>
    </div>
  );
};

export default Home;
