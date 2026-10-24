"use client";

import React, { useState, useRef, useEffect } from "react";

/**
 * PixelHeroSprite
 * An original 8-bit developer/adventurer sprite with a gentle stepped idle animation.
 * Features an interactive retro speech balloon:
 * - Displays each title for exactly 3 seconds.
 * - On fast clicks, immediately cycles to the next title with no lag.
 * - Restarts the 3-second display window on every click.
 */
const PixelHeroSprite = () => {
  const [bubbleMessage, setBubbleMessage] = useState(null);
  const timeoutRef = useRef(null);
  const currentIndexRef = useRef(-1);

  const messages = [
    "Ready Player 1!",
    "Press Start to explore!",
    "Crafting clean code.",
    "Available for hire!",
    "Level 99 Dev Quests!",
    "100% Bug-free builds!"
  ];

  const handleSpriteClick = () => {
    // Clear any previous active timer so it never dismisses early
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Immediately cycle to the next message with zero lag
    const nextIndex = (currentIndexRef.current + 1) % messages.length;
    currentIndexRef.current = nextIndex;
    setBubbleMessage(messages[nextIndex]);

    // Hold title display for exactly 3 seconds from the latest click
    timeoutRef.current = setTimeout(() => {
      setBubbleMessage(null);
      timeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="hero-sprite-wrapper" title="Click me for a retro greeting!">
      {bubbleMessage && (
        <div className="retro-speech-bubble" role="status" aria-live="polite">
          <span className="bubble-arrow" aria-hidden="true">◀</span>
          <span className="bubble-text">{bubbleMessage}</span>
        </div>
      )}

      <button
        type="button"
        className="hero-sprite-button"
        onClick={handleSpriteClick}
        aria-label="Interactive 8-bit developer sprite companion. Click for a message."
      >
        <svg
          className="hero-pixel-svg"
          viewBox="0 0 24 24"
          width="48"
          height="48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
        >
          {/* Headband / Hair Top */}
          <rect x="7" y="2" width="10" height="2" fill="var(--retro-red, #cf5945)" />
          <rect x="5" y="4" width="14" height="2" fill="var(--retro-red, #cf5945)" />

          {/* Headphones band */}
          <rect x="6" y="3" width="12" height="1" fill="var(--text-primary, #f0f3f6)" />
          <rect x="4" y="5" width="2" height="4" fill="var(--retro-gold, #d6a833)" />
          <rect x="18" y="5" width="2" height="4" fill="var(--retro-gold, #d6a833)" />

          {/* Face */}
          <rect x="6" y="6" width="12" height="5" fill="#fcd34d" />
          {/* Eyes (Blinking in CSS) */}
          <rect className="sprite-eye" x="8" y="7" width="2" height="2" fill="#1e2025" />
          <rect className="sprite-eye" x="14" y="7" width="2" height="2" fill="#1e2025" />
          {/* Glasses frame connector */}
          <rect x="10" y="7" width="4" height="1" fill="#1e2025" opacity="0.6" />
          {/* Smile */}
          <rect x="10" y="9" width="4" height="1" fill="#b45309" />

          {/* Hoodie / Torso */}
          <rect x="6" y="11" width="12" height="7" fill="var(--retro-blue, #2563eb)" />
          {/* Hoodie zipper / accent */}
          <rect x="11" y="11" width="2" height="7" fill="var(--surface-border, #93c5fd)" />
          {/* Pixel Heart Badge on chest */}
          <rect x="8" y="12" width="2" height="2" fill="var(--retro-red, #ef4444)" />

          {/* Hands holding a mini laptop */}
          <rect x="4" y="13" width="2" height="4" fill="#fcd34d" />
          <rect x="18" y="13" width="2" height="4" fill="#fcd34d" />

          {/* Mini Retro Laptop / Controller */}
          <rect x="7" y="15" width="10" height="4" fill="#334155" />
          <rect className="sprite-screen" x="8" y="16" width="8" height="2" fill="var(--retro-green, #4ade80)" />

          {/* Legs / Base */}
          <rect x="7" y="18" width="4" height="4" fill="#1e293b" />
          <rect x="13" y="18" width="4" height="4" fill="#1e293b" />
          {/* Shoes */}
          <rect x="6" y="22" width="5" height="2" fill="var(--retro-red, #cf5945)" />
          <rect x="13" y="22" width="5" height="2" fill="var(--retro-red, #cf5945)" />
        </svg>

        <span className="sprite-status-dot" aria-hidden="true" />
      </button>

      <div className="hero-sprite-caption">
        <span className="sprite-tag">LVL 99</span>
        <span className="sprite-status">IDLE // READY</span>
      </div>
    </div>
  );
};

export default PixelHeroSprite;
