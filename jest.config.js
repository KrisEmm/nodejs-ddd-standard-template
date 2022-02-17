module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  moduleNameMapper: {
    '^krisemm/app/(.*)$': '<rootDir>src/app/$1',
    '^krisemm/context/(.*)$': '<rootDir>src/context/$1',
    '^krisemm/tests/(.*)$': '<rootDir>tests/$1'
  }
};
