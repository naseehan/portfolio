"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * CustomCursor
 * Pure retro gaming 8-bit pixel art crosshair cursor.
 * Features:
 * - 0ms immediate crosshair with crisp black outline, white inner arms, and coral center pip.
 * - Clean classic + shape with zero outer boxes, frames, or trailing squares.
 * - Interactive target lock on hover (arms highlight in coral, subtle pulse).
 * - Tactile recoil downscale on mousedown.
 * - Automatically disabled on touch/coarse devices for zero mobile overhead.
 */
const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState("default"); // "default" | "pointer" | "text"

  const pointerRef = useRef(null);
  // Last known mouse position, so the cursor's first frame is not drawn at the top-left corner
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only enable custom cursor for devices with precision pointer (mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setMounted(true);

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // 0ms immediate update for pixel crosshair
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check element under cursor for interactive hover states
      const target = e.target;
      if (!target) return;

      const interactive = target.closest?.(
        'a, button, [role="button"], input, textarea, select, .project-card, .skill-card, .timeline-card, .service-card, .filter-chip, .theme-toggle-btn, .cinematic-apparition-wrapper, .pixel-cat-button'
      );

      if (interactive) {
        setIsHovering(true);
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          setCursorType("text");
        } else {
          setCursorType("pointer");
        }
      } else {
        setIsHovering(false);
        setCursorType("default");
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="custom-cursor-root" aria-hidden="true">
      {/* 8-Bit Pixel Crosshair Cursor (Pure + Shape, Zero Outer Square) */}
      <div
        ref={pointerRef}
        style={{ transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)` }}
        className={`retro-pointer-wrap ${isHovering ? "is-hovering" : ""} ${isClicking ? "is-clicking" : ""} type-${cursorType}`}
      >
        {cursorType === "text" ? (
          <div className="retro-text-caret">
            <span className="caret-beam" />
          </div>
        ) : (
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            className="pixel-crosshair-svg"
            shapeRendering="crispEdges"
          >
            {/* Outer high-contrast black outline */}
            <g fill="#0a0c10" className="crosshair-outline">
              {/* Center Box Outline */}
              <rect x="12" y="12" width="5" height="5" />
              {/* North Arm Outline */}
              <rect x="13" y="1" width="3" height="9" />
              {/* South Arm Outline */}
              <rect x="13" y="19" width="3" height="9" />
              {/* West Arm Outline */}
              <rect x="1" y="13" width="9" height="3" />
              {/* East Arm Outline */}
              <rect x="19" y="13" width="9" height="3" />
            </g>

            {/* Inner White Pixel Body */}
            <g fill="#ffffff" className="crosshair-inner">
              {/* North Arm */}
              <rect x="14" y="2" width="1" height="7" className="crosshair-arm-px" />
              {/* South Arm */}
              <rect x="14" y="20" width="1" height="7" className="crosshair-arm-px" />
              {/* West Arm */}
              <rect x="2" y="14" width="7" height="1" className="crosshair-arm-px" />
              {/* East Arm */}
              <rect x="20" y="14" width="7" height="1" className="crosshair-arm-px" />
            </g>

            {/* Center Targeting Pip */}
            <g className="crosshair-center">
              <rect x="13" y="13" width="3" height="3" fill="#ffffff" />
              <rect
                x="14"
                y="14"
                width="1"
                height="1"
                fill="var(--retro-red, #ef4444)"
                className="crosshair-pip"
              />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;