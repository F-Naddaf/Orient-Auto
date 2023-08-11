import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Banner from "../components/banner/Banner";
import BeatLoader from "react-spinners/BeatLoader";
import "./style/Orders.css";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user]);

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
            <div></div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Orders;
