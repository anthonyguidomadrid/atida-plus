import { loginPage } from '../../support/page-objects/pages/account/loginPage'
import { updateAccountPasswordPage } from '../../support/page-objects/pages/account/updateAccountPasswordPage'
import { DbHelper } from '../../support/db.helper'
import { FeatureTag } from '../../support/enums/featureTag'
import { customersEndpoints } from '../../support/api/SprykerAPI/endpoints/customer'
import {
  Customer,
  CustomerData
} from '../../support/api/SprykerAPI/models/customer'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
const { getErrorMessage } = require('../../support/helper')
const dbhelper = new DbHelper()
const faker = require('faker')
const logger = require('pino')()
const pageUri = 'account/details/change-password'
let emailAddress
let password

describe(
  [FeatureTag.ACCOUNT_DETAILS],
  'Update password from my account section',
  () => {
    before(() => {
      const randomNumber = Date.now()
      emailAddress = `automation-${randomNumber}@atida.com`
      password = 'P@ssword1'
      let customerData = new CustomerData({
        data: new Customer({
          attributes: new Attributes({
            email: emailAddress,
            password: password,
            confirmPassword: password,
            addresses: new Addresses()
          })
        })
      })

      customersEndpoints.createCustomer(customerData).then(response => {
        expect(response.status).to.eql(201)
      })

      cy.visit('login')
      loginPage.loginUser(emailAddress, password)
    })

    beforeEach(() => {
      Cypress.Cookies.preserveOnce(
        'atida-plus-jwt',
        'atida-plus-refresh-token',
        'atida-plus-customer',
        'ajs_anonymous_id'
      )
      cy.viewportPreset('samsung-s10-plus')
      cy.visit(pageUri)
    })

    after(() => {
      dbhelper.buildAndDeleteQueryByUser(emailAddress)
    })

    it('#504 Should display an error when inputs are empty', () => {
      cy.get(updateAccountPasswordPage.updatePasswordButtonId).click()
      getErrorMessage([
        updateAccountPasswordPage.updatePasswordError,
        updateAccountPasswordPage.updateNewPasswordError
      ])
      cy.url().should('contain', pageUri)
    })

    it('#505 Should display an error when the old password is wrong', () => {
      const newPassword = 'cJ54&flk'
      const wrongOldPassword = 'test123!'
      const data = {
        password: wrongOldPassword,
        newPassword: newPassword
      }
      updateAccountPasswordPage.fillInUpdatePasswordForm(data)
      getErrorMessage(updateAccountPasswordPage.errorNotificationId)
      cy.url().should('contain', pageUri)
    })

    it('#507 Should display an error when password length is less than 8 chars', () => {
      const invalidPassword = faker.datatype.number(1, 6)
      const data = {
        password: password,
        newPassword: invalidPassword
      }
      updateAccountPasswordPage.fillInUpdatePasswordForm(data)
      getErrorMessage([updateAccountPasswordPage.updateNewPasswordError])
      cy.url().should('contain', pageUri)
    })

    it('#508 Should display an error when the password length is more than 72 chars', () => {
      const invalidPassword = faker.random.alphaNumeric(71) + 'E$'
      logger.info('Invalid password :' + invalidPassword)
      const data = {
        password: password,
        newPassword: invalidPassword
      }
      updateAccountPasswordPage.fillInUpdatePasswordForm(data)
      getErrorMessage([updateAccountPasswordPage.errorNotificationId])
      cy.url().should('contain', pageUri)
    })

    it('#509 Should successfully set a new password', () => {
      const newPassword = 'Test123!'
      const data = {
        password: password,
        newPassword: newPassword
      }
      updateAccountPasswordPage.fillInUpdatePasswordForm(data)
      cy.url().should('contain', '/account/details')
      cy.intercept('POST', '/api/account/logout').as('logout')
      cy.visit('logout')
      cy.wait('@logout').its('response.statusCode').should('eql', 204)
      cy.visit('login')
      cy.intercept('POST', '/api/account/login').as('login')
      loginPage.loginUser(emailAddress, newPassword)
      cy.wait('@login').its('response.statusCode').should('eql', 200)
    })
  }
)
