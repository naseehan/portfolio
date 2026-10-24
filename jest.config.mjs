import nextJest from "next/jest.js";

// next/jest compiles JSX with SWC and stubs image imports (.webp etc.)
const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig({
  testEnvironment: "node",
});
