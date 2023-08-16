import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/client";
import { RESERVATIONS } from "../queries/reservations";
import Banner from "../components/banner/Banner";
import BeatLoader from "react-spinners/BeatLoader";
import OrderCard from "../components/orderCard/OrderCard";

import "./style/Orders.css";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const { user } = useContext(AuthContext);

  const { data } = useQuery(RESERVATIONS, {
    variables: { userId: user ? user.id : null },
  });

  /* Stringify the entire user object to track changes in user data within the useEffect.
  Otherwise, I would need to monitor specific fields in the user object for changes. */
  const userString = JSON.stringify(user);

  useEffect(() => {
    if (!userString) {
      setIsLoading(true);
      setReservations([]);
    } else {
      setIsLoading(false);
      if (data && data.userReservations) {
        setReservations(data.userReservations);
      }
    }
  }, [userString, data]);

  return (
    <div className="order-container">
      <Banner title="my orders" />
      <div className="order-section">
        <section className="header">
          <h3>order history...</h3>
        </section>
        <section className="order-wrapper">
          {isLoading ? (
            <div className="spinner">
              <BeatLoader color="#0e7cad" />
            </div>
          ) : (
            <div className="card-container">
              {reservations.map((reservation, index) => (
                <div key={index}>
                  <p className="order-num">Order No. {reservation.id}</p>
                  <OrderCard
                    key={reservation.id}
                    reservation={reservation}
                    user={user}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Orders;
