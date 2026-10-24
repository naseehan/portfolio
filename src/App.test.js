import { projectsData, personalInfo, skillsData, experienceData } from "./data/portfolioData";

describe("Portfolio Data and Integrity", () => {
  test("preserves Naseeh's personal information", () => {
    expect(personalInfo.name).toBe("Naseeh AN");
    expect(personalInfo.role).toBe("Full-Stack Developer");
    expect(personalInfo.email).toBe("naseehan700@gmail.com");
    expect(personalInfo.phoneUAE).toBe("+971 525313774");
    expect(personalInfo.phoneIndia).toBe("+91 7034528129");
    const interestStat = personalInfo.stats.find((s) => s.label === "Interests");
    expect(interestStat.value).toBe("Football, Video Games");
  });

  test("contains all 10 real projects with working URLs and media", () => {
    expect(projectsData).toHaveLength(10);
    projectsData.forEach((project) => {
      expect(project.name).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.link).toMatch(/^https?:\/\//);
      expect(project.img).toBeTruthy();
      expect(project.tags.length).toBeGreaterThan(0);
    });
  });

  test("contains skills with valid categories and no arbitrary percentages", () => {
    expect(skillsData.length).toBeGreaterThan(10);
    skillsData.forEach((skill) => {
      expect(skill.name).toBeTruthy();
      expect(skill.category).toBeTruthy();
      expect(skill.icon).toBeTruthy();
      // Ensure no arbitrary percentage property exists
      expect(skill.percentage).toBeUndefined();
    });
  });

  test("contains valid work experience and education checkpoints", () => {
    expect(experienceData.length).toBeGreaterThanOrEqual(2);
    expect(experienceData[0].role).toBeTruthy();
  });
});
