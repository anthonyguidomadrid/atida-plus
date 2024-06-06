import { defineConfig } from 'cypress'
import setupNodeEvents from 'tests/cypress/plugins'

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  env: {
    apiUrl: 'https://www.uat.atida.com/api/',
    environment: 'uat',
    glueApiUrl: 'https://glue-pt-spryker.uat.atida.com/',
    glueEsApiUrl: 'https://glue-es-spryker.uat.atida.com/',
    launchDarklyEnvironment: 'uat'
  },
  fixturesFolder: 'tests/cypress/fixtures',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'tests/cypress/support/reporter-config.json'
  },
  requestTimeout: 10000,
  retries: {
    runMode: 2,
    openMode: 0
  },
  screenshotsFolder: 'tests/cypress/screenshots',
  videosFolder: 'tests/cypress/videos',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents,
    baseUrl: 'https://www.uat.atida.com/',
    specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/index.js'
  }
})
