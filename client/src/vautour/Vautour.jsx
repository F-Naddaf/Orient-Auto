import React, { useEffect, useRef, useState, useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/authContext";
import { ADD_VAUTOUR } from "../mutations/addVautour.js";
import { VEHICLE_BY_ID } from "../queries/vehicleById";
import "./Vautour.css";

const Vautour = ({
  onClose,
  selectedCarId,
  selectedPickUpLocation,
  selectedDropOfLocation,
  selectedPickDate,
  selectedDropDate,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("accessToken");
  const vautourRef = useRef();
  const [reservationData, setReservationData] = useState({
    pickUpLocation: selectedPickUpLocation,
    dropOfLocation: selectedDropOfLocation,
    pickUpdate: selectedPickDate,
    dropOfdate: selectedDropDate,
    pickUpTime: "",
    dropOfTime: "",
    user: {
      firstName: user ? user.firstName : "",
      lastName: user ? user.lastName : "",
      phone: user ? user.phone : "",
      age: user ? user.age : "",
      email: user ? user.email : "",
      address: user ? user.address : "",
      city: user ? user.city : "",
      zipCode: user ? user.zipCode : "",
      userId: user ? user.id : "",
    },
    carId: selectedCarId,
  });

  const { data } = useQuery(VEHICLE_BY_ID, {
    variables: { id: selectedCarId },
  });

  const [AddReservation] = useMutation(ADD_VAUTOUR);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((data) => {
      const newData = { ...data };
      if (name.startsWith("user.")) {
        const userField = name.substring(5);
        newData.user[userField] = value;
      } else if (name === "pickUpTime" || name === "dropOfTime") {
        newData[name] = value;
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = [];

    const requiredFields = [
      "pickUpTime",
      "dropOfTime",
      "user.firstName",
      "user.lastName",
      "user.phone",
      "user.age",
      "user.email",
      "user.address",
      "user.city",
      "user.zipCode",
    ];

    requiredFields.forEach((field) => {
      const value = field
        .split(".")
        .reduce((obj, key) => obj && obj[key], reservationData);

      if (!value || (typeof value === "string" && !value.trim())) {
        emptyFields.push(field);
      }
    });

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.join(", ");
      setError(true);
      setMessage(`Please fill up the required fields: ${emptyFieldNames}`);
      return;
    }

    const mutationVariables = {
      firstName: reservationData.user.firstName,
      lastName: reservationData.user.lastName,
      phone: reservationData.user.phone,
      age: parseInt(reservationData.user.age),
      email: reservationData.user.email,
      address: reservationData.user.address,
      city: reservationData.user.city,
      zipCode: reservationData.user.zipCode,
      pickUpLocation: reservationData.pickUpLocation,
      dropOfLocation: reservationData.dropOfLocation,
      pickUpdate: reservationData.pickUpdate,
      dropOfdate: reservationData.dropOfdate,
      pickUpTime: reservationData.pickUpTime,
      dropOfTime: reservationData.dropOfTime,
      carId: reservationData.carId,
    };

    if (user) {
      mutationVariables.userId = reservationData.user.userId;
    }

    if (token) {
      mutationVariables.token = token;
    }

    AddReservation({
      variables: mutationVariables,
    })
      .then((result) => {
        if (result) {
          setSuccess(true);
          setError(false);
          setMessage("Your account has been successfully created");
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      })
      .catch((error) => {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          setError(true);
          setMessage(error.graphQLErrors[0].message);
        } else {
          setError(true);
          setMessage("An error occurred while adding the user.");
        }
      });
  };

  useEffect(() => {
    if (!data) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setCar(data.car);
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
                  <input
                    type="time"
                    className="input-time"
                    name="pickUpTime"
                    value={reservationData.pickUpTime}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="reserve-info">
                <div>
                  <i className="fa-regular fa-calendar-days"></i>
                  <h6>Drop-Off Date & Time</h6>
                </div>
                <p>
                  {selectedDropDate} /
                  <input
                    type="time"
                    className="input-time"
                    name="dropOfTime"
                    value={reservationData.dropOfTime}
                    onChange={handleChange}
                  />
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
          <section>
            <form>
              <h5>personal information</h5>
              <div className="vautour-user-info">
                <label>
                  First Name <span>*</span>
                  <input
                    type="text"
                    name="user.firstName"
                    placeholder="Enter your first name"
                    value={reservationData.user.firstName}
                    onChange={handleChange}
                    required
                  />
                  <p>This field is required.</p>
                </label>
                <label>
                  Last Name <span>*</span>
                  <input
                    type="text"
                    name="user.lastName"
                    placeholder="Enter your last name"
                    value={reservationData.user.lastName}
                    onChange={handleChange}
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
                    name="user.phone"
                    placeholder="Example: 0612345678"
                    value={reservationData.user.phone}
                    onChange={handleChange}
                    required
                  />
                  <p>This field is required.</p>
                </label>
                <label>
                  Age <span>*</span>
                  <input
                    type="number"
                    name="user.age"
                    placeholder="18"
                    value={reservationData.user.age}
                    onChange={handleChange}
                    required
                  />
                  <p>This field is required.</p>
                </label>
              </div>
              <div className="vautour-user-info">
                <label>
                  Email <span>*</span>
                  <input
                    type="email"
                    name="user.email"
                    placeholder="email@example.com"
                    value={reservationData.user.email}
                    onChange={handleChange}
                    required
                  />
                  <p>This field is required.</p>
                </label>
                <label>
                  Address <span>*</span>
                  <input
                    type="text"
                    name="user.address"
                    placeholder="Enter your street address"
                    value={reservationData.user.address}
                    onChange={handleChange}
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
                    name="user.city"
                    placeholder="Enter your city name"
                    value={reservationData.user.city}
                    onChange={handleChange}
                    required
                  />
                  <p>This field is required.</p>
                </label>
                <label>
                  Zip Code <span>*</span>
                  <input
                    type="text"
                    name="user.zipCode"
                    placeholder="Enter your zip code"
                    value={reservationData.user.zipCode}
                    onChange={handleChange}
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
              {error && (
                <div className="error-message">
                  <p>{message}</p>
                </div>
              )}
              {success && (
                <div className="success-message">
                  <p>{message}</p>
                </div>
              )}
              <div className="form-reserve-btn">
                <button onClick={handleSubmit} className="btn-reserve">
                  Reserve Now
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default Vautour;
