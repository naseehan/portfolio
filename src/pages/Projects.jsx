import React , { useState, useEffect } from 'react'
import carImg from "../assets/car.png"
import movieImg from "../assets/movie.png"

function Projects() {


    const [car, setCar] = useState(false);
    const [movie, setMovie] = useState(false)

    

const handleCarClick = () => {
    setCar(!car);
    setMovie(false)
  }

const  handleMovieClick = () => {
    setMovie(!movie)
    setCar(false);
}

const handleClose = () => {
  setCar(false);
}

const handleMovieClose = () => {
    setMovie(false)
}

useEffect(() => {
    // Set the initial state of the lightbox-overlay based on screen size
    if (window.innerWidth <= 680) {
      setCar(true);
      setMovie(true)
    }
  }, []);

  return (
    <section className="project-section">
        <div className="project-container">
            <h2>My projects</h2>
        <div className="my-projects">
                <div className="each-project">
                        <img src={carImg} alt="" onClick={handleCarClick}/>
                        {car && (
                            <div className="lightbox-overlay car" onClick={handleClose}>
                            <div className="lightbox-content">
                                <h1>"Introducing our latest car rental app, designed to make your next car rental experience easy, 
                                    affordable, and convenient. Whether you're traveling for business or pleasure, our app allows you to quickly search, 
                                    compare and book rental cars from a wide range of trusted rental car companies."
                                </h1>
                            <a href="https://car-rental-new.vercel.app/"> <button >Click here</button> </a>
                            </div>
                            </div>
                        )}
                </div>

                <div className="each-project">
                        <img src={movieImg} alt="" onClick={handleMovieClick}/>

                        {movie && (
                            <div className="lightbox-overlay movie mobile-overlay" onClick={handleMovieClose}>
                            <div className="lightbox-content mobile-content">
                                <h1>"Introducing our new movie app, designed to help you discover your next favorite movie. Our app provides 
                                    you with access to a vast selection of movies, 
                                    all available to browse and search by name or category."
                                </h1>
                        <a href="https://naseehan.github.io/movieland/" ><button >Click here</button></a>
                            </div>
                            </div>
                        )}
                </div>
        </div>  
        </div>
    </section>
  )
}

export default Projects
