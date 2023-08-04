import React, { useEffect, useRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { graphql } from "react-apollo";
import { VEHICLE_BY_ID } from "../queries/vehicleById";
import "./Vautour.css";

const Vautour = ({
  data,
  onClose,
  selectedCarId,
  selectedPickUpLocation,
  selectedDropOfLocation,
  selectedPickDate,
  selectedDropDate,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [car, setCar] = useState(null);
  const vautourRef = useRef();

  useEffect(() => {
    if (data && data.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      if (data && data.car) {
        setCar(data.car);
      }
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (vautourRef.current && !vautourRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="vautour-cantainer">
      {isLoading ? (
        <div className="spinner">
          <BeatLoader color="#0e7cad" />
        </div>
      ) : (
        <div className="vautour-wrapper" ref={vautourRef}>
          <header>
            <h2>complete reservation</h2>
            <button onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </header>
          <section className="about-reservation">
            <div>
              <i className="fa-solid fa-circle-info"></i>
              <h3>
                Upon completing this reservation enquiry, you will receive:
              </h3>
            </div>
            <div>
              <p>
                Your rental voucher to produce on arrival at the rental desk and
                a toll-free customer support number.
              </p>
            </div>
          </section>
          <section className="reservation-details">
            <aside>
              <div>
                <h5>Location & Date</h5>
              </div>
              <div className="reserve-info">
                <div>
                  <i className="fa-regular fa-calendar-days"></i>
                  <h6>Pick-Up Date & Time</h6>
                </div>
                <span>
                  <p>{selectedPickDate} /</p>
                  <input type="time" className="input-time" />
                </span>
              </div>
              <div className="reserve-info">
                <div>
                  <i className="fa-regular fa-calendar-days"></i>
                  <h6>Drop-Off Date & Time</h6>
                </div>
                <p>
                  {selectedDropDate} /
                  <input type="time" className="input-time" />
                </p>
              </div>
              <div className="reserve-info">
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                  <h6>Pick-Up Location</h6>
                </div>
                <p>{selectedPickUpLocation}</p>
              </div>
              <div className="reserve-info">
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                  <h6>Drop-Off Location</h6>
                </div>
                <p>{selectedDropOfLocation}</p>
              </div>
            </aside>
            <aside className="vehicle-type-wrapper">
              <div>
                <h6>Car: </h6>
                <h5 className="vehicle-type">
                  {car.model} {car.mark}
                </h5>
              </div>
              <img src={car.image} alt={car.mark} />
            </aside>
          </section>
          <div className="line"></div>
          {/* USer information form */}
          <section>
            <form>
              <h5>personal information</h5>
              <div className="vautour-user-info">
                <label>
                  First Name <span>*</span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                  />
                  <p>This field is required.</p>
                </label>
                <label>
                  Last Name <span>*</span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                  />
                  <p>This field is required.</p>
                </label>
              </div>
              <div className="vautour-user-info">
                <label>
                  Phone Number <span>*</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Example: 0612345678"
                    required
                  />
                  <p>This field is required.</p>
                </label>
                <label>
                  Age <span>*</span>
                  <input type="number" name="age" placeholder="18" required />
                  <p>This field is required.</p>
                </label>
              </div>
              <div className="vautour-user-info">
                <label>
                  Email <span>*</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                  />
                  <p>This field is required.</p>
                </label>
                <label>
                  Address <span>*</span>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your street address"
                    required
                  />
                  <p>This field is required.</p>
                </label>
              </div>
              <div className="vautour-user-info">
                <label>
                  City <span>*</span>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city name"
                    required
                  />
                  <p>This field is required.</p>
                </label>
                <label>
                  Zip Code <span>*</span>
                  <input
                    type="text"
                    name="zip-code"
                    placeholder="Enter your zip code"
                    required
                  />
                  <p>This field is required.</p>
                </label>
              </div>
              <div className="checkbox-wrapper">
                <label>
                  <input type="checkbox" />
                  Please send me latest news and updates
                </label>
              </div>
              <div className="form-reserve-btn">
                <button className="btn-reserve">Reserve Now</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default graphql(VEHICLE_BY_ID, {
  name: "data",
  options: (props) => ({
    variables: { id: props.selectedCarId },
  }),
})(Vautour);
