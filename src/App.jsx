import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
// vercel analytics
import { Analytics } from "@vercel/analytics/react"
// vercel speed check
import { SpeedInsights } from "@vercel/speed-insights/react"
const Contact = React.lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const NewProjects = lazy(() => import("./pages/NewProjects"));
const Services = lazy(() => import("./pages/Services"));
const Error = lazy(() => import("./components/Error"));


function App() {
 

useEffect(() => {
  const notifyVisit = async () => {

    const ip = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip);
   

let result =   await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ip
        }),
      });


  };


  notifyVisit();
}, []);



  return (
    <>
     <SideNav />
      {/* <Router> */}
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
        
      {/* </Router> */}
      
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
