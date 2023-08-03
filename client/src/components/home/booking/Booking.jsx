import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Vautour from "../../../vautour/Vautour";
import "./Booking.css";

const getLocationQuery = gql`
  {
    locations {
      place
      cars {
        car {
          id
          model
          mark
        }
      }
    }
  }
`;

const getVehicleQuery = gql`
  {
    carCategories {
      name
      cars {
        id
        model
        mark
      }
    }
  }
`;

const Booking = (props) => {
  const [selectedCarId, setSelectedCarId] = useState("");
  const [selectedPickUpLocation, setSelectedPickUpLocation] = useState("");
  const [selectedDropOfLocation, setSelectedDropOfLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showVautour, setShowVautour] = useState(false);

  useEffect(() => {
    if (props.vehicleData.loading || props.locationData.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setCategories(props.vehicleData.carCategories);
    }

    const allLocations = props.locationData.locations;
    const selectedCarLocation = allLocations
      ?.filter((location) =>
        location.cars.some((c) => c.car.id === selectedCarId)
      )
      .map((location) => location.place);
    setLocations(selectedCarLocation);
  }, [props.vehicleData, props.locationData, selectedCarId]);

  const handleCarChange = (e) => {
    setSelectedCarId(e.target.value);
  };

  const handleReserveNow = (e) => {
    e.preventDefault();

    const selectedCarIdFromEvent = e.target.form.cars.value;
    const selectedPickUpFromEvent = e.target.form.pickUp.value;
    const selectedDropOfFromEvent = e.target.form.dropOf.value;

    setSelectedCarId(selectedCarIdFromEvent);
    setSelectedPickUpLocation(selectedPickUpFromEvent);
    setSelectedDropOfLocation(selectedDropOfFromEvent);

    setShowVautour(true);
    e.stopPropagation();
  };

  const handleCloseVautour = () => {
    setShowVautour(false);
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-conatiner" id="booking">
        <h1>Book a car</h1>
        <form className="booking-selector">
          <div>
            <label className="car-form-label">
              <i className="fa-solid fa-car"></i>
              <p>
                Select Your Car Type <span>*</span>
              </p>
            </label>
            <section className="select-conatiner">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <select
                  name="cars"
                  id="cars"
                  onChange={handleCarChange}
                  value={selectedCarId}
                >
                  <option value="">&#160; &#160; &#160; Select car type</option>
                  {categories.map((category, index) => (
                    <optgroup label={category.name} key={index}>
                      {category.cars.map((car) => (
                        <option value={car.id} key={car.id}>
                          {car.mark}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              )}
            </section>
          </div>
          <div>
            <label className="car-form-label">
              <i className="fa-solid fa-location-dot"></i>
              <p>
                Pick-up <span>*</span>
              </p>
            </label>
            <section className="select-conatiner">
              <select name="pickUp">
                <option value="select">
                  &#160; &#160; &#160; Select pick up location
                </option>
                {locations &&
                  locations.map((location, index) => (
                    <option value={location} key={index}>
                      &#160; {location}
                    </option>
                  ))}
              </select>
            </section>
          </div>
          <div>
            <label className="car-form-label">
              <i className="fa-solid fa-location-dot"></i>
              <p>
                Drop-of <span>*</span>
              </p>
            </label>
            <section className="select-conatiner">
              <select name="dropOf">
                <option value="select">
                  &#160; &#160; &#160; Select pick up location
                </option>
                {locations &&
                  locations.map((location, index) => (
                    <option value={location} key={index}>
                      &#160; {location}
                    </option>
                  ))}
              </select>
            </section>
          </div>
          <div>
            <label className="car-form-label">
              <i className="fa-regular fa-calendar-days"></i>
              <p>
                Pick-up-date <span>*</span>
              </p>
            </label>
            <input className="select-date" type="date" />
          </div>
          <div>
            <label className="car-form-label">
              <i className="fa-regular fa-calendar-days"></i>
              <p>
                Drop-of-date <span>*</span>
              </p>
            </label>
            <input className="select-date" type="date" />
          </div>
          <button className="reserve-btn" onClick={handleReserveNow}>
            Reserve Now
          </button>
        </form>
        {showVautour && (
          <Vautour
            onClose={handleCloseVautour}
            selectedCarId={selectedCarId}
            selectedPickUpLocation={selectedPickUpLocation}
            selectedDropOfLocation={selectedDropOfLocation}
          />
        )}
      </div>
    </div>
  );
};

export default graphql(getVehicleQuery, { name: "vehicleData" })(
  graphql(getLocationQuery, { name: "locationData" })(Booking)
);
