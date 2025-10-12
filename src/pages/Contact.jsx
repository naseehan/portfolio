import React, { useState } from "react";
import ThemeIcons from "../components/ThemeIcons";
import { useSelector } from "react-redux";

function Contact() {
  const { theme1 } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://portfolio-phdb.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 429) throw new Error("Too many requests");
      if (!response.ok) throw new Error("Server error");

      setAlertMessage("Message sent successfully!");
      setData({ name: "", email: "", message: "" });
      e.target.reset();
    } catch (err) {
      if (err.message === "Too many requests") {
        setAlertMessage("You’re sending messages too fast. Try again later.");
      } else {
        setAlertMessage("Something went wrong. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setAlertMessage(null), 4000);
    }
  };

  return (
    <section className={`contact-section ${theme1 ? "light" : "dark"}`}>
      <ThemeIcons />

      {alertMessage && (
        <div className="container">
          <div className="row">
            <div id="aui-flag-container">
              <div className="aui-flag" aria-hidden="false">
                <div className="aui-message aui-message-success success closeable shadowed">
                  {alertMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="contact-container">
        <div className="get-in-touch">
          <h3>Get in Touch</h3>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
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
                placeholder="Email"
                required
                value={data.email}
                onChange={handleChange}
              />
              <textarea
                name="message"
                cols="30"
                rows="10"
                placeholder="Message"
                required
                value={data.message}
                onChange={handleChange}
              ></textarea>
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
