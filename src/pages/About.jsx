import React from 'react'

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-me-container">
        <h2 className='about-me'>About Me</h2>
        <div className='dev-name'>
            <h3>Naseeh AN</h3>
            <p>fullstack developer</p>
        </div>
        <div className='dev-intro'>
          <p>Hi there! My name is Naseeh AN, and I'm a React developer  building web applications and user interfaces.
          I'm passionate about building responsive and interactive web experiences using the latest technologies 
          and best practices. I'm constantly learning and staying up-to-date with the latest trends in front-end 
          development, and I strive to create user interfaces that are both visually appealing and functional.
          </p>
          <p>One of my specialties is taking an idea from scratch and creating a full-fledged platform. I go beyond to produce sites with a unique, outstanding, contemporary look-and-feel. With extensive knowledge of web mechanics, I’m able to optimize complex integrations 
            to require little-to-no maintenance while running on their own for years.
          </p>
        </div>
        
        <div className='dev-details'>
            <div className="left-details">
              <ul>
                <li>
                    <span>
                        Birthday:
                    </span>
                    <span>
                        05.05.2001
                    </span>
                </li>
                <li>
                    <span>
                        Age:
                    </span>
                    <span>
                        22
                    </span>
                </li>
                <li>
                    <span>
                        Address:
                    </span>
                    <span>
                        Njarayilkonam, TVM, Kerala
                    </span>
                </li>
                <li>
                    <span>
                        Email:
                    </span>
                    <span>
                        naseehan700@gmail.com
                    </span>
                </li>
                <li>
                    <span>
                        Phone:
                    </span>
                    <span>
                        +91 7034528129
                    </span>
                </li>
              </ul>
            </div>

        <div className="right-details">
        <ul>
                <li>
                    <span>
                        Nationality:
                    </span>
                    <span>
                        Indian
                    </span>
                </li>
                <li>
                    <span>
                        Study:
                    </span>
                    <span>
                        MG University
                    </span>
                </li>
                <li>
                    <span>
                        Degree:
                    </span>
                    <span>
                        BA
                    </span>
                </li>
                <li>
                    <span>
                    Interest:
                    </span>
                    <span>
                    Playing Football
                    </span>
                </li>
                <li>
                    <span>
                    Freelance:
                    </span>
                    <span>
                    Available
                    </span>
                </li>
              </ul>
        </div>

        </div>
        </div>
  {/* Programing skills */}

<div className="programming-skills">
  <h2>Programming Skills</h2>
  <div className="skills">
    <div className='left-skills'>
      <div>
        <label htmlFor="">React</label>
        <span>96%</span>
        <div className='progress'>
          <div className="bar"></div>
        </div>
        </div>

        <div className='js'>
        <label htmlFor="">Javascript</label>
        <span>90%</span>
        <div className='progress'>
          <div className="bar"></div>
        </div>
        </div>

        <div className='mongo'>
        <label htmlFor="">Mongo DB</label>
        <span>80%</span>
        <div className='progress'>
          <div className="bar"></div>
        </div>
        </div>
    </div>


    <div className='left-skills'>

      <div className='html'>
        <label htmlFor="">HTML</label>
        <span>100%</span>
        <div className='progress'>
          <div className="bar"></div>
        </div>
      </div>

      <div className='html'>
        <label htmlFor="">CSS</label>
        <span>100%</span>
        <div className='progress'>
          <div className="bar"></div>
        </div>
      </div>

      <div className='express'>
        <label htmlFor="">Express</label>
        <span>75%</span>
        <div className='progress'>
          <div className="bar"></div>
        </div>
      </div>

    </div>
  </div>
</div>

{/* Education */}
<div className="education">
  <h3>Education</h3>
  <div className="year-study">
  <div className="year">
    <p>2016-2018</p>
  </div>
  <div className="study">
      <p>GHSS Pallickal</p>
      <p>Higher secondary</p>
  </div>
</div>

<div className="year-study">
  <div className="year">
    <p>2018-Present</p>
  </div>
  <div className="study">
      <p>MG University</p>
      <p>Bachelor of Arts</p>
  </div>
</div>

<div className="year-study">
  <div className="year">
    <p>2022-2023</p>
  </div>
  <div className="study">
      <p>Udemy</p>
      <p>web development Bootcamp</p>
  </div>
</div>

</div>

      </div>
    </section>
  )
}

export default About