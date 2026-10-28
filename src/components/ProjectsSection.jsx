"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { projectsData, projectCategories } from "../data/portfolioData";

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="section-padding projects-section" aria-label="Selected Projects">
      <div className="content-width">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-glyph" aria-hidden="true">▪</span>
            <span>03 // QUEST ARCHIVE</span>
          </div>
          <h2 className="section-title">
            Projects I&apos;ve <span className="title-accent">shipped</span>
          </h2>
          <p className="section-subtitle">
            A curated collection of client applications, production websites, and web products.
          </p>
        </div>

        {/* Category Filters */}
        <div className="projects-filter-bar" role="tablist" aria-label="Filter projects by category">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category;
            const count =
              category === "All"
                ? projectsData.length
                : projectsData.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-chip ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                <span className="chip-indicator" aria-hidden="true">{isActive ? "▪" : "▫"}</span>
                <span>{category}</span>
                <span className="chip-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            const isPlayStore = project.link.includes("play.google.com");

            return (
              <article key={project.id} className="project-card">
                {/* Media Wrap with subtle hover zoom */}
                <div className="project-media-wrap">
                  {/* Screenshots are up to ~1900px wide; next/image serves a card-sized copy */}
                  <Image
                    src={project.img}
                    alt={`${project.name} preview`}
                    className="project-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 400px"
                  />
                  <div className="project-media-overlay" />

                  {/* Top badges */}
                  <div className="project-media-badges">
                    <span className="project-index-badge">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="project-type-badge">
                      {project.badge || project.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="project-content">
                  <div className="project-title-row">
                    <h3 className="project-title">{project.name}</h3>
                  </div>

                  <p className={`project-desc ${isExpanded ? "is-full" : "is-clamped"}`}>
                    {project.description}
                  </p>

                  {project.description.length > 140 && (
                    <button
                      type="button"
                      className="project-expand-btn"
                      onClick={() => toggleExpand(project.id)}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Show less" : "Read full description"}
                      <span className="expand-symbol" aria-hidden="true">
                        {isExpanded ? " −" : " +"}
                      </span>
                    </button>
                  )}

                  {/* Tech Tags */}
                  <div className="project-tags" aria-label="Technologies used">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions */}
                  <div className="project-card-footer">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-link"
                      aria-label={`Open ${project.name} ${isPlayStore ? "in Google Play Store" : "live website"}`}
                    >
                      <span>{isPlayStore ? "Google Play" : "Live Demo"}</span>
                      <span className="action-arrow" aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
