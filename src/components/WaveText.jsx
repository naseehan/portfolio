import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

import "../stylePages/waveText.css";

const AnimFeTurbulence = animated("feTurbulence");
const AnimFeDisplacementMap = animated("feDisplacementMap");

export default function WaveText() {
  // Set the initial state to true to trigger the animation on mount
  const [open, setOpen] = useState(true);

  // Optionally, use useEffect to ensure the animation starts on mount
  useEffect(() => {
    setOpen(true);
  }, []);

  const [{ freq, factor, scale, opacity }] = useSpring(() => ({
    reverse: open,
    from: { factor: 150, opacity: 1, scale: 1, freq: "0.0, 0.0" },
    to: { factor: 10, opacity: 0, scale: 0.9, freq: "0.0175, 0.0" },
    config: { duration: 3000 },
  }));

  return (
    // <div className="container">
    <animated.svg
      className="svg-width"
      style={{ scale, opacity }}
      viewBox="0 0 1278 446"
    >
      <defs>
        <filter id="waves">
          <AnimFeTurbulence
            type="fractalNoise"
            baseFrequency={freq}
            numOctaves="2"
            result="TURB"
            seed="8"
          />
          <AnimFeDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            in="SourceGraphic"
            in2="TURB"
            result="DISP"
            scale={factor}
          />
        </filter>
      </defs>
      <g filter="url(#waves)">
        {/* Replace this path with your desired SVG path */}
        <path
          d="M 595.166 113.965 L 567.627 113.965 L 545.728 36.841 L 545.068 36.841 A 137.783 137.783 0 0 1 545.217 38.475 Q 545.444 41.125 545.691 44.971 Q 546.021 50.098 546.313 56.03 Q 546.606 61.963 546.606 67.456 L 546.606 113.965 L 520.972 113.965 L 520.972 6.885 L 559.497 6.885 L 581.836 82.91 L 582.422 82.91 L 604.321 6.885 L 642.92 6.885 L 642.92 113.965 L 616.333 113.965 L 616.333 67.017 A 311.965 311.965 0 0 1 616.379 61.771 A 386.031 386.031 0 0 1 616.516 56.14 A 663.17 663.17 0 0 1 616.718 50.482 A 554.487 554.487 0 0 1 616.956 45.154 A 644.536 644.536 0 0 1 617.081 42.707 Q 617.209 40.323 617.327 38.514 A 190.338 190.338 0 0 1 617.432 36.987 L 616.772 36.987 L 595.166 113.965 Z M 362.915 30.981 L 391.553 30.981 L 391.553 113.965 L 369.946 113.965 L 366.357 103.638 L 364.673 103.638 A 21.516 21.516 0 0 1 358.191 110.413 A 28.049 28.049 0 0 1 349.512 114.221 A 40.033 40.033 0 0 1 339.624 115.43 A 36.179 36.179 0 0 1 330.75 114.377 A 30.739 30.739 0 0 1 324.939 112.28 A 23.416 23.416 0 0 1 314.967 103.119 A 28.598 28.598 0 0 1 314.539 102.393 A 26.976 26.976 0 0 1 311.811 95.356 Q 310.693 90.759 310.693 85.034 L 310.693 30.981 L 339.331 30.981 L 339.331 76.318 A 45.244 45.244 0 0 0 339.534 80.763 Q 339.978 85.241 341.389 88.106 A 12.399 12.399 0 0 0 341.638 88.586 A 7.616 7.616 0 0 0 347.054 92.596 A 11.076 11.076 0 0 0 349.219 92.798 A 16.151 16.151 0 0 0 352.511 92.482 Q 354.595 92.048 356.178 91.018 A 9.064 9.064 0 0 0 357.605 89.868 A 12.546 12.546 0 0 0 359.925 86.642 Q 360.698 85.138 361.239 83.275 A 26.185 26.185 0 0 0 361.743 81.226 A 50.828 50.828 0 0 0 362.457 76.591 Q 362.915 72.437 362.915 67.31 L 362.915 30.981 Z M 108.911 113.965 L 77.271 113.965 L 71.997 93.896 L 37.207 93.896 L 31.787 113.965 L 0 113.965 L 34.937 6.445 L 73.535 6.445 L 108.911 113.965 Z M 118.799 0 L 147.437 0 L 147.437 25.781 A 118.807 118.807 0 0 1 147.272 32.146 A 103.206 103.206 0 0 1 147.144 34.167 A 158.517 158.517 0 0 1 146.72 38.971 A 131.904 131.904 0 0 1 146.411 41.675 L 147.437 41.675 A 29.734 29.734 0 0 1 155.859 33.069 A 19.086 19.086 0 0 1 161.865 30.405 Q 165.271 29.517 169.482 29.517 Q 182.446 29.517 190.686 40.503 Q 198.926 51.489 198.926 72.29 A 87.593 87.593 0 0 1 198.39 82.258 Q 197.804 87.363 196.578 91.711 A 45.161 45.161 0 0 1 195.117 96.057 A 38.921 38.921 0 0 1 191.521 103.097 A 27.541 27.541 0 0 1 184.46 110.559 A 26.384 26.384 0 0 1 169.86 115.406 A 32.51 32.51 0 0 1 168.604 115.43 A 40.904 40.904 0 0 1 163.756 115.162 Q 161.313 114.869 159.312 114.258 A 15.536 15.536 0 0 1 155.237 112.39 A 46.279 46.279 0 0 1 150.516 108.82 A 37.413 37.413 0 0 1 147.437 105.835 L 145.679 105.835 L 141.138 113.965 L 118.799 113.965 L 118.799 0 Z M 740.845 67.456 L 740.845 80.2 L 689.648 80.2 Q 690.015 86.719 694.519 90.894 Q 698.182 94.289 704.68 94.923 A 32.287 32.287 0 0 0 707.812 95.068 Q 715.576 95.068 722.058 93.53 A 64.472 64.472 0 0 0 730.318 90.95 A 78.817 78.817 0 0 0 735.425 88.77 L 735.425 109.351 A 49.164 49.164 0 0 1 723.637 113.675 A 55.442 55.442 0 0 1 722.314 113.965 A 61.757 61.757 0 0 1 716.527 114.85 Q 713.524 115.176 710.052 115.319 A 138.687 138.687 0 0 1 704.37 115.43 A 60.115 60.115 0 0 1 691.813 114.17 A 48.34 48.34 0 0 1 681.958 110.962 Q 672.07 106.494 666.394 97.119 Q 661.461 88.972 660.815 76.786 A 71.119 71.119 0 0 1 660.718 73.022 A 71.63 71.63 0 0 1 661.409 62.766 Q 662.6 54.545 665.845 48.45 A 33.899 33.899 0 0 1 674.097 38.154 A 32.183 32.183 0 0 1 680.2 34.167 A 42.804 42.804 0 0 1 692.909 30.171 A 56.382 56.382 0 0 1 701.66 29.517 A 58.3 58.3 0 0 1 711.604 30.323 Q 717.403 31.327 722.224 33.581 A 36.494 36.494 0 0 1 722.534 33.728 A 30.178 30.178 0 0 1 736.084 46.362 A 34.671 34.671 0 0 1 739.655 55.847 Q 740.603 60.049 740.796 64.926 A 64.099 64.099 0 0 1 740.845 67.456 Z M 465.82 89.941 L 465.82 110.815 Q 461.133 112.866 455.896 114.148 A 38.629 38.629 0 0 1 451.66 114.916 Q 449.418 115.205 446.809 115.331 A 88.655 88.655 0 0 1 442.529 115.43 A 43.739 43.739 0 0 1 435.395 114.874 A 32.529 32.529 0 0 1 428.32 112.903 Q 422.168 110.376 418.762 104.114 Q 416.354 99.686 415.649 92.787 A 60.527 60.527 0 0 1 415.356 86.646 L 415.356 52.441 L 405.322 52.441 L 405.322 40.796 L 418.066 31.787 L 425.464 14.355 L 444.214 14.355 L 444.214 30.981 L 464.575 30.981 L 464.575 52.441 L 444.214 52.441 L 444.214 84.741 A 12.582 12.582 0 0 0 444.409 87.036 Q 444.847 89.391 446.265 90.784 A 6.741 6.741 0 0 0 449.362 92.491 Q 450.399 92.759 451.624 92.793 A 12.896 12.896 0 0 0 451.978 92.798 A 32.528 32.528 0 0 0 456.109 92.546 A 25.735 25.735 0 0 0 459.082 91.992 Q 462.305 91.187 465.82 89.941 Z M 293.879 81.525 A 64.846 64.846 0 0 0 294.507 72.29 A 69.507 69.507 0 0 0 294.489 70.691 Q 294.361 65.145 293.34 60.315 A 40.105 40.105 0 0 0 289.197 48.999 A 35.865 35.865 0 0 0 274.585 34.497 A 40.524 40.524 0 0 0 265.285 30.922 A 48.894 48.894 0 0 0 253.345 29.517 A 56.937 56.937 0 0 0 243.052 30.403 A 41.152 41.152 0 0 0 231.042 34.497 A 34.01 34.01 0 0 0 216.687 48.999 A 36.882 36.882 0 0 0 215.715 50.987 Q 211.67 59.926 211.67 72.29 A 61.616 61.616 0 0 0 212.252 80.942 A 46.011 46.011 0 0 0 214.709 90.747 Q 217.749 98.804 223.315 104.297 Q 228.882 109.79 236.389 112.61 A 42.354 42.354 0 0 0 242.737 114.436 A 50.252 50.252 0 0 0 252.905 115.43 A 58.743 58.743 0 0 0 260.434 114.964 A 45.358 45.358 0 0 0 270.264 112.61 A 40.351 40.351 0 0 0 270.98 112.34 A 34.93 34.93 0 0 0 283.374 104.297 A 33.398 33.398 0 0 0 287.217 99.614 A 38.619 38.619 0 0 0 291.65 90.747 A 48.017 48.017 0 0 0 293.879 81.525 Z M 43.213 70.166 L 65.991 70.166 L 61.377 52.588 A 810.132 810.132 0 0 0 60.97 51.006 Q 60.507 49.217 59.869 46.776 A 3257.532 3257.532 0 0 0 59.253 44.421 A 509.696 509.696 0 0 1 56.846 34.848 A 558.209 558.209 0 0 1 56.506 33.435 A 429.931 429.931 0 0 1 55.868 30.723 Q 54.968 26.843 54.419 24.097 A 139.886 139.886 0 0 1 54.055 26.035 Q 53.467 29.056 52.58 33.014 A 384.981 384.981 0 0 1 52.551 33.142 Q 51.343 38.525 50.061 43.799 Q 48.81 48.945 47.873 52.417 A 191.639 191.639 0 0 1 47.827 52.588 L 43.213 70.166 Z M 241.477 81.859 A 32.69 32.69 0 0 0 241.992 84.265 A 20.312 20.312 0 0 0 243.081 87.463 Q 243.831 89.157 244.847 90.436 A 10.718 10.718 0 0 0 245.984 91.663 Q 248.73 94.189 253.198 94.189 A 12.816 12.816 0 0 0 256.173 93.863 A 8.786 8.786 0 0 0 260.303 91.663 Q 262.939 89.136 264.148 84.265 A 36.256 36.256 0 0 0 264.884 80.298 Q 265.178 78.082 265.289 75.53 A 74.575 74.575 0 0 0 265.356 72.29 A 69.181 69.181 0 0 0 265.19 67.34 Q 265.023 65.012 264.687 63.01 A 32.16 32.16 0 0 0 264.148 60.425 A 19.811 19.811 0 0 0 263.144 57.429 Q 262.02 54.833 260.266 53.247 A 9.011 9.011 0 0 0 256.314 51.199 Q 254.93 50.856 253.3 50.832 A 16.778 16.778 0 0 0 253.052 50.83 A 12.198 12.198 0 0 0 249.123 51.428 Q 245.739 52.573 243.825 55.916 A 12.826 12.826 0 0 0 243.64 56.25 A 19.933 19.933 0 0 0 242.023 60.478 Q 240.926 64.568 240.772 70.352 A 72.755 72.755 0 0 0 240.747 72.29 Q 240.747 77.729 241.477 81.859 Z M 147.437 69.287 L 147.437 73.315 A 57.463 57.463 0 0 0 147.642 78.36 Q 148.085 83.365 149.481 86.544 A 13.547 13.547 0 0 0 150.037 87.671 A 8.68 8.68 0 0 0 156.045 92.027 A 14.959 14.959 0 0 0 159.302 92.358 A 7.867 7.867 0 0 0 165.666 89.31 A 12.514 12.514 0 0 0 167.065 87.158 A 19.646 19.646 0 0 0 168.607 83.027 Q 169.775 78.539 169.775 71.997 Q 169.775 62.036 167.139 57.019 Q 164.502 52.002 159.009 52.002 Q 155.299 52.002 152.813 53.613 A 8.659 8.659 0 0 0 152.49 53.833 A 9.128 9.128 0 0 0 150.038 56.507 Q 149.338 57.639 148.832 59.065 A 16.867 16.867 0 0 0 148.682 59.509 A 22.373 22.373 0 0 0 147.923 62.687 Q 147.437 65.579 147.437 69.287 Z M 690.234 62.183 L 714.844 62.183 A 17.496 17.496 0 0 0 714.238 57.864 A 15.163 15.163 0 0 0 713.379 55.518 Q 711.987 52.515 709.314 50.757 A 10.368 10.368 0 0 0 705.701 49.292 A 14.726 14.726 0 0 0 702.686 48.999 A 13.202 13.202 0 0 0 698.31 49.699 A 11.442 11.442 0 0 0 694.226 52.185 A 10.929 10.929 0 0 0 691.719 55.817 Q 691.028 57.385 690.634 59.335 A 25.413 25.413 0 0 0 690.234 62.183 Z"
          fill="#ffffff"
        />
        {/* Replace this path with your desired SVG path */}
      </g>
    </animated.svg>
    // </div>
  );
}