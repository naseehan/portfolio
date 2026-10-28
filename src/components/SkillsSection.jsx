"use client";

import React, { useState, useMemo } from "react";
import { skillsData, skillCategories } from "../data/portfolioData";
import Icon from "./Icon";

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = useMemo(() => {
    if (selectedCategory === "All") return skillsData;
    return skillsData.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="skills" className="section-padding skills-section" aria-label="Technical Skills">
      <div className="content-width">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-glyph" aria-hidden="true">▪</span>
            <span>02 // SKILL LOADOUT</span>
          </div>
          <h2 className="section-title">
            Technologies I <span className="title-accent">build with</span>
          </h2>
          <p className="section-subtitle">
            Tools, libraries, and frameworks I use to develop fast, reliable web and mobile applications.
          </p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="skills-filter-bar" role="tablist" aria-label="Filter skills by category">
          {skillCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-chip ${isActive ? "is-active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span className="chip-indicator" aria-hidden="true">{isActive ? "▪" : "▫"}</span>
                <span>{cat}</span>
                <span className="chip-count">
                  {cat === "All"
                    ? skillsData.length
                    : skillsData.filter((s) => s.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid" role="region" aria-live="polite">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-card-inner">
                <div className="skill-icon-wrap" aria-hidden="true">
                  <Icon name={skill.icon} />
                </div>
                <div className="skill-info">
                  <h3 className="skill-name">{skill.name}</h3>
                  <div className="skill-meta">
                    <span className="skill-category-tag">{skill.category}</span>
                    <span className="skill-level-tag">{skill.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Tech Summary Footer Bar */}
        <div className="skills-footer-strip">
          <div className="strip-item">
            <span className="strip-glyph" aria-hidden="true">▪</span>
            <span>Frontend: React, Next.js, TypeScript, Tailwind</span>
          </div>
          <div className="strip-item">
            <span className="strip-glyph" aria-hidden="true">▪</span>
            <span>Backend: Node.js, Express, MongoDB, REST</span>
          </div>
          <div className="strip-item">
            <span className="strip-glyph" aria-hidden="true">▪</span>
            <span>Mobile: React Native & Cross-Platform</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
