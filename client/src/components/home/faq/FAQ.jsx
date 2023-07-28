import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleToggleAnswer = (index) => {
    setCurrentQuestion((itemIndex) => (itemIndex === index ? null : index));
  };

  const faqData = [
    {
      question: "1. What is special about comparing rental car deals?",
      answer:
        "Comparing rental car deals is important as it helps find the best deal that fits your budget and requirements, ensuring you get the most value for your money. By comparing various options, you can find deals that offer lower prices, additional services, or better car models. You can find car rental deals by researching online and comparing prices from different rental companies.",
    },
    {
      question: "2. How do I find the car rental deals?",
      answer:
        "You can find car rental deals by researching online and comparing prices from different rental companies. Websites suchas Expedia, Kayak, and Travelocity allow you to compare pricesand view available rental options. It is also recommended tosign up for email newsletters and follow rental car companies onsocial media to be informed of any special deals or promotions.",
    },
    {
      question: "3. How do I find such low rental car prices?",
      answer:
        "Book in advance: Booking your rental car ahead of time can often result in lower prices. Compare prices from multiple companies: Use websites like Kayak, Expedia, or Travelocity to compare prices from multiple rental car companies. Look for discount codes and coupons: Search for discount codes and coupons that you can use to lower the rental price. Renting from an off-airport location can sometimes result in lower prices.",
    },
  ];

  return (
    <div className="FAQ-container">
      <div className="FAQ-wrapper">
        <div className="FAQ-header">
          <h5>FAQ</h5>
          <h2>Frequently Asked Questions</h2>
          <p>
            Frequently Asked Questions About the Car Rental Booking Process on
            Our Website: Answers to Common Concerns and Inquiries.
          </p>
        </div>
        <img
          src="../../../images/mini-copper-1.png"
          alt="mini-copper-1"
          className="car-left"
        />
        <img
          src="../../../images/mini-copper-2.png"
          alt="mini-copper-2"
          className="car-right"
        />
        <div className="questions-section">
          {faqData.map((item, index) => (
            <article key={index}>
              <button
                className={`question ${
                  currentQuestion === index ? "active" : ""
                }`}
                onClick={() => handleToggleAnswer(index)}
              >
                <h3>{item.question}</h3>
                <i
                  className={`fa-solid ${
                    currentQuestion === index
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  }`}
                ></i>
              </button>
              {currentQuestion === index && (
                <div
                  className={`answer ${
                    currentQuestion === index ? "show" : ""
                  }`}
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
