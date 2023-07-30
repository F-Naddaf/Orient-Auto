import React from "react";
import { Link } from "react-router-dom";
import "./style/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="banner-wrapper">
        <img src="../images/about/about-banner.png" alt="banner" />
        <h2>About Us</h2>
      </div>
      <div className="about-company">
        <img src="../images/about/office.png" alt="banner" />
        <section>
          <h2>
            WELCOME <span>TO ORIENT AUTO</span>
          </h2>
          <span className="line"></span>
          <h5>
            Orient auto started offering Short Rent contracts more than ten
            years ago.
          </h5>
          <p>
            We offer both <strong>business</strong> and <strong>private</strong>{" "}
            motorists a wide short-lease range of cars and options. With a
            combination of flexibility, versatility, service and{" "}
            <strong>competitive rates</strong> , we have already been able to
            serve many customers, often regular customers that we look forward
            to seeing again and again.
          </p>
        </section>
      </div>
      <div className="about-company">
        <section>
          <h2>FOCUSED ON COMMUNICATION</h2>
          <span className="line"></span>
          <p>
            A <strong>fast and targeted service</strong> , that is what we stand
            for. From choosing a suitable car to returning it at the end of the
            lease contract, we are always there for you. Communication is of
            paramount importance to us. Not only are we easily accessible, we
            ensure that every customer is helped{" "}
            <strong>as quickly as possible</strong> by expert employees.
          </p>
          <div>
            <p className="reach-us">
              Reach us by phone at 0348-467657 or by e-mail at:
            </p>
            <Link to="/">fady-naddaf@hotmail.com</Link>
          </div>
        </section>
        <img src="../images/about/communication.png" alt="banner" />
      </div>
      <div className="about-company">
        <img src="../images/about/offer.png" alt="banner" />
        <section>
          <h2>EXTENSIVE VEHICLE FLEET</h2>
          <span className="line"></span>
          <p>
            Over the years, our fleet has expanded considerably with a{" "}
            <strong>wide range</strong> of makes and models. We offer the right
            solution for every application and <strong>every budget</strong> .
            You can view our range at your leisure via the website. Of course
            you can always contact us for more information or to submit your
            specific wishes to us.
          </p>
          <button>view our complete offer</button>
        </section>
      </div>
      <div className="about-company">
        <section>
          <h2>FULL OPERATIONAL SHORT RENT</h2>
          <span className="line"></span>
          <div>
            <h5>It's a popular term in the lease world, we make it happen!</h5>
            <p>
              Each short rent contract offers all the necessary services that
              you as a motorist need. A 24-hour emergency center, maintenance
              and repair, replacement transport and{" "}
              <strong>All-Risk insurance</strong> at a <strong>fixed</strong>{" "}
              monthly rate. In addition, we offer extra options such as winter
              tires, navigation or custom solutions. Do you want us to collect
              the car after the term of the short lease contract? No problem!
              You can also contact Select Car Lease for repairs and maintenance.
            </p>
          </div>
          <button>request a quote without obligation</button>
        </section>
        <img src="../images/about/service.png" alt="banner" />
      </div>
    </div>
  );
};

export default About;
