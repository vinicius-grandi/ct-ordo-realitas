// jest.config.js
const path = require('path');

function makeModuleNameMapper(srcPath, tsconfigPath) {
  // Get paths from tsconfig
  const { paths } = require(path.resolve(__dirname, tsconfigPath)).compilerOptions;

  const aliases = {};

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach((item) => {
      const key = item.replace('/*', '/(.*)');
      const path = paths[item][0].replace('/*', '/$1');
      aliases[key] = srcPath + '/' + path;
  });
  aliases['^uuid$'] = require.resolve('uuid');
  return aliases;
}

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  roots: [
    '<rootDir>'
  ],
  transform: {
      '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: makeModuleNameMapper('<rootDir>', 'tsconfig.json'),
  // modulePaths: ["<rootDir>"],
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
