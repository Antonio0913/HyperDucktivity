// jest.config.cjs
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/?(*.)+(test).js?(x)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "\\.(css|less|scss|sass)$": "jest-transform-stub",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub"
  },
  setupFilesAfterEnv: ["./jest.setup.js"]
};
