import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import "./style/VehicleModels.css";
import Banner from "../components/banner/Banner";

const getLocationQuery = gql`
  {
    locations {
      place
      cars {
        car {
          id
          model
          mark
          year
          price
          doors
          image
          ac
        }
      }
    }
  }
`;

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
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.vehicleData.loading || props.locationData.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setCars(props.vehicleData.cars);
      setLocations(props.locationData.locations);
    }
  }, [props.vehicleData, props.locationData]);

  const carWithAvailableLocations = cars.map((car) => {
    const locationsArray = locations
      .filter((location) => location.cars.some((c) => c.car.id === car.id))
      .map((location) => location.place);

    const locationString = locationsArray.join(", ");

    return { ...car, location: locationString };
  });

  return (
    <div>
      <Banner title="Vehicle Models" />
      <div className="vehicles-container">
        {carWithAvailableLocations?.map((car) => (
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
            <section className="location">
              <h4>Available at:</h4>
              <p>{car.location}</p>
            </section>
          </article>
        ))}
      </div>
    </div>
  );
};

export default graphql(getVehicleQuery, { name: "vehicleData" })(
  graphql(getLocationQuery, { name: "locationData" })(VehicleModels)
);
