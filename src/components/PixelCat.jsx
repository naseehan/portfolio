"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * PixelCat — Interactive Retro Pixel-Art Cat Companion (v2)
 *
 * Design:
 * - Cute orange-and-white tabby 16-bit RPG cat with an adventurer backpack,
 *   gold buckle, and red scarf.
 * - Custom transparent pixel-art sprite sheet (/images/pixel-cat-v2-spritesheet.webp).
 *
 * Behaviors:
 * 1. Rests at the bottom-left corner of the viewport on page load.
 * 2. Runs horizontally along the bottom viewport edge when scrolling.
 * 3. Smoothly decelerates back to idle when scrolling stops.
 * 4. Touching or clicking triggers random reactions (jump, stretch, roll, surprised, sleep).
 * 5. Shows retro pixel speech bubbles on click / interaction (only when clicked).
 * 6. Naturally curls up to sleep after ~18s of inactivity, waking up on scroll or click.
 * 7. Flips horizontally when changing direction (facing right vs left).
 * 8. Backpack and red scarf stay attached across all animations.
 * 9. Hardware-accelerated CSS transforms (0ms layout shifts).
 * 10. Respects prefers-reduced-motion and is touch-friendly.
 */

const ANIM_CONFIG = {
  idle: { row: 0, frames: 6, startFrame: 0, interval: 180, loop: true },
  run: { row: 1, frames: 6, startFrame: 0, interval: 95, loop: true },
  sleep: { row: 2, frames: 6, startFrame: 0, interval: 220, loop: true },
  jump: { row: 3, frames: 6, startFrame: 0, interval: 130, loop: false },
  roll: { row: 4, frames: 6, startFrame: 0, interval: 150, loop: false },
  stretch: { row: 5, frames: 4, startFrame: 0, interval: 200, loop: false },
  surprised: { row: 5, frames: 2, startFrame: 4, interval: 220, loop: false },
};

const CAT_QUOTES = [
  "Meow! I'm Naseeh's sidekick.",
  "Scroll on, I'll keep up!",
  "Psst... the projects are pawsome.",
  "I catch bugs. Naseeh fixes them.",
  "Built with React and catnip.",
  "Backpack full of side projects!",
  "Nap time? Not while you're here.",
  "Purr... smooth scrolling, huh?",
  "Like it? Drop Naseeh a message!",
];

const FRAME_W = 80; // Display width in CSS pixels (1/2 scale of 160px)
const FRAME_H = 80; // Display height in CSS pixels (1/2 scale of 160px)
const SPRITE_SHEET_W = 480; // 80px * 6 cols (scales 960px 1:1)
const SPRITE_SHEET_H = 480; // 80px * 6 rows (scales 960px 1:1)
const IDLE_SLEEP_TIMEOUT = 18000; // 18 seconds before drifting to sleep

