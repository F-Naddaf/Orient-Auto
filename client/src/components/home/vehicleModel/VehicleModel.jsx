import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import "./VehicleModel.css";

const getVehicleQuery = gql`
  {
    carCategories {
      name
      cars {
        id
        model
        mark
        year
        price
        doors
        image
        ac
        transmission
        fuel
      }
    }
  }
`;

const VehicleModel = (props) => {
  const [categories, setCategories] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  // const [desplayedImage, setDesplayedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleCarMarkClick = (car) => {
    setSelectedCar(car);
  };

  useEffect(() => {
    if (props.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setCategories(props.data.carCategories);
      // setDesplayedImage(props.data.carCategories[0]?.cars[0]?.image);
    }
  }, [props.data]);

  // console.log("displayed car", desplayedImage);
  return (
    <div className="vehicle-container">
      <div className="vehicle-header">
        <h5>Our Rental Fleet</h5>
        <h2>Vehicle Models</h2>
        <p>
          Choose from a variety of our amazing vehicles to rent for your next
          adventure or business trip
        </p>
      </div>
      <section className="vehicle-section">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <article className="vehicle-name">
            <ul className="vehicle-list">
              {categories?.map((category, index) => (
                <li className="car-model" key={index}>
                  {category.name}
                  <i className="fa-solid fa-chevron-right"></i>
                  <div>
                    <ul>
                      <ul className="car-mark">
                        {category.cars.map((car) => (
                          <li
                            key={car.id}
                            onClick={() => handleCarMarkClick(car)}
                          >
                            {car.mark}
                          </li>
                        ))}
                      </ul>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        )}
        <article className="vehicle-image">
          <div className="image-container">
            {selectedCar && <img src={selectedCar.image} alt="car image" />}
          </div>
        </article>
        <article className="vehicle-details">
          <div className="vehicle-rent">
            <h2>€{selectedCar?.price}</h2>
            <h3>Rent / day</h3>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Model</td>
                <td>{selectedCar?.model}</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>{selectedCar?.mark}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{selectedCar?.year}</td>
              </tr>
              <tr>
                <td>Doors</td>
                <td>{selectedCar?.doors}</td>
              </tr>
              <tr>
                <td>AC</td>
                <td>{selectedCar?.ac}</td>
              </tr>
              <tr>
                <td>Transmission</td>
                <td>{selectedCar?.transmission}</td>
              </tr>
              <tr>
                <td>Fuel</td>
                <td>{selectedCar?.fuel}</td>
              </tr>
            </tbody>
          </table>
          <button>Reserve Now</button>
        </article>
      </section>
    </div>
  );
};

export default graphql(getVehicleQuery)(VehicleModel);
