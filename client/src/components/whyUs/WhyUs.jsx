import React from "react";
import { Link } from "react-router-dom";

import "./WhyUs.css";

const WhyUs = () => {
  return (
    <section className="why-us-container">
      <div className="header">
        <h2>Save big with our cheap car rental!</h2>
        <p>
          Top Airports. Local Suppliers. <span>24/7</span> Support.
        </p>
      </div>
      <div className="image-container">
        <img src="../../images/why-us.png" alt="" />
      </div>
      <div className="description">
        <aside className="aside-left">
          <h3>Why Choose Us</h3>
          <h2>Best valued deals you will ever find</h2>
          <p>
            Discover the best deals you'll ever find with our unbeatable offers.
            We're dedicated to providing you with the best value for your money,
            so you can enjoy top-quality services and products without breaking
            the bank. Our deals are designed to give you the ultimate renting
            experience, so don't miss out on your chance to save big.
          </p>
          <Link to="/about">Find More...</Link>
        </aside>
        <aside className="aside-right">
          <article>
            <div>
              <img src="../../images/country-drive.png" alt="" />
            </div>
            <div>
              <h3>Cross Country Drive</h3>
              <p>
                Take your driving experience to the next level with our
                top-notch vehicles for your cross-country adventures.
              </p>
            </div>
          </article>
          <article>
            <div>
              <img src="../../images/included.png" alt="" />
            </div>
            <div>
              <h3>All Inclusive Pricing</h3>
              <p>
                Get everything you need in one convenient, transparent price
                with our all-inclusive pricing policy.
              </p>
            </div>
          </article>
          <article>
            <div>
              <img src="../../images/hidden-charges.png" alt="" />
            </div>
            <div>
              <h3>No Hidden Charges</h3>
              <p>
                Enjoy peace of mind with our no hidden charges policy. We
                believe in transparent and honest pricing.
              </p>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
};

export default WhyUs;
