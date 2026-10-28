"use client";

import React from "react";
import { personalInfo, socialLinks } from "../data/portfolioData";
import Icon from "./Icon";

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", "#home");
  };

  return (
    <footer className="site-footer">
      <div className="content-width footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-brand-name">NASEEH AN</span>
            <span className="footer-role">/ FULL-STACK DEVELOPER</span>
          </div>

          <div className="footer-links" aria-label="Footer Navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Scroll back to top"
          >
            <span>TOP</span>
            <span className="top-arrow" aria-hidden="true">▲</span>
          </button>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {personalInfo.name}. Designed & built with care.
          </p>

          <div className="footer-social-strip">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label={s.name}
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
