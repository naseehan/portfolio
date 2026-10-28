"use client";

import React from "react";
import { socialLinks } from "../data/portfolioData";
import Icon from "./Icon";

const Socials = () => (
  <div className="hero-socials" aria-label="Social profiles">
    {socialLinks.map((item) => (
      <a
        key={item.name}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-social-link"
        title={item.name}
        aria-label={item.name}
      >
        <Icon name={item.icon} />
      </a>
    ))}
  </div>
);

export default Socials;
