import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { motion } from "framer-motion";

function SideNav() {
  const [nav, setNav] = useState(false);
  const [hambButton, setHambButton] = useState(false);

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
          className={`mobile-nav ${nav ? "open-nav" : ""}`}
          animate={nav ? "open" : "closed"}
          variants={variants}
          initial="closed"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <ul>
            <li>
              <Link
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

        <div className="side-nav-container">
          <ul>
            <li>
              <Link to="/">
                <i
                  className="fa-solid fa-house"
                  style={{ color: "#f7f7f7" }}
                ></i>{" "}
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">
                <i
                  className="fa-solid fa-user"
                  style={{ color: "#ffffff" }}
                ></i>{" "}
                About
              </Link>
            </li>
            <li>
              <Link to="/projects">
                <i
                  className="fa-solid fa-briefcase"
                  style={{ color: "#ffffff" }}
                ></i>{" "}
                Projects
              </Link>
            </li>
            <li>
              <Link to="/service">
                <i
                  className="fa-solid fa-gear"
                  style={{ color: "#ffffff" }}
                ></i>{" "}
                Service
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <i
                  className="fa-solid fa-envelope"
                  style={{ color: "#ffffff" }}
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
          ></i>
        </div>
      </nav>
    </section>
  );
}

export default SideNav;
