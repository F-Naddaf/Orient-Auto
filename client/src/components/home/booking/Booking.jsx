import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_LOCATIONS } from "../../../queries/locationsQuery";
import { VEHICLE_CATEGORIES } from "../../../queries/vehicleCategories";
import Vautour from "../../vautour/Vautour";
import "./Booking.css";

const Booking = () => {
  const [selectedCarId, setSelectedCarId] = useState("");
  const [selectedPickUpLocation, setSelectedPickUpLocation] = useState("");
  const [selectedDropOfLocation, setSelectedDropOfLocation] = useState("");
  const [selectedPickDate, setSelectedPickDate] = useState("");
  const [selectedDropDate, setSelectedDropDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showVautour, setShowVautour] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const { data: vehicleData, loading: vehicleDataLoading } =
    useQuery(VEHICLE_CATEGORIES);
  const { data: locationData, loading: locationDataLoading } =
    useQuery(ALL_LOCATIONS);

  useEffect(() => {
    const isDataLoaded = vehicleData && locationData;
    if (!isDataLoaded || vehicleDataLoading || locationDataLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setCategories(vehicleData.carCategories);
      const allLocations = locationData.locations;
      const selectedCarLocation = allLocations
        ?.filter((location) =>
          location.cars.some((c) => c.car.id === selectedCarId)
        )
        .map((location) => location.place);
      setLocations(selectedCarLocation);
    }
  }, [
    vehicleData,
    locationData,
    selectedCarId,
    locationDataLoading,
    vehicleDataLoading,
  ]);

  const handleCarChange = (e) => {
    setSelectedCarId(e.target.value);
  };

  const handleReserveNow = (e) => {
    e.preventDefault();

    const form = e.target.form;
    if (!form.checkValidity()) {
      form.cars.value = "";
      form.pickUp.value = "";
      form.dropOf.value = "";
      form.pickDate.value = "";
      form.dropDate.value = "";
      setShowMessage(true);
      return;
    } else {
      setShowMessage(false);
    }

    const selectedCarIdFromEvent = form.cars.value;
    const selectedPickUpFromEvent = form.pickUp.value;
    const selectedDropOfFromEvent = form.dropOf.value;
    const selectedPickDateFormEvent = form.pickDate.value;
    const selectedDropDateFormEvent = form.dropDate.value;

    setSelectedCarId(selectedCarIdFromEvent);
    setSelectedPickUpLocation(selectedPickUpFromEvent);
    setSelectedDropOfLocation(selectedDropOfFromEvent);
    setSelectedPickDate(selectedPickDateFormEvent);
    setSelectedDropDate(selectedDropDateFormEvent);

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
        {showMessage && (
          <div className="message">
            <p>Please fill up the requirement feilds...</p>
          </div>
        )}
        <form className="booking-selector">
          <div>
            <label className="car-form-label">
              <i className="fa-solid fa-car"></i>
              <p>
                Select Your Car <span>*</span>
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
              <select name="pickUp" required>
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
              <select name="dropOf" required>
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
            <input
              className="select-date"
              name="pickDate"
              type="date"
              required
            />
          </div>
          <div>
            <label className="car-form-label">
              <i className="fa-regular fa-calendar-days"></i>
              <p>
                Drop-of-date <span>*</span>
              </p>
            </label>
            <input
              className="select-date"
              name="dropDate"
              type="date"
              required
            />
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
            selectedPickDate={selectedPickDate}
            selectedDropDate={selectedDropDate}
          />
        )}
      </div>
    </div>
  );
};

export default Booking;
