import React, { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
// import { graphql } from "@apollo/client";
import { useQuery } from "@apollo/client";
// import { graphql } from "react-apollo";
import "./style/Vehicles.css";
import Banner from "../components/banner/Banner";
import { ALL_VEHICLES } from "../queries/allVehiclesQuery.js";
import { ALL_LOCATIONS } from "../queries/locationsQuery";

const VehicleModels = (props) => {
  const [cars, setCars] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: vehicleData } = useQuery(ALL_VEHICLES);
  const { data: locationData } = useQuery(ALL_LOCATIONS);

  useEffect(() => {
    const isDataLoaded = vehicleData && locationData;
    if (!isDataLoaded) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setCars(vehicleData.cars || []);
      setLocations(locationData.locations || []);
    }
  }, [vehicleData, locationData]);

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
      {isLoading ? (
        <div className="spinner">
          <BeatLoader color="#0e7cad" />
        </div>
      ) : (
        <div className="vehicles-container">
          {carWithAvailableLocations?.map((car) => (
            <article className="vehicle-card" key={car.id}>
              <img src={car.image} alt={car.mark} />
              <section className="car-info">
                <div className="price" id="flag">
                  <h3>€{car.price}</h3>
                  <p>per day</p>
                </div>
                <div className="model">
                  <h3>Model: {car.model}</h3>
                </div>
                <div className="car-details">
                  <aside>
                    <p>Mark: {car.mark}</p>
                    <p>AC: {car.ac}</p>
                    <p>Doors: {car.doors}</p>
                  </aside>
                  <aside>
                    <p>Year: {car.year}</p>
                    <p>Fuel: {car.fuel}</p>
                  </aside>
                </div>
              </section>
              <section className="location">
                <h4>Available at:</h4>
                <p>{car.location}</p>
              </section>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleModels;
