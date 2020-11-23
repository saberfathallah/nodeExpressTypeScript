module.exports = {
  automock: false,
  testEnvironment: "node",
  rootDir: ".",
  preset: "ts-jest",
  // file extesion to test
  testMatch: [
    "**/__tests__/**/*.+(ts|js)",
    "**/__tests__/**/*.+(js|js)",
    "**/?(*.)+(spec|test).+(ts|js)",
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  // configurate typeScript javascript in file tests
  // module to import
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  moduleFileExtensions: ["js", "json", "ts", "node"],
  // don't test
  collectCoverageFrom: [],
  // ignore folder in count coverage
  coveragePathIgnorePatterns: [],
};
