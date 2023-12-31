import React from "react";
import "./Plan.css";

const Plan = () => {
  return (
    <div className="plan-container">
      <div className="plan-header">
        <h2>Three Simple Steps</h2>
        <p>
          Sign up in seconds, do the steps easily and start feeling your new
          experience
        </p>
      </div>
      <div className="plan-card-wrapper">
        <article>
          <img src="../../images/icons/select-car.png" alt="car" />
          <h3>01. Select Car</h3>
          <p>
            We offers a big range of vehicles for all your driving needs. We
            have the perfect car to meet your needs
          </p>
        </article>
        <article>
          <img src="../../images/icons/payment.png" alt="payment" />
          <h3>02. Easy payment</h3>
          <p>
            Enjoy hassle-free payment options for your car rental, making the
            process quick and easy.
          </p>
        </article>
        <article>
          <img src="../../images/icons/drive.png" alt="drive" />
          <h3>03. Make Trip</h3>
          <p>
            Whether you're hitting the open road, we've got you covered with our
            wide range of cars
          </p>
        </article>
      </div>
    </div>
  );
};

export default Plan;
