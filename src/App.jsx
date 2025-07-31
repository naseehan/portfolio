import React, { Suspense, useEffect } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import NewProjects from "./pages/NewProjects";
import NewSide from "./components/NewSide";
import { changeTheme } from "./features/themeSlice";
import { useSelector } from "react-redux";
import Error from "./components/Error";
// vercel analytics
import { Analytics } from "@vercel/analytics/react"
// vercel speed check
import { SpeedInsights } from "@vercel/speed-insights/react"
const Contact = React.lazy(() => import("./pages/Contact"));

function App() {
  const { theme1 } = useSelector((state) => state.theme);
 

   useEffect(() => {
    const notifyVisit = async () => {
      const ip = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip);

      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ip,
          userAgent: navigator.userAgent,
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
