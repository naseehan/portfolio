import { SITE_URL } from "../data/site";

// Only the home page: /about, /skills, /projects, /experience and /contact render the
// same one-page portfolio and declare the home page as their canonical URL.
export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
