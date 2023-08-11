import React from "react";
import "./OrderCard.css";

const OrderCard = ({ user, reservation }) => {
  const pickUpDate = new Date(reservation.pickUpdate);
  const dropOfDate = new Date(reservation.dropOfdate);

  const totalRentTime = dropOfDate - pickUpDate;
  const daysOfRent = totalRentTime / (1000 * 3600 * 24);

  const total = daysOfRent * reservation.carId.price;

  return (
    <div className="order-card-container">
      <aside className="image-wrapper">
        <img src={reservation.carId.image} alt="reservation.carId.mark" />
      </aside>
      <aside className="card-info">
        <div className="main-info">
          <h3 className="model">
            {reservation.carId.model} {reservation.carId.mark}
          </h3>
          <div>
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Email: {user.email}</p>
          </div>
        </div>
        <div className="rent-details">
          <div className="location-wrapper">
            <p className="location">
              Pick-up: {reservation.pickUpLocation} / Drop-of:{" "}
              {reservation.dropOfLocation}
            </p>
          </div>
          <div className="rent-info">
            <aside>
              <p>Pick-up date: {reservation.pickUpdate}</p>
              <p>Pick-up time: {reservation.pickUpTime}</p>
              <p>Price / day: €{reservation.carId.price}</p>
            </aside>
            <aside>
              <p>Drop-of date: {reservation.dropOfdate}</p>
              <p>Drop-of time: {reservation.dropOfTime}</p>
              <p>Days of rent: {daysOfRent} Days</p>
            </aside>
          </div>
          <div className="price-wrapper">
            <h3>Total: €{total}</h3>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default OrderCard;
