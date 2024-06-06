import { accountDetailsPage } from '../../support/page-objects/pages/account/accountDetailsPage'
import { DbHelper } from '../../support/db.helper'
import { FeatureTag } from '../../support/enums/featureTag'
import {
  Customer,
  CustomerData
} from '../../support/api/SprykerAPI/models/customer'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { customersEndpoints } from '../../support/api/SprykerAPI/endpoints/customer'
import { loginPage } from '../../support/page-objects/pages/account/loginPage'
const dbhelper = new DbHelper()
const { getErrorMessage } = require('../../support/helper')
const faker = require('faker')
let emailAddress
let password
describe(
  [FeatureTag.ACCOUNT_DETAILS],
  'Should not update personal details',
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
      cy.intercept('GET', '**/api/account/get-customer*', req => {
        delete req.headers['if-none-match']
      }).as('getCustomer')
      cy.visit('account/details/change-personal-details')
      cy.wait('@getCustomer')
      cy.get(accountDetailsPage.updateAccountFormPhoneId, {
        timeout: 3000
      }).should('be.visible')
    })

    after(() => {
      dbhelper.buildAndDeleteQueryByUser(emailAddress)
    })

    it('#752 with blank first name', () => {
      accountDetailsPage.clearUpdateAccountFormField(0)
      getErrorMessage(accountDetailsPage.updateFirstNameErrorId)
    })

    it('#753 with blank last name', () => {
      accountDetailsPage.clearUpdateAccountFormField(1)
      getErrorMessage(accountDetailsPage.updateLastNameErrorId)
    })

    it('#871 with too long first name', () => {
      cy.fillInTextField(
        accountDetailsPage.updateAccountFormFirstNameId,
        faker.random.alphaNumeric(101)
      )
      cy.get(accountDetailsPage.updateAccountFormId).submit()
      getErrorMessage(accountDetailsPage.updateFirstNameErrorId)
    })

    it('#872 with too long last name', () => {
      cy.fillInTextField(
        accountDetailsPage.updateAccountFormLastNameId,
        faker.random.alphaNumeric(101)
      )
      cy.get(accountDetailsPage.updateAccountFormId).submit()
      getErrorMessage(accountDetailsPage.updateLastNameErrorId)
    })
  }
)
