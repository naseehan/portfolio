"use client";

import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { id: "home", label: "Home", code: "00" },
  { id: "about", label: "About", code: "01" },
  { id: "skills", label: "Skills", code: "02" },
  { id: "projects", label: "Projects", code: "03" },
  { id: "experience", label: "Experience", code: "04" },
  { id: "contact", label: "Contact", code: "05" }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);

  // Closed drawer is inert, so its hidden links can't be reached with Tab
  // (set on the DOM node so it works the same in React 18 and 19)
  useEffect(() => {
    if (drawerRef.current) drawerRef.current.inert = !mobileMenuOpen;
  }, [mobileMenuOpen]);

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionElements = navLinks.map((link) =>
        document.getElementById(link.id)
      );

      const scrollPosition = window.scrollY + 140;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close the menu with the Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const headerOffset = 70;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Update URL hash without jumping
      window.history.pushState(null, "", `#${targetId}`);
      setActiveSection(targetId);
    }
  };

  return (
    <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner content-width">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="brand-logo"
          aria-label="naseeh.an - Home"
        >
          <span className="brand-text">
            NASEEH<span className="brand-accent">.AN</span>
          </span>
          <span className="brand-role-badge">FULL-STACK</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="nav-item">
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`nav-link ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="nav-code" aria-hidden="true">{link.code}</span>
                    <span className="nav-label">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right action area */}
        <div className="header-actions">
          <ThemeToggle showLabel={false} className="header-theme-toggle" />

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-drawer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </div>
      </div>

    </header>

      {/* Mobile Drawer / Overlay — kept outside <header>: the header's backdrop-filter would
          otherwise trap these fixed elements inside its 68px box */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">MENU</span>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="mobile-nav-item">
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
                  >
                    <span className="mobile-nav-code">{link.code}</span>
                    <span className="mobile-nav-label">{link.label}</span>
                    <i className="fa-solid fa-arrow-right mobile-nav-arrow" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <div className="mobile-theme-row">
            <span>Appearance</span>
            <ThemeToggle showLabel={true} />
          </div>
          <p className="mobile-status-text">
            <span className="status-indicator-dot" /> Available for opportunities in UAE & Remote
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
