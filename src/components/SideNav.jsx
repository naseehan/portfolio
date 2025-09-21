import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function SideNav() {
  const [nav, setNav] = useState(false);
  const [hambButton, setHambButton] = useState(false);
  // redux theme
  const { theme1 } = useSelector((state) => state.theme);


  const openNav = () => {
    ReactGA.event({
      category: "User",
      action: "Click",
      label: "Button Click",
    });
    setNav(!nav);
  };

  const handleHamb = () => {
    ReactGA.event({
      category: "User",
      action: "Click",
      label: "Button Click",
    });
    setHambButton(!hambButton);
  };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <section className="side-nav">
      <nav>
        {/* mobile nav */}
        <motion.div
          className={`mobile-nav ${nav ? "open-nav" : ""} ${theme1 ? "light" : "dark"}`}
          animate={nav ? "open" : "closed"}
          variants={variants}
          initial="closed"
          transition={{ type: "tween", duration: 1, ease: "easeInOut" }}
        >
          <ul>
            <li>
              <Link
              className={`${theme1 ? "light" : "dark"}`}
                onClick={() => {
                  openNav();
                  handleHamb();
                }}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
              className={`${theme1 ? "light" : "dark"}`}
                onClick={() => {
                  openNav();
                  handleHamb();
                }}
                to="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
              className={`${theme1 ? "light" : "dark"}`}
                onClick={() => {
                  openNav();
                  handleHamb();
                }}
                to="/projects"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
              className={`${theme1 ? "light" : "dark"}`}
                onClick={() => {
                  openNav();
                  handleHamb();
                }}
                to="/service"
              >
                Service
              </Link>
            </li>
            <li>
              <Link
              className={`${theme1 ? "light" : "dark"}`}
                onClick={() => {
                  openNav();
                  handleHamb();
                }}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        <div className={`side-nav-container ${theme1 ? "light" : "dark"}`}>
          <ul>
            <li>
              <Link to="/" className={`${theme1 ? "light" : "dark"}`}>
                <i
                  className="fa-solid fa-house"
                  style={{ color: theme1 ? "#000000" : "#ffffff" }}
                ></i>{" "}
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={`${theme1 ? "light" : "dark"}`}>
                <i
                  className="fa-solid fa-user"
                  style={{ color: theme1 ? "#000000" : "#ffffff" }}
                ></i>{" "}
                About
              </Link>
            </li>
            <li>
              <Link to="/projects" className={`${theme1 ? "light" : "dark"}`}>
                <i
                  className="fa-solid fa-briefcase"
                  style={{ color: theme1 ? "#000000" : "#ffffff" }}
                ></i>{" "}
                Projects
              </Link>
            </li>
            <li>
              <Link to="/service" className={`${theme1 ? "light" : "dark"}`}>
                <i
                  className="fa-solid fa-gear"
                  style={{ color: theme1 ? "#000000" : "#ffffff" }}
                ></i>{" "}
                Service
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`${theme1 ? "light" : "dark"}`}>
                <i
                  className="fa-solid fa-envelope"
                  style={{ color: theme1 ? "#000000" : "#ffffff" }}
                ></i>{" "}
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* mobile nav hamburger button */}
        <div
          className="mobile-hamb"
          onClick={() => {
            openNav();
            handleHamb();
          }}
        >
          <i
            className={`${
              hambButton ? "fa-regular fa-x fa-xl" : "fa-solid fa-bars fa-xl"
            }`}
            style={{ color: theme1 ? "#000000" : "#ffffff" }}

          ></i>
        </div>
      </nav>
    </section>
  );
}

export default SideNav;
