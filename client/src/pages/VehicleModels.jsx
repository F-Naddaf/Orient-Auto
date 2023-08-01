import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import "./style/VehicleModels.css";
import Banner from "../components/banner/Banner";

const getVehicleQuery = gql`
  {
    cars {
      id
      model
      mark
      price
      image
      year
      ac
      doors
      fuel
    }
  }
`;

const VehicleModels = (props) => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.data.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setCars(props.data.cars);
    }
  }, [props.data]);

  console.log(props);
  return (
    <div>
      <Banner title="Vehicle Models" />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="vehicles-container">
          {cars?.map((car) => (
            <article className="vehicle-card" key={car.id}>
              <img src={car.image} alt={car.mark} />
              <section className="car-info">
                <aside>
                  <h3>Model: {car.model}</h3>
                  <p>Mark: {car.mark}</p>
                  <p>AC: {car.ac}</p>
                  <p>Doors: {car.doors}</p>
                </aside>
                <aside>
                  <h3>
                    Price: <span>€{car.price}</span> / Day
                  </h3>
                  <p>Year: {car.year}</p>
                  <p>Fuel: {car.fuel}</p>
                </aside>
              </section>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default graphql(getVehicleQuery)(VehicleModels);
