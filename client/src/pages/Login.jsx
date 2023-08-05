import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="black"></div>
      <div className="orange"></div>
      <section>
        <div className="login-card">
          <aside className="form-wrapper">
            <form>
              <h2>Login your account</h2>
              <div>
                <label>
                  Email <span>*</span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    // value={formData.firstName}
                    // onChange={handleChange}
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
                    // value={formData.lastName}
                    // onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-login-btn">
                <Link to="/" className="btn-back">
                  Back
                </Link>
                <button type="submit" className="btn-login">
                  Login
                </button>
              </div>
            </form>
          </aside>
          <aside className="image-wrapper">
            <img
              className="login-image"
              src="../images/bmw-login.png"
              alt="banner"
            />
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Login;
