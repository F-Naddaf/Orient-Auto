import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <aside className="space">
        <img src="../../images/logo-text.png" alt="logo" />
        <p className="footer-paragraph">
          We offers a big range of vehicles for all your driving needs. We have
          the perfect car to meet your needs.
        </p>
        <div className="my-contact-container">
          <div className="info">
            <i className="fa-solid fa-phone"></i>
            <p>(+31) 684744280</p>
          </div>
          <div className="info">
            <i className="fa-solid fa-envelope"></i>
            <p>fady-naddaf@hotmail.com</p>
          </div>
        </div>
      </aside>
      <aside className="space-company">
        <div className="company">
          <h3>COMPANY</h3>
          <Link to="/">Amsterdam</Link>
          <Link to="/">Careers</Link>
          <Link to="/">Mobile</Link>
          <Link to="/">Blog</Link>
          <Link to="/">How we work</Link>
        </div>
      </aside>
      <aside>
        <h3>WORKING HOURS</h3>
        <div className="working-hours">
          <p>Mon - Fri: 9:00AM - 9:00PM</p>
          <p>Sat: 9:00AM - 19:00PM</p>
          <p>Sun: Closed</p>
        </div>
      </aside>
      <aside className="space">
        <h3>SUBSCRIPTION</h3>
        <p>Subscribe your Email address for latest news & updates.</p>
        <div className="submit">
          <input type="email" placeholder="Enter email address" />
          <button>Submit</button>
        </div>
      </aside>
    </div>
  );
};

export default Footer;
