import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

// Vercel Analytics
import { Analytics } from "@vercel/analytics/react";

// Vercel Speed Insights
import { SpeedInsights } from "@vercel/speed-insights/react";

const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const NewProjects = lazy(() => import("./pages/NewProjects"));
const Services = lazy(() => import("./pages/Services"));
const Error = lazy(() => import("./components/Error"));

function App() {
  useEffect(() => {
    const notifyVisit = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();

        await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ip: data.ip }),
        });
      } catch (err) {
        console.error("Failed to notify visit:", err);
      }
    };

    notifyVisit();
  }, []);

  return (
    <>
      <SideNav />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<NewProjects />} />
          <Route path="/service" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;