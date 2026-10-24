"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { INTRO_DONE_EVENT } from "./IntroCurtain";

// Total length of the effect layer's animations (see the APPARITION EFFECT block in App.css)
const APPARITION_MS = 900;

// Directions the smoke puffs fly out in when the controller cracks into place
const PUFF_ANGLES = [0, 55, 115, 180, 235, 300];

/**
 * ApparitionIcon — Harry Potter style Apparition of a game controller
 *
 * 1. Twist: smoke spirals inward and tightens into a vertical column while the
 *    controller spins in as a thin smeared sliver.
 * 2. Crack: it snaps to full size with a flash, a shockwave ring and a burst of smoke.
 * 3. Settle: a short wobble, then the clean controller stays visible.
 *
 * Interactive:
 * - Plays once when the icon is on screen, after the intro curtain has lifted.
 * - Replays whenever the user clicks the icon; rapid clicks restart it cleanly.
 */
const ApparitionIcon = ({ className = "" }) => {
  const [animKey, setAnimKey] = useState(0);
  const [hasApparated, setHasApparated] = useState(false);
  const [vortexDone, setVortexDone] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const observerRef = useRef(null);

  const triggerApparition = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Increment animKey to completely re-mount animated nodes from frame 0
    setAnimKey((prev) => prev + 1);
    setHasApparated(true);
    setVortexDone(false);

    // Remove the effect layer once its last animation has finished
    timerRef.current = setTimeout(() => {
      setVortexDone(true);
    }, APPARITION_MS);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion immediately
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setHasApparated(true);
      setVortexDone(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    // Trigger once when entering the viewport
    const observeIcon = () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            triggerApparition();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current = observer;
      observer.observe(node);
    };

    // On a first visit the intro curtain covers the page: wait until it has lifted,
    // otherwise the apparition plays unseen behind it
    const curtainUp =
      !document.documentElement.hasAttribute("data-intro-seen") &&
      document.querySelector(".intro-curtain-overlay");

    if (curtainUp) {
      window.addEventListener(INTRO_DONE_EVENT, observeIcon, { once: true });
    } else {
      observeIcon();
    }

    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, observeIcon);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [triggerApparition]);

  const handleClick = (e) => {
    e.stopPropagation();
    triggerApparition();
  };

  return (
    // Decorative: a <span> (not a <button>) so the hero <h1> reads cleanly for screen readers and search engines
    <span
      ref={containerRef}
      onClick={handleClick}
      aria-hidden="true"
      className={`cinematic-apparition-wrapper ${
        hasApparated ? "is-active" : "is-hidden"
      } ${vortexDone ? "is-settled" : ""} ${className}`}
      title="Click to replay apparition"
    >
      {/* Effect layer: twisting smoke, then the crack (flash, ring, puffs) */}
      {!vortexDone && hasApparated && (
        <span key={`vortex-${animKey}`} className="cinematic-vortex-layer" aria-hidden="true">
          <svg
            className="cinematic-vortex-svg"
            viewBox="0 0 100 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="apparitionSmokeBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.3" />
              </filter>
            </defs>

            {/* Three spirals winding in towards the centre */}
            <path
              className="smoke-spiral"
              d="M 90 40 C 90 12, 18 10, 14 40 C 10 64, 76 70, 76 42 C 76 24, 32 22, 32 40 C 32 52, 60 54, 60 40"
              pathLength="100"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#apparitionSmokeBlur)"
            />
            <path
              className="smoke-spiral smoke-spiral-b"
              d="M 10 40 C 10 68, 82 70, 86 40 C 90 16, 24 10, 24 38 C 24 56, 68 58, 68 40 C 68 28, 40 28, 40 40"
              pathLength="100"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#apparitionSmokeBlur)"
            />
            <path
              className="smoke-spiral smoke-spiral-c"
              d="M 50 4 C 84 6, 92 50, 62 64 C 38 74, 20 50, 34 30 C 44 18, 62 26, 56 40"
              pathLength="100"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#apparitionSmokeBlur)"
            />
          </svg>

          <span className="apparition-flash" />
          <span className="apparition-ring" />
          {PUFF_ANGLES.map((angle) => (
            <span key={angle} className="apparition-puff" style={{ "--a": `${angle}deg` }} />
          ))}
        </span>
      )}

      {/* The subject: game controller */}
      <span key={`subject-${animKey}`} className="cinematic-icon-subject" aria-hidden="true">
        <svg
          viewBox="0 0 24 16"
          width="26"
          height="18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cinematic-controller-svg"
        >
          {/* Controller Outer Body */}
          <path
            d="M3.5 1.5C2.11929 1.5 1 2.61929 1 4V10.5C1 12.433 2.567 14 4.5 14C5.466 14 6.34 13.61 6.98 12.98L8.6 11.36C8.85 11.11 9.2 10.97 9.56 10.97H14.44C14.8 10.97 15.15 11.11 15.4 11.36L17.02 12.98C17.66 13.61 18.534 14 19.5 14C21.433 14 23 12.433 23 10.5V4C23 2.61929 21.8807 1.5 20.5 1.5H3.5Z"
            fill="currentColor"
            stroke="var(--retro-blue, #60a5fa)"
            strokeWidth="1.2"
          />

          {/* D-Pad on Left */}
          <path
            d="M5 4.5H6.5V6H8V7.5H6.5V9H5V7.5H3.5V6H5V4.5Z"
            fill="var(--retro-cyan, #93c5fd)"
          />

          {/* Action Buttons on Right (Diamond layout) */}
          <circle cx="18.5" cy="5" r="0.8" fill="#f87171" />
          <circle cx="20" cy="6.7" r="0.8" fill="#fbbf24" />
          <circle cx="17" cy="6.7" r="0.8" fill="#60a5fa" />
          <circle cx="18.5" cy="8.4" r="0.8" fill="#4ade80" />

          {/* Center Start / Select Pills */}
          <rect x="10.2" y="5.8" width="1.4" height="0.9" rx="0.4" fill="var(--text-muted, #94a3b8)" />
          <rect x="12.4" y="5.8" width="1.4" height="0.9" rx="0.4" fill="var(--text-muted, #94a3b8)" />

          {/* Top Status LED */}
          <circle cx="12" cy="3.2" r="0.7" fill="var(--retro-green, #4ade80)" />
        </svg>
      </span>
    </span>
  );
};

export default ApparitionIcon;
