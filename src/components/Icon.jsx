import React from "react";
import {
  faArrowRight,
  faBars,
  faBolt,
  faCloudArrowUp,
  faCode,
  faCubes,
  faDatabase,
  faGaugeHigh,
  faLayerGroup,
  faMobile,
  faMobileScreenButton,
  faMoon,
  faNetworkWired,
  faPaperPlane,
  faServer,
  faShieldHalved,
  faSun,
  faWind,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGitAlt,
  faGithub,
  faHtml5,
  faInstagram,
  faJs,
  faLinkedinIn,
  faNodeJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";

// Font Awesome class names (as used in portfolioData.js) mapped to their SVG definitions.
// Rendering them inline replaces the Font Awesome CDN stylesheet and webfonts, which
// blocked the first paint on mobile.
const ICONS = {
  "fa-solid fa-arrow-right": faArrowRight,
  "fa-solid fa-bars": faBars,
  "fa-solid fa-bolt": faBolt,
  "fa-solid fa-cloud-arrow-up": faCloudArrowUp,
  "fa-solid fa-code": faCode,
  "fa-solid fa-cubes": faCubes,
  "fa-solid fa-database": faDatabase,
  "fa-solid fa-gauge-high": faGaugeHigh,
  "fa-solid fa-layer-group": faLayerGroup,
  "fa-solid fa-mobile": faMobile,
  "fa-solid fa-mobile-screen-button": faMobileScreenButton,
  "fa-solid fa-moon": faMoon,
  "fa-solid fa-network-wired": faNetworkWired,
  "fa-solid fa-paper-plane": faPaperPlane,
  "fa-solid fa-server": faServer,
  "fa-solid fa-shield-halved": faShieldHalved,
  "fa-solid fa-sun": faSun,
  "fa-solid fa-wind": faWind,
  "fa-solid fa-xmark": faXmark,
  "fa-brands fa-facebook-f": faFacebookF,
  "fa-brands fa-git-alt": faGitAlt,
  "fa-brands fa-github": faGithub,
  "fa-brands fa-html5": faHtml5,
  "fa-brands fa-instagram": faInstagram,
  "fa-brands fa-js": faJs,
  "fa-brands fa-linkedin-in": faLinkedinIn,
  "fa-brands fa-node-js": faNodeJs,
  "fa-brands fa-react": faReact,
};

/**
 * Icon — inline SVG version of a Font Awesome icon.
 * Sized like the icon font it replaces: 1em tall, so `font-size` on it or its parent
 * controls the size, and `currentColor` so `color` sets the fill.
 */
const Icon = ({ name, className = "", ...props }) => {
  const definition = ICONS[name];
  if (!definition) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Icon: no SVG registered for "${name}"`);
    }
    return null;
  }

  const [width, height, , , path] = definition.icon;
  const paths = Array.isArray(path) ? path : [path];

  return (
    <svg
      className={`icon-svg ${className}`.trim()}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
};

export default Icon;
