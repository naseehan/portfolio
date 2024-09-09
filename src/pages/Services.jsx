import React from "react";
import ThemeIcons from "../components/ThemeIcons";
import { useSelector } from "react-redux";
import Counter from "../components/Counter";
import { services } from "./Service";

function Services() {
  const { theme1 } = useSelector((state) => state.theme);
console.log(services);

  return (
    <section className={`service-section ${theme1 ? "light" : "dark"}`}>
      <ThemeIcons />
      <div className="service-container">
        <h2>What I Do</h2>
        <div className="my-services">
           {services.map(data => (
            <div className="each-service border" key={data.num}>
                <div className="number">{data.num}</div>
                <h3>{data.heading}</h3>
                <p>{data.desc}</p>
                </div>
           ))}
          
        </div>

        <div className="facts">
          <h3>Fun Facts</h3>
          <div className="fun-facts">
            <div className="each-fact border">
              <Counter start={0} end={20} suffix="+" duration={2000} />

              <p>projects finished</p>
            </div>
            <div className="each-fact border">
              <Counter start={0} end={10} suffix="k+" duration={2000} />

              <p>Lines of code</p>
            </div>
            <div className="each-fact border">
              <Counter start={0} end={30} suffix="+" duration={2000} />

              <p>Github repositories</p>
            </div>
            <div className="each-fact border">
              <Counter start={0} end={100} suffix="+" duration={2000} />

              <p>Cups of coffee consumed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
