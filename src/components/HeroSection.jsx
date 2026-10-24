"use client";

import React from "react";
import ApparitionIcon from "./ApparitionIcon";
import { personalInfo, socialLinks } from "../data/portfolioData";

const HeroSection = () => {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <section id="home" className="hero-section" aria-label="Introduction">
      <div className="hero-container content-width">
        {/* Top Eyebrow / Status Tag */}
        <div className="hero-status-row">
          <div className="status-badge">
            <span className="status-live-dot" aria-hidden="true" />
            <span className="status-text">AVAILABLE FOR WORK</span>
            <span className="status-sep">/</span>
            <span className="status-location">UAE & REMOTE</span>
          </div>

          {/* <div className="hero-stage-tag" aria-hidden="true">
            <span className="tag-pixel-glyph">▪</span> STAGE 01 : SPAWN
          </div> */}
        </div>

        {/* Hero Main Content */}
        <div className="hero-main-grid">
          <div className="hero-copy-column">
            <h1 className="hero-heading">
              <span className="hero-greeting">
                Hi, I&apos;m <ApparitionIcon />
              </span>{" "}
              <span className="hero-name-highlight">{personalInfo.name}</span>
              <span className="hero-role-block">
                Full-Stack Developer crafting clean web & mobile experiences.
              </span>
            </h1>

            <p className="hero-summary">
              {personalInfo.summary}
            </p>

            {/* Call to action buttons */}
            <div className="hero-actions-row">
              <a
                href="#projects"
                onClick={scrollTo("projects")}
                className="btn btn-primary"
              >
                <span>View Selected Work</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                href="#contact"
                onClick={scrollTo("contact")}
                className="btn btn-secondary"
              >
                <span>Get In Touch</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>

            {/* Socials Strip */}
            <div className="hero-meta-row">
              <div className="hero-socials" aria-label="Social profiles">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-link"
                    title={item.name}
                    aria-label={item.name}
                  >
                    <i className={item.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Visual Card with Portrait & Pixel Hero Sprite */}
          <div className="hero-visual-column">
            <div className="hero-card-frame">
              {/* Retro decorative corners */}
              <span className="frame-corner corner-tl" aria-hidden="true" />
              <span className="frame-corner corner-tr" aria-hidden="true" />
              <span className="frame-corner corner-bl" aria-hidden="true" />
              <span className="frame-corner corner-br" aria-hidden="true" />

              <div className="hero-card-header">
                <span className="card-dot dot-red" aria-hidden="true" />
                <span className="card-dot dot-yellow" aria-hidden="true" />
                <span className="card-dot dot-green" aria-hidden="true" />
                <span className="card-header-title">PLAYER_PROFILE.EXE</span>
              </div>

              <div className="hero-portrait-wrap">
                <img
                  src={personalInfo.photo?.src || personalInfo.photo}
                  alt="Portrait of Naseeh AN"
                  className="hero-portrait-img"
                  loading="eager"
                  width="400"
                  height="460"
                />
                <div className="hero-portrait-overlay" />
              </div>

              {/* Integrated Pixel Hero Sprite (the ONLY looping animation) */}
              {/* <div className="hero-card-footer">
                <PixelHeroSprite />

                <div className="hero-player-meta">
                  <span className="player-meta-id">PLAYER: NASEEH AN</span>
                  <span className="player-meta-spec">MERN + REACT NATIVE</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Subtle scroll cue */}
        <div className="hero-scroll-indicator" aria-hidden="true">
          <span className="scroll-arrow">↓</span>
          <span className="scroll-text">SCROLL TO DISCOVER</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
