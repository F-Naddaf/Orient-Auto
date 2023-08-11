import React from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css"

const RegisterForm = ({ formData, handleChange, handleSubmit, title }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
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
  );
};

export default RegisterForm;
