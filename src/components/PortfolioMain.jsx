"use client";

import React, { useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const PortfolioMain = ({ initialSection }) => {
  useEffect(() => {
    // If a hash or initialSection is specified, smooth-scroll to it on mount
    const hashTarget = initialSection || (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "");
    if (hashTarget) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hashTarget);
        if (el) {
          const headerOffset = 70;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [initialSection]);

  return (
    <div className="portfolio-app-root">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioMain;
