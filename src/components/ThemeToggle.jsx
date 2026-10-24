"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../features/themeSlice";

const ThemeToggle = ({ showLabel = true, className = "" }) => {
  const dispatch = useDispatch();
  const { theme1 } = useSelector((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    dispatch(changeTheme());
  };

  // Prevent SSR/Client hydration mismatch before mount
  const isLight = mounted ? theme1 : false;

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${isLight ? "is-light" : "is-dark"} ${className}`}
      onClick={handleToggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      <span className="theme-toggle-indicator" aria-hidden="true">
        {isLight ? (
          <i className="fa-solid fa-moon theme-toggle-icon" />
        ) : (
          <i className="fa-solid fa-sun theme-toggle-icon" />
        )}
      </span>
      {showLabel && (
        <span className="theme-toggle-text">
          {isLight ? "Dark Mode" : "Light Mode"}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
