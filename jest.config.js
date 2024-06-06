module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
    '.cache',
    '.stories.[tj]s?(x)',
    'node_modules',
    'test-helpers.tsx',
    'src/generated',
    'src/pages',
    'tests/cypress',
    'selectors',
    'tools',
    'public'
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  reporters: ['default', ['jest-junit', { suiteName: 'jest tests' }]],
  testPathIgnorePatterns: [
    '.cache',
    '.next',
    'node_modules',
    'tests/cypress',
    '[^-\n]history',
    'tools',
    'public',
    'contentful-apps'
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { configFile: './.storybook/.babelrc.js' }
    ]
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.js'
  }
}
