/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const pg = require('pg')
const tagify = require('cypress-tags')
const logger = require('pino')()

module.exports = function (on, config) {
  const dbZedConfig =
    config.env.environment === 'uat'
      ? require('../config/uat.json')
      : require('../config/dev.json')
  const zedPool = new pg.Pool(dbZedConfig)

  on('file:preprocessor', tagify(config))

  on('task', {
    sprykerDB({ sql, value }) {
      try {
        return zedPool.query(sql, value)
      } catch (e) {
        logger.error(e)
      }
    }
  })

  if (process.env.CYPRESS_TEAM) {
    config.specPattern =
      'tests/cypress/integration/' +
      process.env.CYPRESS_TEAM +
      '/**/*.cy.{js,jsx,ts,tsx}'
  }

  if (!config.env.locale) {
    config.env.locale = 'pt'
  }

  config.baseUrl = `${config.baseUrl}${config.env.locale}-${config.env.locale}/`

  return config
}
