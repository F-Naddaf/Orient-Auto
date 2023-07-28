import React from "react";
import "./Booking.css";

const Booking = () => {
  return (
    <div className="booking-conatiner" id="booking">
      <h1>Book a car</h1>
      <form className="booking-selector">
        <div>
          <label className="car-form-label">
            <i class="fa-solid fa-car"></i>
            <p>
              Select Your Car Type <span>*</span>
            </p>
          </label>
          <section className="select-conatiner">
            <select name="cars" id="cars">
              <option value="">&#160; &#160; &#160; Select car type</option>
              <optgroup label="Toyota">
                <option value="corolla">&#160; Corolla</option>
                <option value="camry">&#160; Camry</option>
                <option value="aygo">&#160; Aygo X</option>
                <option value="touring">&#160; Corolla Touring</option>
              </optgroup>
              <optgroup label="VolksWagen">
                <option value="golf">&#160; Golf</option>
                <option value="polo">&#160; Polo</option>
                <option value="id3">&#160; ID3</option>
                <option value="touareg">&#160; Touareg</option>
              </optgroup>
              <optgroup label="Renault">
                <option value="captur">&#160; Captur</option>
                <option value="clio">&#160; Clio</option>
              </optgroup>
              <optgroup label="Citroen">
                <option value="c3">&#160; C3</option>
                <option value="c">&#160; C</option>
                <option value="c4">&#160; C4 Cactus</option>
              </optgroup>
              <optgroup label="Kia">
                <option value="proceed">&#160; Proceed</option>
                <option value="rio">&#160; Rio</option>
                <option value="sportage">&#160; Sportage</option>
              </optgroup>
              <optgroup label="BMW">
                <option value="i5">&#160; i5</option>
                <option value="ix1">&#160; iX1</option>
              </optgroup>
            </select>
          </section>
        </div>
        <div>
          <label className="car-form-label">
            <i class="fa-solid fa-location-dot"></i>
            <p>
              Pick-up <span>*</span>
            </p>
          </label>
          <section className="select-conatiner">
            <select name="pick-up">
              <option value="select">
                &#160; &#160; &#160; Select pick up location
              </option>
              <option value="utrecht">&#160; Utrecht</option>
              <option value="amsterdam">&#160; Amsterdam</option>
              <option value="rotterdam">&#160; Rotterdam</option>
              <option value="denHaag">&#160; DenHaag</option>
              <option value="zwolle">&#160; Zwolle</option>
            </select>
          </section>
        </div>
        <div>
          <label className="car-form-label">
            <i class="fa-solid fa-location-dot"></i>
            <p>
              Drop-of <span>*</span>
            </p>
          </label>
          <section className="select-conatiner">
            <select name="drop-of">
              <option value="select">
                &#160; &#160; &#160; Select pick up location
              </option>
              <option value="utrecht">&#160; Utrecht</option>
              <option value="amsterdam">&#160; Amsterdam</option>
              <option value="rotterdam">&#160; Rotterdam</option>
              <option value="denHaag">&#160; DenHaag</option>
              <option value="zwolle">&#160; Zwolle</option>
            </select>
          </section>
        </div>
        <div>
          <label className="car-form-label">
            <i class="fa-regular fa-calendar-days"></i>
            <p>
              Pick-up-date <span>*</span>
            </p>
          </label>
          <input className="select-date" type="date" />
        </div>
        <div>
          <label className="car-form-label">
            <i class="fa-regular fa-calendar-days"></i>
            <p>
              Drop-of-date <span>*</span>
            </p>
          </label>
          <input className="select-date" type="date" />
        </div>
        <button className="reserve-btn">Reserve Now</button>
      </form>
    </div>
  );
};

export default Booking;
