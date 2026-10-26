import React from "react";
import PortfolioMain from "../components/PortfolioMain";
import { personalInfo, socialLinks, skillsData, educationData } from "../data/portfolioData";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "../data/site";

// Structured data (schema.org) so search engines can show Naseeh as a person:
// name, job, location and social profiles, linked to this site.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: personalInfo.name,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: personalInfo.name,
      jobTitle: personalInfo.role,
      description: personalInfo.summary,
      url: SITE_URL,
      image: `${SITE_URL}${personalInfo.photo.src}`,
      address: { "@type": "PostalAddress", addressCountry: "AE" },
      nationality: { "@type": "Country", name: "India" },
      sameAs: socialLinks.map((link) => link.url),
      knowsAbout: skillsData.map((skill) => skill.name),
      alumniOf: educationData
        .filter((item) => item.typeBadge === "DEGREE")
        .map((item) => ({ "@type": "CollegeOrUniversity", name: item.institution })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so content can never close the script tag early
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioMain />
    </>
  );
}
