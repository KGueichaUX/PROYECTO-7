module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  moduleFileExtensions: ['js', 'mjs', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.m?js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vuetify/components$': '<rootDir>/node_modules/vuetify/lib/components/index.js',
    '^vuetify/directives$': '<rootDir>/node_modules/vuetify/lib/directives/index.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/styleMock.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!(vuetify)/)'],
};
