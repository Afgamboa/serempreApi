import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  bail: 1,
  transformIgnorePatterns: ["/node_modules/"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ['**/__test__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  testTimeout: 90000,
  collectCoverageFrom: [
    "src/**/*.{ts,jsx}",
    "src/**/*.{js,jsx}",
    "!**/node_modules/**",
  ],
  coverageProvider: "babel",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxConcurrency: 5,
};

export default config;
