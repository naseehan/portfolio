import React, { useState, useEffect, useRef } from "react";
import "./Counter.css"; // For fadeIn effect

const Counter = ({ start = 0, end, suffix = "", duration = 3000 }) => {
  const [count, setCount] = useState(start);
  const [visible, setVisible] = useState(false); // For fade-in effect and counting trigger
  const counterRef = useRef(null); // To observe the DOM element

  useEffect(() => {
    const counterElement = counterRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterElement) {
      observer.observe(counterElement);
    }

    return () => {
      if (counterElement) {
        observer.unobserve(counterElement);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      const incrementTime = Math.abs(Math.floor(duration / (end - start)));

      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < end) {
            return prevCount + 1;
          } else {
            clearInterval(interval);
            return end;
          }
        });
      }, incrementTime);

      return () => clearInterval(interval);
    }
  }, [visible, end, duration, start]);

  // Format number with commas and append suffix
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
  };

  return (
    <div
      ref={counterRef}
      className={`count ${visible ? "fade-in" : ""}`}
      data-count={end}
    >
      {formatNumber(count)}
    </div>
  );
};

export default Counter;
