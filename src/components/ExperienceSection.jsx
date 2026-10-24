"use client";

import React, { useState } from "react";
import { experienceData, educationData, servicesData, funFacts } from "../data/portfolioData";

const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState("work");

  return (
    <section id="experience" className="section-padding experience-section" aria-label="Experience and Background">
      <div className="content-width">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-glyph" aria-hidden="true">▪</span>
            <span>04 // EXP TIMELINE</span>
          </div>
          <h2 className="section-title">
            Experience & <span className="title-accent">Milestones</span>
          </h2>
          <p className="section-subtitle">
            My career path, production roles, client engagements, and educational checkpoints.
          </p>
        </div>

        {/* Tab switcher: Work History vs Education */}
        <div className="timeline-tabs" role="tablist" aria-label="Select history view">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "work"}
            className={`timeline-tab-btn ${activeTab === "work" ? "is-active" : ""}`}
            onClick={() => setActiveTab("work")}
          >
            <span className="tab-dot" aria-hidden="true" />
            <span>Work History</span>
            <span className="tab-pill-count">{experienceData.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "education"}
            className={`timeline-tab-btn ${activeTab === "education" ? "is-active" : ""}`}
            onClick={() => setActiveTab("education")}
          >
            <span className="tab-dot" aria-hidden="true" />
            <span>Academic Checkpoints</span>
            <span className="tab-pill-count">{educationData.length}</span>
          </button>
        </div>

        {/* Timeline Content */}
        <div className="timeline-container" role="region" aria-live="polite">
          {activeTab === "work" ? (
            <div className="timeline-list">
              {experienceData.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-period-col">
                    <span className="period-badge">{item.period}</span>
                    <span className="timeline-badge-tag">{item.badge}</span>
                  </div>

                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div>
                        <h3 className="timeline-role">{item.role}</h3>
                        <p className="timeline-org">
                          <span>{item.organization}</span>
                          <span className="org-sep">/</span>
                          <span className="org-loc">{item.location}</span>
                        </p>
                      </div>
                    </div>

                    <p className="timeline-desc">{item.description}</p>

                    <ul className="timeline-highlights">
                      {item.highlights.map((h, i) => (
                        <li key={i}>
                          <span className="highlight-bullet" aria-hidden="true">▪</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="timeline-list">
              {educationData.map((edu, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-period-col">
                    <span className="period-badge">{edu.period}</span>
                    <span className="timeline-badge-tag">{edu.typeBadge || "CHECKPOINT"}</span>
                  </div>

                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div>
                        <h3 className="timeline-role">{edu.degree}</h3>
                        <p className="timeline-org">
                          <span>{edu.institution}</span>
                        </p>
                      </div>
                    </div>
                    <p className="timeline-desc">{edu.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Services & Capabilities Grid */}
        <div className="services-subgrid">
          <div className="subgrid-heading">
            <span className="subgrid-tag">[ CORE CAPABILITIES ]</span>
            <h3 className="subgrid-title">How I help teams and clients</h3>
          </div>

          <div className="services-cards-row">
            {servicesData.map((s) => (
              <div key={s.num} className="service-card">
                <span className="service-number">{s.num}</span>
                <h4 className="service-heading">{s.title}</h4>
                <p className="service-body">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts Row */}
        <div className="stats-metric-strip">
          <div className="metric-strip-header">
            <span className="strip-title">
              <span className="tag-pixel-glyph" aria-hidden="true">▪</span> CAREER LOG METRICS
            </span>
            <span className="strip-note">{"//"} ESTIMATED TOTALS</span>
          </div>

          <div className="metric-strip-grid">
            {funFacts.map((fact, index) => (
              <div key={index} className="metric-block">
                <span className="metric-count">{fact.count}</span>
                <span className="metric-label">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
