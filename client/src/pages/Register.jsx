import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-apollo";
import { ADD_USER } from "../mutations/addUser.js";
import PopUpMessage from "../components/popupMessage/PopUpMessage.jsx";
import "./style/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
    email: "",
    password: "",
    conformPassword: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim() ||
      !formData.age.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.conformPassword.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.zipCode.trim()
    ) {
      setMessage("Please fill up the required feilds");
      return;
    }

    if (formData.password !== formData.conformPassword) {
      setMessage("Passwords do not match");
      return;
    }

    addUser({
      variables: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        age: parseInt(formData.age),
        email: formData.email,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      },
    })
      .then((result) => {
        if (result) {
          setMessage("Your account has been successfully created");
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
            <form onSubmit={handleSubmit}>
              <h2>Create an account</h2>
              <div>
                <label>
                  First Name <span>*</span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
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
                    value={formData.lastName}
                    onChange={handleChange}
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
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Age <span>*</span>
                  <input
                    type="text"
                    name="age"
                    placeholder="18"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Email <span>*</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
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
              <div>
                <label>
                  Conformed Password <span>*</span>
                  <input
                    type="password"
                    name="conformPassword"
                    placeholder="Conform your password"
                    value={formData.conformPassword}
                    onChange={handleChange}
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
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="register-user-info">
                <label>
                  City <span>*</span>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city name"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Zip Code <span>*</span>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Enter your zip code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="form-register-btn">
                <Link to="/" className="btn-back">
                  Back
                </Link>
                <button type="submit" className="btn-register">
                  Register
                </button>
              </div>
            </form>
          </aside>
        </div>
      </section>
      <PopUpMessage message={message} success={success} />
    </div>
  );
};

export default Register;
