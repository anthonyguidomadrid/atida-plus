import { loginPage } from '../../support/page-objects/pages/account/loginPage'
import { DbHelper } from '../../support/db.helper'
import { FeatureTag } from '../../support/enums/featureTag'
import {
  Customer,
  CustomerData
} from '../../support/api/SprykerAPI/models/customer'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { customersEndpoints } from '../../support/api/SprykerAPI/endpoints/customer'
const dbhelper = new DbHelper()
const { getErrorMessage } = require('../../support/helper')
const faker = require('faker')
const resolutions = ['samsung-s10-plus', 'iphone-se', 'ipad-pro', 'full-hd']
const pageUri = 'login'
let emailAddress
let password

describe([FeatureTag.LOGIN], 'Login tests', () => {
  describe('Responsive login tests with invalid data', () => {
    beforeEach(() => {
      cy.visit(pageUri)
    })

    it('#461 Should display error message when the email is not valid', () => {
      const email = faker.random.word()
      const password = 'H6q!QEzh'
      cy.login(
        loginPage.emailInputId,
        loginPage.passwordInputId,
        email,
        password
      )

      resolutions.forEach(resolution => {
        cy.viewportPreset(resolution)
        getErrorMessage(loginPage.errorEmailMessageId)
      })
    })

    it('#462 Email address and passwords are required', () => {
      cy.get(loginPage.loginButtonId).click()
      resolutions.forEach(resolution => {
        cy.viewportPreset(resolution)
        getErrorMessage(loginPage.errorEmailMessageId)
        getErrorMessage(loginPage.errorPasswordMessageId)
      })
    })

    it.skip('#462 Should displays error when login details are incorrect', () => {
      const email = faker.internet.email()
      const password = 'H6q!QEzh'
      cy.login(
        loginPage.emailInputId,
        loginPage.passwordInputId,
        email,
        password
      )
      resolutions.forEach(resolution => {
        cy.viewportPreset(resolution)
        getErrorMessage(loginPage.notificatonWrapperId)
      })
    })

    it.skip(
      [SuiteTag.SMOKE],
      '#1146 Account should be locked after 8 attempts',
      () => {
        cy.checkFlag('account.lockout').then(accountLockout => {
          cy.onlyOn(accountLockout === true)
        })
        const email = faker.internet.email()
        const password = 'H6q!QEzh'
        let attempts = 9

        loginPage.loginMultipleTimes(email, password, attempts)
        resolutions.forEach(resolution => {
          cy.viewportPreset(resolution)
          getErrorMessage(loginPage.notificatonWrapperId)
        })
      }
    )
  })

  describe('Login with valid credentials', () => {
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
    })

    after(() => {
      dbhelper.buildAndDeleteQueryByUser(emailAddress)
    })

    it([SuiteTag.SMOKE], '#460 Should login with valid credentials', () => {
      cy.viewportPreset('samsung-s10-plus')
      cy.visit(pageUri)
      cy.intercept('POST', '/api/account/login').as('login')
      cy.login(
        loginPage.emailInputId,
        loginPage.passwordInputId,
        emailAddress,
        password
      )
      cy.wait('@login').its('response.statusCode').should('eql', 200)
    })
  })
})
