import React, { useState } from 'react'
import { Link } from "react-router-dom"

function SideNav() {

const [nav, setNav] = useState(false)
const [hambButton, setHambButton] = useState(false)

const openNav = () => {
    setNav(!nav)
}

const handleHamb = () => {
    setHambButton(!hambButton)
}

  return (
    <section className="side-nav">
        <nav>

{/* mobile nav */}
<div className={`mobile-nav  ${nav ? "open-nav" : ""} `}>
    {/* <div className="mobile-nav-close" onClick={openNav}>
    <i class="fa-regular fa-x fa-xl"></i>
    </div> */}

<ul>
    <li>
        <Link onClick={ () => {
    openNav();
    handleHamb();
    }} to="/">
          Home
        </Link>
    </li>
    <li>
    <Link onClick={ () => {
    openNav();
    handleHamb();
    }} to="/about">
          About
        </Link>
    </li>

    <li>
    <Link onClick={ () => {
    openNav();
    handleHamb();
    }} to="/project">
          Projects
        </Link>
    </li>

    <li>
    <Link onClick={ () => {
    openNav();
    handleHamb();
    }} to="/service">
          Service
        </Link>
    </li>
    <li>
    <Link onClick={ () => {
    openNav();
    handleHamb();
    }} to="/contact">
          Contact
        </Link>
    </li>
</ul>
</div>


        <div className="side-nav-container">
            <ul>
                <li>
                    <Link to="/">
                       <i class="fa-solid fa-house" style={{color: "#f7f7f7;"}}></i>  Home
                        
                    </Link>
                </li>
                <li>
                <Link to="/about">
                <i class="fa-solid fa-user" style={{color: "#ffffff;"}}></i>    About
                    </Link>
                </li>
                <li>
                <Link to="/project">
                <i class="fa-solid fa-briefcase" style={{color: "#ffffff;"}}></i>    Projects
                    </Link>
                </li>
                <li>
                <Link to="/service">
                <i class="fa-solid fa-gear" style={{color: "#ffffff;"}}></i>    Service
                    </Link>
                </li>
                <li>
                <Link to="/contact">
                <i class="fa-solid fa-envelope" style={{color: "#ffffff;"}}></i>    Contact
                    </Link>
                </li>
            </ul>


{/* mobile nav hamburger button */}


        </div>
<div className="mobile-hamb" onClick={ () => {
    openNav();
    handleHamb();
    }} >
<i className= {`${hambButton ? "fa-regular fa-x fa-xl" : "fa-solid fa-bars fa-xl"}`} ></i>
</div>
        </nav>
    </section>
  )
}

export default SideNav