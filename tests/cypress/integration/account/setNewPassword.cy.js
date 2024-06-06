import { setNewPasswordPage } from '../../support/page-objects/pages/account/setNewPasswordPage'
import { loginPage } from '../../support/page-objects/pages/account/loginPage'
import { DbHelper } from '../../support/db.helper'
import { FeatureTag } from '../../support/enums/featureTag'
import { forgottenPasswordEndpoints } from '../../support/api/SprykerAPI/endpoints/forgottenPassword'
import {
  Customer,
  CustomerData
} from '../../support/api/SprykerAPI/models/customer'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { customersEndpoints } from '../../support/api/SprykerAPI/endpoints/customer'
import { ForgottenPasswordData } from '../../support/api/SprykerAPI/models/forgottenPassword'
const dbhelper = new DbHelper()
const { getErrorMessage } = require('../../support/helper')
const pageUri = 'set-new-password'
let emailAddress
let password

describe([FeatureTag.RESET_PASSWORD], 'Tests for set new password', () => {
  let url, resetToken, resetDate

  beforeEach(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@atida.com`
    password = 'P@ssword1'
    const query = `SELECT restore_password_key, restore_password_date FROM  "public"."spy_customer" WHERE email = '${emailAddress}'`

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

    forgottenPasswordEndpoints
      .sendForgottenPasswordRequest(new ForgottenPasswordData(emailAddress))
      .then(response => {
        expect(response.status).to.eql(204)
      })

    cy.viewportPreset('samsung-s10-plus')
    dbhelper.setQueryExecution(query).then(data => {
      resetToken = data.rows[0].restore_password_key
      url = `${pageUri}/${resetToken}`
      resetDate = data.rows[0].restore_password_date
      cy.visit(url)
    })
  })

  afterEach(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it('#497 Should display error when inputs are empty', () => {
    cy.get(setNewPasswordPage.resetPasswordButtonId).click()
    getErrorMessage(setNewPasswordPage.errorPasswordMessageId)
    cy.url().should('contain', pageUri)
  })

  it([SuiteTag.SMOKE], '#499 #706 Should set successfully new password', () => {
    const password = 'Ger$3#ds'
    cy.checkElementTextIsNotEmpty(
      setNewPasswordPage.emailGreenDivId,
      emailAddress
    )
    cy.intercept('PATCH', '/api/account/set-new-password').as('setNewPassword')
    setNewPasswordPage.fillInSetNewPasswordForm(password)
    cy.wait('@setNewPassword').its('response.statusCode').should('eql', 200)
    cy.url().should('contain', 'login')
    cy.intercept('POST', '/api/account/login').as('login')
    cy.checkElementTextIsNotEmpty(loginPage.notificatonWrapperId)
    cy.fillInTextField(loginPage.passwordInputId, password)
    cy.get(loginPage.loginButtonId).click()
    cy.wait('@login').its('response.statusCode').should('eql', 200)
  })

  it('#500 Should display error when set new password link is opened for second time', () => {
    const password = 'dP%0dgf4'
    cy.intercept('PATCH', '/api/account/set-new-password').as('setNewPassword')
    setNewPasswordPage.fillInSetNewPasswordForm(password)
    cy.wait('@setNewPassword').its('response.statusCode').should('eql', 200)
    cy.visit(url)
    getErrorMessage(setNewPasswordPage.notificationId)
    cy.url().should('contain', 'password-forgotten')
  })

  it('#501 Should display error when set new password token is expired', () => {
    let d = new Date(resetDate)
    d.setDate(d.getDate() - 1)
    let oldDate = d.toISOString()
    const query = `UPDATE "public"."spy_customer" SET restore_password_date = '${oldDate}' WHERE email = '${emailAddress}'`
    dbhelper.setQueryExecution(query)
    cy.visit(url)
    getErrorMessage(setNewPasswordPage.notificationId)
    cy.url().should('contain', 'password-forgotten')
  })
})

describe(
  [FeatureTag.RESET_PASSWORD],
  'Test set new password page with invalid refresh token',
  () => {
    const url = `${pageUri}/test`

    beforeEach(() => {
      cy.viewportPreset('samsung-s10-plus')
      cy.visit(url)
    })

    it('#502 Should display error for invalid refresh token', () => {
      getErrorMessage(setNewPasswordPage.notificationId)
      cy.url().should('contain', 'password-forgotten')
    })

    it('#503 Click on the cancel link should redirect to login page', () => {
      cy.get(setNewPasswordPage.cancelLinkId).click()
      cy.url().should('contain', 'login')
    })
  }
)
