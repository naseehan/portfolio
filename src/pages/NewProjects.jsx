import React, { useState, useEffect } from "react";
import ProjectDetails from "./ProjectDetails.js";

function Projects() {
  const [car, setCar] = useState(false);
  const [movie, setMovie] = useState(false);
  const [event, setEvent] = useState(false);

  const handleCarClick = () => {
    setCar(!car);
    setMovie(false);
    setEvent(false);
  };

  const handleMovieClick = () => {
    setMovie(!movie);
    setCar(false);
    setEvent(false);
  };

  const handleEventClick = () => {
    setEvent(!event);
    setCar(false);
    setMovie(false);
  };

  const handleClose = () => {
    setCar(false);
  };

  const handleMovieClose = () => {
    setMovie(false);
  };
  const handleEventClose = () => {
    setEvent(false);
  };

  useEffect(() => {
    // Set the initial state of the lightbox-overlay based on screen size
    if (window.innerWidth <= 680) {
      setCar(true);
      setMovie(true);
    }
  }, []);

  return (
    <section className="project-section">
      <div className="project-container">
        <h2>My projects</h2>

        <div className="my-projects">
            {ProjectDetails.map((data) => (
                <div className="each-project">
                <img src={data.img} alt="" onClick={handleEventClick} />
           
                  <div className="lightbox-overlay event" onClick={handleEventClose}>
                    <div className="lightbox-content">
                      <h1>
                       {data.description}
                      </h1>
                      <a href={data.link}>
                        <button>Click here</button>{" "}
                      </a>
                    </div>
                  </div>
            
              </div>
            ))}
        
        </div>
      </div>
    </section>
  );
}

export default Projects;
