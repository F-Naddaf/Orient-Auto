import React, { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Banner from "../components/banner/Banner";
import BeatLoader from "react-spinners/BeatLoader";

import "./style/Profile.css";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="profile-container">
      <Banner title="my profile" />
      <div className="profile-section">
        <section className="header">
          <h3>Personal information</h3>
        </section>
        <section className="profile-wrapper">
          {isLoading ? (
            <div className="spinner">
              <BeatLoader color="#0e7cad" />
            </div>
          ) : (
            <>
              <table className="user-info">
                <tr>
                  <td>First Name:</td>
                  <td>{user.firstName}</td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>{user.lastName}</td>
                </tr>
                <tr>
                  <td>Email address:</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Phone number:</td>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <td>Age:</td>
                  <td>{user.age}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>{user.address}</td>
                </tr>
                <tr>
                  <td>City:</td>
                  <td>{user.city}</td>
                </tr>
                <tr>
                  <td>Zip-code:</td>
                  <td>{user.zipCode}</td>
                </tr>
              </table>
            </>
          )}
          <button className="edit-profile">
          <i className="fa-solid fa-pen"></i>
            Edit
            </button>
        </section>
      </div>
    </div>
  );
};

export default Profile;
