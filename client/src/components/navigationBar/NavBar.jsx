import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import "./NavBar.css";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();

  const checkIsMobile = () => {
    if (window.innerWidth < 426) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkIsMobile();
    const handleResize = () => {
      checkIsMobile();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
      {isMobile ? (
        <div className="mobile-dropdown">
          <ul>
            <li onClick={toggleDropdown}>
              <i className="fa-solid fa-bars"></i>
              {isDropdownOpen && (
                <ul className="dropdown-open">
                  {user ? (
                    <>
                      <li className="user-full-name">
                        Hi {user.firstName} {user.lastName}
                      </li>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/orders">Orders</Link>
                      </li>
                      {navItems.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            onClick={
                              item.path === location.pathname
                                ? scrollToTop
                                : null
                            }
                            className={item === activeRoute ? "active" : ""}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link className="register-btn" to="/" onClick={logout}>
                          LogOut
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      {navItems.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            onClick={
                              item.path === location.pathname
                                ? scrollToTop
                                : null
                            }
                            className={item === activeRoute ? "active" : ""}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link className="login-btn" to="/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="register-btn" to="/register">
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </div>
      ) : (
        <>
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
              <div className="user-name-container">
                <p className="user-full-name">
                  Hi {user.firstName} {user.lastName}{" "}
                </p>
                <div className={`user-menu ${isSticky ? "sticky" : ""}`}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                </div>
              </div>
              <Link className="register-btn" to="/" onClick={logout}>
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
        </>
      )}
    </div>
  );
};

export default NavBar;
