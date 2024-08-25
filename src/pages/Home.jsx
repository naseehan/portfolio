import { TypeAnimation } from "react-type-animation";
import WaveText from "../components/WaveText";

function Home() {
  return (
    <section className="home-section">
      <div className="home-container">
        <div className="avatar">
          <div className="home-img"></div>
        </div>
        <div className="home-description">
          {/* <WaveText /> */}
          <h1>Naseeh AN</h1>
          <TypeAnimation
            sequence={["Developer", 2000, "Designer", 2000]}
            speed={50}
            repeat={Infinity}
          />
          <p>
            Full Stack web developer based in India. From the world of English
            literature to lines of code on a web page, I love combining the
            worlds of logic and creative design to make eye-catching,
            accessible, and user friendly websites and applications.
          </p>
          <div className="socials">
            <a href="https://www.facebook.com/naseehnjk.messi.10/">
              {/* <i className="fa-brands fa-facebook-f"></i> */}
              <lord-icon
                src="https://cdn.lordicon.com/mpigogwa.json"
                trigger="loop"
                delay="1500"
                stroke="bold"
                state="hover-rotate"
                colors="primary:#ffffff,secondary:#ffffff,tertiary:#ffffff"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </a>
            <a href="https://www.instagram.com/naseeh10/">
              {/* <i className="fa-brands fa-instagram"></i> */}
              <lord-icon
                src="https://cdn.lordicon.com/frnztegr.json"
                trigger="loop"
                delay="1500"
                stroke="bold"
                state="hover-rotate"
                colors="primary:#ffffff,secondary:#ffffff,tertiary:#ffffff,quaternary:#ffffff,quinary:#ffffff,senary:#ffffff"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </a>
            <a href="https://github.com/naseehan">
              {/* <i className="fa-brands fa-github"></i> */}
              <lord-icon
                src="https://cdn.lordicon.com/yedgackm.json"
                trigger="loop"
                delay="1500"
                stroke="bold"
                state="hover-rotate"
                colors="primary:#ffffff,secondary:#ffffff,tertiary:#000000"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </a>
            <a href="https://www.linkedin.com/in/naseeh-an-a4951b240/">
              {/* <i className="fa-brands fa-linkedin-in"></i> */}
              <lord-icon
                src="https://cdn.lordicon.com/mgampcwp.json"
                trigger="loop"
                delay="1500"
                stroke="bold"
                state="hover-rotate"
                colors="primary:#ffffff,secondary:#ffffff,tertiary:#ffffff"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
