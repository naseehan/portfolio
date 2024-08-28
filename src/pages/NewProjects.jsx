import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import ThemeIcons from "../components/ThemeIcons";
import { useSelector } from "react-redux";

function NewProjects() {
  const [itemId, setItemId] = useState("");
  const { theme1 } = useSelector((state) => state.theme);

  const handleEventClick = (id) => {
    setItemId(id);
  };
  const handleEventClose = () => {
    setItemId("");
  };

  return (
    <section className={`project-section ${theme1 ? "light" : "dark"}`}>
      <ThemeIcons />
      <div className="project-container">
        <h2>My projects</h2>
        <div className="my-projects">
          {ProjectDetails.map((item) => (
            <div
              className="each-project autoBlur"
              key={item.id}
              onClick={() => handleEventClick(item.id)}
            >
              <img src={item.img} alt={item.openName} />
              {itemId === item.id && (
                <div
                  className={`lightbox-overlay ${item.openName}`}
                  onClick={handleEventClose}
                >
                  <div className="lightbox-content">
                    <h1>{item.description}</h1>
                    <a href={item.link}>
                      <button>Click here</button>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewProjects;
