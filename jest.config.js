module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.svg$': '<rootDir>/transformSVG.config.js',
    '^.+\\.tsx?$': 'ts-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  transformIgnorePatterns: ['node_modules/(?!(@babel)/)'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '<rootDir>/src/**/*.(spec|test).(ts|js)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/components/*.vue',
    '<rootDir>/node_modules',
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],

};
