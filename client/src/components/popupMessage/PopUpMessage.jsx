import React, { useState, useEffect } from "react";
import "./PopUpMessage.css";

const PopUpMessage = ({ message, success }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);
  return (
    <div className={`popup-message-container ${visible ? "show-message" : ""}`}>
      {success ? (
        <div className="success-message-wrapper">
          <i className="fa-regular fa-circle-check"></i>
          <p>{message}</p>
        </div>
      ) : (
        <div className="unsuccess-message-wrapper">
          <i className="fa-regular fa-circle-xmark"></i>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default PopUpMessage;
