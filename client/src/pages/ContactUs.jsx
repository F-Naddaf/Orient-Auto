import React from "react";
import "./style/ContactUs.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="banner-wrapper">
        <img src="../images/about/about-banner.png" alt="banner" />
        <h2>Contact</h2>
      </div>
      <div className="contact-wrapper">
        <aside className="more-info">
          <h3>Need additional information?</h3>
          <p>
            A multifaceted professional skilled in multiple fields of research,
            development, and design with expertise in user interface. I am also
            adaptable and quick to learn.
          </p>
          <div className="info">
            <i className="fa-solid fa-phone"></i>
            <p>(+31) 684744280</p>
          </div>
          <div className="info">
            <i className="fa-solid fa-envelope"></i>
            <p>fady-naddaf@hotmail.com</p>
          </div>
          <div className="info">
            <i className="fa-solid fa-location-dot"></i>
            <p>Woerden, Utrecht</p>
          </div>
        </aside>
        <aside>
          <form>
            <label>
              Full Name <span>*</span>
            </label>
            <input placeholder='" Fadi Naddaf "' />

            <label>
              Email Address <span>*</span>
            </label>
            <input placeholder='" youremail@example.com "' />

            <label>
              Tell us about it <span>*</span>
            </label>
            <textarea placeholder='" Write here... "' />

            <button>
              <i className="fa-solid fa-envelope"></i>
              Send Message
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
