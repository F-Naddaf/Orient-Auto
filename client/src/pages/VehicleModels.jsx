import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import "./style/VehicleModels.css";
import Banner from "../components/banner/Banner";

const getVehicleQuery = gql`
  {
    locations {
      place
      cars {
        model
        mark
        image
      }
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
              <div>
                <h3>Model: {car.model}</h3>
                <h3>Mark: {car.mark}</h3>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default graphql(getVehicleQuery)(VehicleModels);
