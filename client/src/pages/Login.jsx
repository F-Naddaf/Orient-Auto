import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";
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

  const { setUser } = useContext(AuthContext);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
      if (
        data &&
        data.loginUser &&
        data.loginUser.user &&
        data.loginUser.token
      ) {
        const { token } = data.loginUser;

        localStorage.setItem("accessToken", token);
        setUser(data.loginUser.user);

        setMessage("You have been logged in successfully");
        setSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error("Invalid response format from the server.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.message.includes("Invalid email or password")) {
        setMessage("Invalid email or password. Please try again.");
      } else {
        setMessage(
          "An error occurred while logging in. Please try again later."
        );
      }
      setSuccess(false);
    }
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
