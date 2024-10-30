const { defineConfig } = require('cypress');

import constants from './constants'
const { APP } = constants

module.exports = defineConfig({
  env: {
    coverage: false,
  },
  retries: {
    openMode: 0,
    runMode: 1,
  },
  videoUploadOnPasses: false,
  viewportHeight: 768,
  viewportWidth: 1024,
  watchForFileChanges: false,
  experimentalStudio: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: `http://localhost:${APP}`,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});

