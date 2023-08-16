import React, { useEffect, useRef, useState, useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/authContext";
import { ADD_VAUTOUR } from "../../mutations/addVautour";
import { VEHICLE_BY_ID } from "../../queries/vehicleById";
import VautourForm from "../forms/VautourFrom";
import "./Vautour.css";

const Vautour = ({
  onClose,
  selectedCarId,
  selectedPickUpLocation,
  selectedDropOfLocation,
  selectedPickDate,
  selectedDropDate,
}) => {
  const { user } = useContext(AuthContext);
  const vautourRef = useRef();
  const token = localStorage.getItem("accessToken");

  const [isLoading, setIsLoading] = useState(true);
  const [car, setCar] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

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
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const emptyFields = requiredFields.filter((field) => {
      const fieldKeys = field.split(".");
      let fieldValue = reservationData;
      for (const key of fieldKeys) {
        if (fieldValue.hasOwnProperty(key)) {
          fieldValue = fieldValue[key];
        } else {
          fieldValue = null;
          break;
        }
      }
      return (
        !fieldValue || (typeof fieldValue === "string" && !fieldValue.trim())
      );
    });

    if (emptyFields.length > 0) {
      setError(true);
      setMessage(
        `Please fill up the required fields: ${emptyFields.join(", ")}`
      );
      return;
    }

    const mutationVariables = {
      ...reservationData.user,
      age: parseInt(reservationData.user.age),
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
              <div className="location-wrapper">
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
            <VautourForm
              title="personal information"
              formData={reservationData.user}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              error={error}
              success={success}
              message={message}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default Vautour;
