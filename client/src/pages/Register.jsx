import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-apollo";
import { ADD_USER } from "../mutations/addUser.js";
import "./style/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
    email: "",
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
    console.log("before", formData);
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim() ||
      !formData.age.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.zipCode.trim()
    ) {
      return;
    }
    console.log("after", formData);

    addUser({
      variables: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        age: parseInt(formData.age),
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      },
    })
      .then((result) => {
        console.log("User added successfully:", result);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
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
              <div>
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
              </div>
              <div>
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
    </div>
  );
};

export default Register;
