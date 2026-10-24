"use client";

import React from "react";
import { personalInfo } from "../data/portfolioData";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding about-section" aria-label="About Naseeh AN">
      <div className="content-width">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-glyph" aria-hidden="true">♥</span>
            <span>01 // CHARACTER PROFILE</span>
          </div>
          <h2 className="section-title">
            About <span className="title-accent">Naseeh AN</span>
          </h2>
          <p className="section-subtitle">
            A background in creating functional web and mobile platforms from the ground up.
          </p>
        </div>

        {/* About Grid */}
        <div className="about-grid">
          {/* Main narrative */}
          <div className="about-narrative">
            <div className="narrative-lead">
              <span className="lead-tag">[ DEVELOPER STATEMENT ]</span>
              <p>
                Hi there! I&apos;m <strong>Naseeh AN</strong>, a full-stack developer based in the UAE.
                I build responsive web applications and mobile experiences with modern tools
                like <strong>React</strong>, <strong>Next.js</strong>, <strong>Node.js</strong>, and <strong>React Native</strong>.
              </p>
            </div>

            <div className="narrative-body">
              <p>
                My approach centers on turning ideas into durable, production-ready platforms.
                I bridge clean frontend interfaces with solid backend architecture, prioritizing
                speed, accessibility, and straightforward usability.
              </p>
              <p>
                Having delivered both bespoke client solutions (repair booking portals, e-commerce stores, artist portfolios)
                and consumer mobile applications, I ensure every project is well-structured, maintainable,
                and built to run reliably for years.
              </p>
            </div>

            {/* Quick highlights / principles */}
            <div className="about-principles-grid">
              <div className="principle-card">
                <span className="principle-icon" aria-hidden="true">01</span>
                <h3 className="principle-title">Clean Architecture</h3>
                <p className="principle-desc">Modular, reusable components and organized codebases that scale cleanly.</p>
              </div>

              <div className="principle-card">
                <span className="principle-icon" aria-hidden="true">02</span>
                <h3 className="principle-title">User-First Experience</h3>
                <p className="principle-desc">Thoughtful design, tactile interactions, fast load times, and responsive layouts.</p>
              </div>

              <div className="principle-card">
                <span className="principle-icon" aria-hidden="true">03</span>
                <h3 className="principle-title">Full-Stack Execution</h3>
                <p className="principle-desc">From UI wireframing and responsive CSS to REST APIs, databases, and deployment.</p>
              </div>
            </div>
          </div>

          {/* Player Specs / Details Sidebar */}
          <aside className="about-sidebar">
            <div className="stats-retro-panel">
              <div className="panel-header">
                <span className="panel-dot" aria-hidden="true" />
                <span className="panel-title">CHARACTER_STATS.JSON</span>
              </div>

              <div className="stats-list">
                <div className="stat-row">
                  <span className="stat-label">Location:</span>
                  <span className="stat-value">{personalInfo.location}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Nationality:</span>
                  <span className="stat-value">{personalInfo.nationality}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Role:</span>
                  <span className="stat-value">{personalInfo.role}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Study:</span>
                  <span className="stat-value">MG University (BA)</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Bootcamp:</span>
                  <span className="stat-value">Udemy Full-Stack Web</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Interests:</span>
                  <span className="stat-value">Football, Video Games</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Availability:</span>
                  <span className="stat-value highlight-avail">Open for Work</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Email:</span>
                  <a href={`mailto:${personalInfo.email}`} className="stat-link">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Phone (UAE):</span>
                  <a href={`tel:${personalInfo.phoneUAE}`} className="stat-link">
                    {personalInfo.phoneUAE}
                  </a>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Phone (IN):</span>
                  <a href={`tel:${personalInfo.phoneIndia}`} className="stat-link">
                    {personalInfo.phoneIndia}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
