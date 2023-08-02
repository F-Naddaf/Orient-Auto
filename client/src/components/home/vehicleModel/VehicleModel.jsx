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
  const [desplayedCar, setDesplayedCar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleCarMarkClick = (car) => {
    setSelectedCar(car);
  };

  useEffect(() => {
    if (props.data.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setCategories(props.data.carCategories);
      setDesplayedCar(props.data?.carCategories[0]?.cars[0]);
    }
  }, [props.data]);

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
            {selectedCar && selectedCar ? (
              <img src={selectedCar.image} alt={selectedCar.mark} />
            ) : (
              <img src={desplayedCar.image} alt={desplayedCar.mark} />
            )}
          </div>
        </article>
        <article className="vehicle-details">
          <div className="vehicle-rent">
            <h2>€{selectedCar ? selectedCar?.price : desplayedCar?.price}</h2>
            <h3>Rent / day</h3>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Model</td>
                <td>{selectedCar ? selectedCar.model : desplayedCar?.model}</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>{selectedCar ? selectedCar.mark : desplayedCar?.mark}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{selectedCar ? selectedCar.year : desplayedCar?.year}</td>
              </tr>
              <tr>
                <td>Doors</td>
                <td>{selectedCar ? selectedCar.doors : desplayedCar?.doors}</td>
              </tr>
              <tr>
                <td>AC</td>
                <td>{selectedCar ? selectedCar.ac : desplayedCar?.ac}</td>
              </tr>
              <tr>
                <td>Transmission</td>
                <td>
                  {selectedCar
                    ? selectedCar.transmission
                    : desplayedCar?.transmission}
                </td>
              </tr>
              <tr>
                <td>Fuel</td>
                <td>{selectedCar ? selectedCar.fuel : desplayedCar?.fuel}</td>
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
