import React from "react";
import "./Banner.css";

const Banner = ({ title }) => {
  return (
    <div className="banner-wrapper">
      <img src="../images/about/about-banner.png" alt="banner" />
      <h2>{title}</h2>
    </div>
  );
};

export default Banner;
