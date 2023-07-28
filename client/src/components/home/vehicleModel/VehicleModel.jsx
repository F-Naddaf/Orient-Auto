import React from "react";
import "./VehicleModel.css";

const VehicleModel = () => {
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
        <article className="vehicle-name">
          <ul className="vehicle-list">
            <li className="car-model">
              Toyota
              <i class="fa-solid fa-chevron-right"></i>
              <div>
                <ul className="car-mark">
                  <li>
                    <button>Aygo-X</button>
                  </li>
                  <li>
                    <button>Corolla</button>
                  </li>
                  <li>
                    <button>Camry</button>
                  </li>
                  <li>
                    <button>Touring</button>
                  </li>
                </ul>
              </div>
            </li>
            <li className="car-model">
              VolksWagen
              <i class="fa-solid fa-chevron-right"></i>
            </li>
            <li className="car-model">
              Kia
              <i class="fa-solid fa-chevron-right"></i>
            </li>
            <li className="car-model">
              BMW
              <i class="fa-solid fa-chevron-right"></i>
            </li>
            <li className="car-model">
              Renault
              <i class="fa-solid fa-chevron-right"></i>
            </li>
            <li className="car-model">
              Citroen
              <i class="fa-solid fa-chevron-right"></i>
            </li>
          </ul>
        </article>
        <article className="vehicle-image">
          <div className="image-container">
            <p>Car Image</p>
          </div>
        </article>
        <article className="vehicle-details">
          <div className="vehicle-rent">
            <h2>€45</h2>
            <h3>Rent / day</h3>
          </div>
          <table>
            <tr>
              <td>Model</td>
              <td>Toyota</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Camry</td>
            </tr>
            <tr>
              <td>Year</td>
              <td>2022</td>
            </tr>
            <tr>
              <td>Doors</td>
              <td>4/5</td>
            </tr>
            <tr>
              <td>AC</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Transmission</td>
              <td>Manual</td>
            </tr>
            <tr>
              <td>Fuel</td>
              <td>Gasoline</td>
            </tr>
          </table>
          {/* <ul>
            <li>Model</li>
            <li>Mark</li>
            <li>Year</li>
            <li>Doors</li>
            <li>AC</li>
            <li>Transmission</li>
            <li>Fuel</li>
          </ul> */}
          <button>Reserve Now</button>
        </article>
      </section>
    </div>
  );
};

export default VehicleModel;
