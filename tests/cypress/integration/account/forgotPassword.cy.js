import { forgotPasswordPage } from '../../support/page-objects/pages/account/forgotPasswordPage'
import { UserBuilder } from '../../support/builder/user.builder'
import { FeatureTag } from '../../support/enums/featureTag'
const { getErrorMessage } = require('../../support/helper')
const faker = require('faker')
const pageUri = 'password-forgotten'

describe([FeatureTag.FORGOTTEN_PASSWORD], 'Forgot password page tests', () => {
  beforeEach(() => {
    cy.viewportPreset('samsung-s10-plus')
    cy.visit(pageUri)
    cy.intercept('POST', '/api/account/password-forgotten').as('forgotPassword')
  })

  it('#482 Should display error message when email is empty', () => {
    cy.get(forgotPasswordPage.submitButtonId).click()
    getErrorMessage(forgotPasswordPage.emailErrorId)
    cy.url().should('contain', pageUri)
  })

  it('#483 Should display error message when email is invalid', () => {
    const data = {
      locale: Cypress.env('locale') == 'es' ? 'es' : 'pt',
      accountType: 'Personal'
    }
    const accountData = new UserBuilder(data)
      .setEmail(faker.random.word())
      .build()
    forgotPasswordPage.fillInForgotPasswordForm(accountData.email)
    getErrorMessage(forgotPasswordPage.emailErrorId)
    cy.url().should('contain', pageUri)
  })

  it('#484 request is passing when email is valid', () => {
    const data = {
      locale: Cypress.env('locale') == 'es' ? 'es' : 'pt',
      accountType: 'Personal'
    }
    const accountData = new UserBuilder(data).build()
    forgotPasswordPage.fillInForgotPasswordForm(accountData.email)
    cy.wait('@forgotPassword').its('response.statusCode').should('eql', 200)
    cy.get('h2').should('be.visible').and('include.text', accountData.email)
  })

  it('#485 User is redirected to login page when forgot password is canceled', () => {
    cy.get(forgotPasswordPage.cancelLinkId).click()
    cy.url().should('contain', 'login')
  })
})
