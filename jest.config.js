export default {
    testEnvironment: 'jsdom', // Allows DOM testing for React components
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transforms JavaScript/JSX files
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'], // Adds extra matchers for Jest
  };
  