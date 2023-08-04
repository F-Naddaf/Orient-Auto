import React from "react";
import { Link } from "react-router-dom";
import "./style/Register.css";

const Register = () => {
  return (
    <div className="register-container">
      <div className="orange"></div>
      <div className="blue"></div>

      <section>
        <div className="register-card">
          <aside className="image-wrapper">
            <img
              className="register-image"
              src="../images/Land-Rover.png"
              alt="banner"
            />
          </aside>
          <aside className="form-wrapper">
            <form>
              <h2>Create an account</h2>
              <div>
                <label>
                  First Name <span>*</span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Last Name <span>*</span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                  />
                </label>
              </div>
              <div className="register-user-info">
                <label>
                  Phone Number <span>*</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Example: 0612345678"
                    required
                  />
                </label>
                <label>
                  Age <span>*</span>
                  <input type="number" name="age" placeholder="18" required />
                </label>
              </div>
              <div>
                <label>
                  Email <span>*</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Address <span>*</span>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your street address"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  City <span>*</span>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city name"
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Zip Code <span>*</span>
                  <input
                    type="text"
                    name="zip-code"
                    placeholder="Enter your zip code"
                    required
                  />
                </label>
              </div>
              <div className="form-register-btn">
                <Link to="/" className="btn-back">
                  Back
                </Link>
                <button className="btn-register">Register</button>
              </div>
            </form>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Register;
