import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/models", label: "Vehicle Models" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/team", label: "Our Team" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className={`nav-container ${isSticky ? "sticky" : ""}`}>
      <img
        src={
          !isSticky ? "../images/newLogo.png" : "../images/newLogoSilver.png"
        }
        className="logo"
        alt="logo"
        height="40"
      />
      <ul className="list">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={item.path === location.pathname ? scrollToTop : null}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="button-wrapper">
        <Link className="login-btn" to="/login">
          Login
        </Link>
        <Link
          className={!isSticky ? "register-btn" : "register-btn-color"}
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
