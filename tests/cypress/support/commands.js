// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands'

Cypress.Commands.add(
  'login',
  (emailInputId, passwordInputId, userEmail, userPassword) => {
    cy.fillInTextField(emailInputId, userEmail)
    cy.fillInTextField(passwordInputId, userPassword)
    cy.get('form').submit()
  }
)

Cypress.Commands.add('viewportPreset', (size = '') => {
  switch (size) {
    case 'samsung-s10-plus':
      cy.viewport(412, 869)
      break
    case 'iphone-se':
      cy.viewport(375, 667)
      break
    case 'ipad-pro':
      cy.viewport(1366, 1024)
      break
    case 'ms-surface':
      cy.viewport(1280, 720)
      break
    case 'full-hd':
      cy.viewport(1920, 1080)
      break
    case 'imac':
      cy.viewport(2560, 1440)
      break
    default:
      cy.viewport(Cypress.env('viewportWidth'), Cypress.env('viewportHeight'))
  }
})

Cypress.Commands.add('checkLinkText', (linkTexts, linkObjects) => {
  linkTexts.forEach((text, index) => {
    cy.wrap(linkObjects).eq(index).should('contain', text)
  })
})

Cypress.Commands.add(
  'checkElementTextIsNotEmpty',
  (selector, selectorText = '') => {
    cy.get(selector)
      .should('be.visible')
      .invoke('text')
      .then(text => {
        expect(text).not.be.empty
        if (selectorText !== '') {
          expect(text).to.be.equal(selectorText)
        }
      })
  }
)

Cypress.Commands.add('fillInTextField', (selector, text) => {
  cy.get(selector).should('be.visible').clear().type(text, { delay: 1 })
})

Cypress.Commands.add(
  'findListSelector',
  (index, parentSelector, childSelecor) => {
    cy.get(parentSelector).find(childSelecor).eq(index)
  }
)

Cypress.Commands.add('checkFlag', key => {
  const env = Cypress.env('launchDarklyEnvironment')
  const projKey = 'default'

  cy.fixture('auth').then(auth => {
    const accessToken = auth.launchDarklyAccessToken
    cy.request({
      method: 'GET',
      url: `https://app.launchdarkly.com/api/v2/flags/${projKey}/${key}`,
      headers: {
        Authorization: accessToken
      },
      qs: `env=${env}`
    }).its(`body.environments.${env}.on`)
  })
})
