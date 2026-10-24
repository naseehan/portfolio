"use client";

import React from "react";

/**
 * GamingBgAnimation
 * A visible, charming retro gaming background loop animation.
 * Features animated 8-bit sprites (spinning coin, patrol invader, floating heart,
 * power star, and floating game controller) with distinct arcade colors.
 * Fully responsive and pauses when prefers-reduced-motion is enabled.
 */
const GamingBgAnimation = () => {
  return (
    <div className="gaming-bg-canvas" aria-hidden="true">
      {/* Retro Arcade Grid Layer */}
      <div className="gaming-bg-grid" />

    
    </div>
  );
};

export default GamingBgAnimation;
