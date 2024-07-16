import React, { useState, useEffect } from "react";
import carImg from "../assets/car.png";
import movieImg from "../assets/movie.png";
import eventImg from "../assets/event.png"

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
      setEvent(true)
    }
  }, []);

  return (
    <section className="project-section">
      <div className="project-container">
        <h2>My projects</h2>
        <div className="my-projects">
          
          <div className="each-project">
            <img src={eventImg} alt="event" onClick={handleEventClick} />
            {event && (
              <div className="lightbox-overlay event" onClick={handleEventClose}>
                <div className="lightbox-content">
                  <h1>
                    "Introducing our cutting-edge event booking app,
                    revolutionizing how you plan and attend events. Designed
                    with simplicity and efficiency in mind, our app offers a
                    seamless experience for both organizers and attendees alike.
                    Whether you're hosting a conference, concert, or community
                    gathering, our platform empowers you to effortlessly browse,
                    compare, and book events from a diverse range of
                    categories."
                  </h1>
                  <a href="https://noble-events.onrender.com/">
                    <button>Click here</button>
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="each-project">
            <img src={carImg} alt="car" onClick={handleCarClick} />
            {car && (
              <div className="lightbox-overlay car" onClick={handleClose}>
                <div className="lightbox-content">
                  <h1>
                    "Introducing our latest car rental app, designed to make
                    your next car rental experience easy, affordable, and
                    convenient. Whether you're traveling for business or
                    pleasure, our app allows you to quickly search, compare and
                    book rental cars from a wide range of trusted rental car
                    companies."
                  </h1>
                  <a href="https://car-rental-new.vercel.app/">
                    {" "}
                    <button>Click here</button>{" "}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="each-project">
            <img src={movieImg} alt="movie" onClick={handleMovieClick} />

            {movie && (
              <div
                className="lightbox-overlay movie mobile-overlay"
                onClick={handleMovieClose}
              >
                <div className="lightbox-content mobile-content">
                  <h1>
                    "Introducing our new movie app, designed to help you
                    discover your next favorite movie. Our app provides you with
                    access to a vast selection of movies, all available to
                    browse and search by name or category."
                  </h1>
                  <a href="https://naseehan.github.io/movieland/">
                    <button>Click here</button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
