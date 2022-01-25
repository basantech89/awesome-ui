module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // modulePathIgnorePatterns: [
  // 	"<rootDir>/website/.cache",
  // 	"<rootDir>/examples",
  // 	"<rootDir>/tooling/cra-template*",
  // ],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20
    }
  }
}
