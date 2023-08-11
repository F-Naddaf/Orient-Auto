import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../mutations/addUser.js";
import PopUpMessage from "../components/popupMessage/PopUpMessage.jsx";
import "./style/Register.css";
import RegisterForm from "../components/forms/RegisterForm.jsx";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const [addUser] = useMutation(ADD_USER);

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
            <RegisterForm
              title="Create an account"
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </aside>
        </div>
      </section>
      <PopUpMessage message={message} success={success} />
    </div>
  );
};

export default Register;
