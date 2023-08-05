import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../mutations/loginUser.js";
import PopUpMessage from "../components/popupMessage/PopUpMessage.jsx";
import "./style/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginUser] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    })
      .then((result) => {
        if (result) {
          setMessage("You have been logged in successfully");
          setSuccess(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          setMessage(error.graphQLErrors[0].message);
        } else {
          setMessage("An error occurred while adding the user.");
        }
        setSuccess(false);
        setMessage("Error adding user:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="black"></div>
      <div className="orange"></div>
      <section>
        <div className="login-card">
          <aside className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <h2>Login your account</h2>
              <div>
                <label>
                  Email <span>*</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Password <span>*</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
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
      <PopUpMessage message={message} success={success} />
    </div>
  );
};

export default Login;
