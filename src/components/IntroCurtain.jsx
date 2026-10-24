"use client";

import React, { useState, useEffect, useRef } from "react";

// Fired on window once the curtain has fully lifted, so hero animations can start in view
export const INTRO_DONE_EVENT = "intro-curtain:done";

/**
 * IntroCurtain — Cinematic Developer Name Reveal Animation
 * Plays once per browser session (repeat visits skip it via the data-intro-seen flag set in layout.jsx).
 * 1. Full-screen curtain with kicker and status bar.
 * 2. Staggered letter-by-letter slide-up of "NASEEH AN" from an overflow mask (expo.out).
 * 3. 0.9s hold at full prominence.
 * 4. Cinematic exit: word scales & drifts upward while curtain sweeps up to reveal page (expo.inOut).
 * 5. Strict prefers-reduced-motion support and instant click-to-dismiss.
 */
const IntroCurtain = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const root = document.documentElement;

    // Skip on reduced motion, or if the intro already played this session
    if (prefersReducedMotion || root.hasAttribute("data-intro-seen")) {
      setIsDone(true);
      return;
    }

    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // Storage unavailable: intro simply plays again next load
    }

    // Lock page scroll during intro
    const originalOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    // 1. Letters finish entering by ~980ms.
    // 2. Hold for ~850ms.
    // 3. Trigger exit sequence at 1850ms.
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1850);

    // 4. Exit animation takes 900ms -> total 2750ms. Complete and unmount.
    const doneTimer = setTimeout(() => {
      root.style.overflow = originalOverflow;
      setIsDone(true);
    }, 2800);

    timersRef.current = [exitTimer, doneTimer];

    return () => {
      timersRef.current.forEach(clearTimeout);
      root.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (isDone) {
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    }
  }, [isDone]);

  const handleDismiss = () => {
    timersRef.current.forEach(clearTimeout);
    setIsExiting(true);
    setTimeout(() => {
      document.documentElement.style.overflow = "";
      setIsDone(true);
    }, 450);
  };

  if (isDone) return null;

  const name = "NASEEH AN";

  return (
    <div
      onClick={handleDismiss}
      className={`intro-curtain-overlay ${isExiting ? "is-exiting" : ""}`}
      aria-hidden="true"
    >
      {/* Top Header Kicker */}
      <div className="curtain-kicker">
        <span>PORTFOLIO — STAGE 01</span>
      </div>

      {/* Center Word Mask */}
      <div className="curtain-word-mask">
        <span className="curtain-word">
          {name.split("").map((char, index) => (
            <span
              key={index}
              className="curtain-char"
              style={{
                animationDelay: `${index * 38}ms`,
              }}
            >
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </span>
      </div>

      {/* Bottom Footer Status */}
      <div className="curtain-foot">
        <span>
          <span className="curtain-signal" />
          FULL-STACK DEVELOPER — UAE &amp; REMOTE
        </span>
        <span className="curtain-badge">INITIALIZING...</span>
      </div>
    </div>
  );
};

export default IntroCurtain;