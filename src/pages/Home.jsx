import { TypeAnimation } from "react-type-animation";
import WaveText from "../components/WaveText";
import Socials from "../components/Socials";
import ThemeIcons from "../components/ThemeIcons";
import { useSelector } from "react-redux";
import SkyBg from "../components/SkyBg";




function Home() {
  
  const { theme1 } = useSelector((state) => state.theme);

  return (
    <section className={`home-section ${theme1 ? "light" : "dark"}`}>

<ThemeIcons />

{theme1 === false && <SkyBg />}
     
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
           <Socials  color={theme1 ? "#000000" : "#ffffff"}   secColor={theme1 ? "#ffffff" : "#000000"}  />   
         {/* <Socials color={"#ffffff"}/> */}
        </div>
      </div>
    </section>
  );
}

export default Home;
