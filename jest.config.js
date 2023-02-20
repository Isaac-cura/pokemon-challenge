module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons|axios)'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,vue}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],  
  coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
}
