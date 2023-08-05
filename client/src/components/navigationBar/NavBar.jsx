import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { USER_INFO } from "../../queries/userInfo.js";
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

  const { data } = useQuery(USER_INFO);
  const user = data?.user || null;

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
    { path: "/vehicles", label: "Vehicles" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/team", label: "Our Team" },
    { path: "/contact", label: "Contact" },
  ];

  const activeRoute = navItems.find((item) => item.path === location.pathname);

  return (
    <div className={`nav-container ${isSticky ? "sticky" : ""}`}>
      <img
        src={!isSticky ? "../images/logo.png" : "../images/logoSilver.png"}
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
              className={item === activeRoute ? "active" : ""}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {user ? (
        <div className="button-wrapper">
          <p>
            Hi {user.firstName} {user.lastName}{" "}
          </p>
          <Link className="register-btn" to="/">
            LogOut
          </Link>
        </div>
      ) : (
        <div className="button-wrapper">
          <Link className="login-btn" to="/login">
            Login
          </Link>

          <Link className="register-btn" to="/register">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