const PixelCat = () => {
  // Only run on desktop-sized screens (the cat is hidden on mobile), so no animation loop drains phone batteries
  const [enabled, setEnabled] = useState(false);
  const [speech, setSpeech] = useState(null);

  const speechRef = useRef(null);

  // Animation state
  const animStateRef = useRef("idle");
  const frameRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  // Position & physics (in px from left)
  const posXRef = useRef(24);
  const targetXRef = useRef(24);
  const facingRef = useRef(1); // 1 = right, -1 = left
  const isScrollingRef = useRef(false);
  const scrollStopTimerRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const speechTimerRef = useRef(null);
  const reactionTimerRef = useRef(null);
  const idleSleepTimerRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const isMobileRef = useRef(false);

  // DOM refs
  const wrapperRef = useRef(null);
  const flipperRef = useRef(null);
  const spriteRef = useRef(null);
  const bubbleRef = useRef(null);
  const bubbleTailRef = useRef(null);
  const rafIdRef = useRef(null);

  // Update background-position on sprite DOM directly for max 60fps performance
  const updateSpriteFrame = useCallback((row, col) => {
    if (!spriteRef.current) return;
    const bgX = -col * FRAME_W;
    const bgY = -row * FRAME_H;
    spriteRef.current.style.backgroundPosition = `${bgX}px ${bgY}px`;
  }, []);

  // Show a speech bubble with auto-dismiss
  const showSpeechBubble = useCallback((text = null) => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
    }
    const quote = text || CAT_QUOTES[Math.floor(Math.random() * CAT_QUOTES.length)];
    speechRef.current = quote;
    setSpeech(quote);

    speechTimerRef.current = setTimeout(() => {
      speechRef.current = null;
      setSpeech(null);
      speechTimerRef.current = null;
    }, 3800);
  }, []);

  // Helper to schedule idle sleep
  const scheduleIdleSleep = useCallback(() => {
    if (idleSleepTimerRef.current) {
      clearTimeout(idleSleepTimerRef.current);
    }
    idleSleepTimerRef.current = setTimeout(() => {
      if (!isScrollingRef.current && animStateRef.current === "idle") {
        animStateRef.current = "sleep";
        frameRef.current = 0;
        updateSpriteFrame(ANIM_CONFIG.sleep.row, 0);
      }
    }, IDLE_SLEEP_TIMEOUT);
  }, [updateSpriteFrame]);

  // Trigger a reaction animation
  const triggerReaction = useCallback((reactionName = null) => {
    const reactions = ["jump", "stretch", "roll", "surprised", "sleep"];
    const chosen = reactionName || reactions[Math.floor(Math.random() * reactions.length)];
    const config = ANIM_CONFIG[chosen];

    animStateRef.current = chosen;
    const start = config.startFrame || 0;
    frameRef.current = start;
    lastFrameTimeRef.current = performance.now();
    updateSpriteFrame(config.row, start);

    // Show cheerful quote on click
    showSpeechBubble();

    // Reset idle sleep timer
    if (idleSleepTimerRef.current) {
      clearTimeout(idleSleepTimerRef.current);
    }

    // Duration of full reaction sequence
    const duration = config.frames * config.interval + 120;
    if (reactionTimerRef.current) {
      clearTimeout(reactionTimerRef.current);
    }
    reactionTimerRef.current = setTimeout(() => {
      animStateRef.current = isScrollingRef.current ? "run" : "idle";
      frameRef.current = 0;
      updateSpriteFrame(ANIM_CONFIG[animStateRef.current].row, 0);
      scheduleIdleSleep();
    }, duration);
  }, [showSpeechBubble, updateSpriteFrame, scheduleIdleSleep]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isMobileRef.current = window.innerWidth <= 768;
    lastScrollYRef.current = window.scrollY;

    // Start idle sleep countdown on mount
    scheduleIdleSleep();

    // Scroll listener: detects direction, progress, and running state
    const handleScroll = () => {
      // Mobile & reduced motion bypass
      if (isMobileRef.current || reducedMotionRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Reset idle sleep countdown on user activity
      if (idleSleepTimerRef.current) {
        clearTimeout(idleSleepTimerRef.current);
      }

      // Reduced motion bypass
      if (reducedMotionRef.current) return;

      // Determine facing direction
      if (Math.abs(scrollDelta) > 1) {
        facingRef.current = scrollDelta >= 0 ? 1 : -1;
      }

      // Calculate safe horizontal bounds along viewport
      const screenW = window.innerWidth;
      const minX = 24;
      const maxX = Math.max(minX, screenW - FRAME_W - 24);

      // Map document scroll progress to horizontal runner bounds
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(1, Math.max(0, currentScrollY / docHeight)) : 0;
      targetXRef.current = minX + scrollProgress * (maxX - minX);

      // Wake up and run unless currently reacting
      isScrollingRef.current = true;
      const nonInterruptReactions = ["jump", "stretch", "roll", "surprised"];
      if (!nonInterruptReactions.includes(animStateRef.current)) {
        animStateRef.current = "run";
      }

      // Reset scroll idle debounce
      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }
      scrollStopTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        if (!nonInterruptReactions.includes(animStateRef.current)) {
          animStateRef.current = "idle";
          frameRef.current = 0;
          updateSpriteFrame(ANIM_CONFIG.idle.row, 0);
          scheduleIdleSleep();
        }
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle screen resize
    const handleResize = () => {
      const screenW = window.innerWidth;
      const minX = 24;
      const maxX = Math.max(minX, screenW - FRAME_W - 24);
      posXRef.current = Math.min(maxX, Math.max(minX, posXRef.current));
      targetXRef.current = Math.min(maxX, Math.max(minX, targetXRef.current));
    };

    window.addEventListener("resize", handleResize);

    // Main 60fps render & physics loop
    const animateLoop = (now) => {
      // 1. Frame advancement
      const currentState = animStateRef.current;
      const config = ANIM_CONFIG[currentState];

      if (now - lastFrameTimeRef.current >= config.interval) {
        lastFrameTimeRef.current = now;
        const start = config.startFrame || 0;
        const count = config.frames;
        if (config.loop) {
          frameRef.current = start + ((frameRef.current - start + 1) % count);
        } else {
          frameRef.current = Math.min(start + count - 1, frameRef.current + 1);
        }
        updateSpriteFrame(config.row, frameRef.current);
      }

      // 2. Physics translation (smooth lerp toward targetX)
      if (!reducedMotionRef.current) {
        const lerpFactor = 0.16;
        posXRef.current += (targetXRef.current - posXRef.current) * lerpFactor;
      }

      // Apply translation to wrapper (never flipped, keeping speech bubble readable)
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${posXRef.current}px, 0, 0)`;
      }

      // Apply direction flip ONLY to the cat character
      if (flipperRef.current) {
        flipperRef.current.style.transform = `scaleX(${facingRef.current})`;
      }

      // Keep the speech bubble inside the viewport (it is centred on the cat, which rests at
      // the screen edge), sliding it sideways while the tail keeps pointing at the cat
      if (bubbleRef.current && bubbleTailRef.current) {
        const margin = 8;
        const halfWidth = bubbleRef.current.offsetWidth / 2;
        const catCenter = posXRef.current + FRAME_W / 2;
        const minCenter = margin + halfWidth;
        const maxCenter = Math.max(minCenter, window.innerWidth - margin - halfWidth);
        const shift = Math.min(maxCenter, Math.max(minCenter, catCenter)) - catCenter;
        const tailInset = Math.max(-halfWidth + 14, Math.min(halfWidth - 14, -shift));
        bubbleRef.current.style.translate = `calc(-50% + ${shift}px) 0`;
        bubbleTailRef.current.style.left = `calc(50% + ${tailInset}px)`;
      }

      rafIdRef.current = requestAnimationFrame(animateLoop);
    };

    rafIdRef.current = requestAnimationFrame(animateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
      if (idleSleepTimerRef.current) clearTimeout(idleSleepTimerRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [enabled, scheduleIdleSleep, updateSpriteFrame]);

  if (!enabled) return null;

  return (
    <div
      className="pixel-cat-root"
      aria-live="polite"
    >
      <div
        ref={wrapperRef}
        className="pixel-cat-transform-wrap"
      >
        {/* Speech Bubble (Always normal reading orientation, never flipped) */}
        {speech && (
          <div
            ref={bubbleRef}
            className="pixel-cat-speech-bubble"
            role="status"
          >
            <span className="bubble-pixel-text">{speech}</span>
            <span ref={bubbleTailRef} className="bubble-pixel-tail" aria-hidden="true" />
          </div>
        )}

        {/* Flipper container — ONLY the cat and its local attachments flip direction */}
        <div
          ref={flipperRef}
          className="pixel-cat-flipper"
        >
          <button
            type="button"
            onClick={() => triggerReaction()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerReaction();
              }
            }}
            className="pixel-cat-button"
            aria-label="Pixel art cat companion wearing an adventurer backpack. Click to play with cat."
            title="Click to interact with your adventurer cat companion!"
          >
            <div
              ref={spriteRef}
              className="pixel-cat-sprite"
              style={{
                width: `${FRAME_W}px`,
                height: `${FRAME_H}px`,
                backgroundImage: "url('/images/pixel-cat-v2-spritesheet.webp')",
                backgroundSize: `${SPRITE_SHEET_W}px ${SPRITE_SHEET_H}px`,
                backgroundPosition: "0px 0px",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PixelCat;
