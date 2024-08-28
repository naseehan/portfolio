import React, { useState } from "react";
import { set } from "react-ga";
import ThemeIcons from "../components/ThemeIcons";
import { useSelector } from "react-redux";

function Contact() {


  const { theme1 } = useSelector((state) => state.theme);


  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [alertMessage, setAlertMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setAlertMessage(true);
    setTimeout(() => {
      setAlertMessage(false);
    }, 3000);
    setData({
      name:"",
      email:"",
      message:""
    });
  };

  return (
    <>
      <section className={`contact-section ${theme1 ? "light" : "dark"}`}>
      <ThemeIcons />
        {alertMessage && (
          <div class="container">
            <div class="row">
              <div id="aui-flag-container">
                <div class="aui-flag" aria-hidden="false">
                  <div class="aui-message aui-message-success success closeable shadowed">
                    Message sent successfully
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="contact-container">
          <div className="get-in-touch">
            <h3>Get in Touch</h3>

            <div className="map"></div>
            <div className="contact-form">
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  value={data.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Email"
                  required
                  value={data.email}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Message"
                  required
                  value={data.message}
                  onChange={handleChange}
                ></textarea>
                <button type="submit">Send message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
