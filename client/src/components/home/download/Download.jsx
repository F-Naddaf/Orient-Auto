import React from "react";
import { Link } from "react-router-dom";
import "./Download.css";

const Download = () => {
  return (
    <div className="download-container">
      <div className="about-app-wrapper">
        <h2>Download our app to get most out of it</h2>
        <p>
          Get behind the wheel of your next adventure with our convenient rental
          car app! Download now our app for easy browsing , booking and hit the
          road in style. Whether it's a business trip or a vacation, our app
          ensures a smooth and seamless rental experience, putting the keys to
          your journey right at your fingertips.
        </p>
        <div className="btns-wrapper">
          <Link to="/">
            <img src="../../../images/google-play.png" alt="Ggoogle Play" />
          </Link>
          <Link to="/">
            <img src="../../../images/app-store.png" alt="App Store" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Download;
