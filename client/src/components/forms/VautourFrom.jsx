import React from "react";
import "./VautourForm.css";

const VautourForm = ({
  formData,
  handleChange,
  handleSubmit,
  error,
  success,
  message,
  title,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h5>{title}</h5>
      <div className="vautour-user-info">
        <label>
          First Name <span>*</span>
          <input
            type="text"
            name="user.firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <p>This field is required.</p>
        </label>
        <label>
          Last Name <span>*</span>
          <input
            type="text"
            name="user.lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <p>This field is required.</p>
        </label>
      </div>
      <div className="vautour-user-info">
        <label>
          Phone Number <span>*</span>
          <input
            type="tel"
            name="user.phone"
            placeholder="Example: 0612345678"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <p>This field is required.</p>
        </label>
        <label>
          Age <span>*</span>
          <input
            type="number"
            name="user.age"
            placeholder="18"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <p>This field is required.</p>
        </label>
      </div>
      <div className="vautour-user-info">
        <label>
          Email <span>*</span>
          <input
            type="email"
            name="user.email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <p>This field is required.</p>
        </label>
        <label>
          Address <span>*</span>
          <input
            type="text"
            name="user.address"
            placeholder="Enter your street address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <p>This field is required.</p>
        </label>
      </div>
      <div className="vautour-user-info">
        <label>
          City <span>*</span>
          <input
            type="text"
            name="user.city"
            placeholder="Enter your city name"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <p>This field is required.</p>
        </label>
        <label>
          Zip Code <span>*</span>
          <input
            type="text"
            name="user.zipCode"
            placeholder="Enter your zip code"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <p>This field is required.</p>
        </label>
      </div>
      <div className="checkbox-wrapper">
        <label>
          <input type="checkbox" />
          Please send me latest news and updates
        </label>
      </div>
      {error && (
        <div className="error-message">
          <p>{message}</p>
        </div>
      )}
      {success && (
        <div className="success-message">
          <p>{message}</p>
        </div>
      )}
      <div className="form-reserve-btn">
        <button onClick={handleSubmit} className="btn-reserve">
          Reserve Now
        </button>
      </div>
    </form>
  );
};

export default VautourForm;
