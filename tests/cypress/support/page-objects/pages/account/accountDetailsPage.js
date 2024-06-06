import { header } from '../../components/header'
const { capitalizeFirstLetter } = require('../../../helper')

export class AccountDetailsPage {
  constructor() {
    this.personalDetailsSectionId = '[data-testid="personalDetails"]'
    this.personalDetailsEmailId =
      '[data-testid="personalDetailsEmail"] span:last-child'
    this.personalDetailsNameId = '[data-testid="personalDetailsName"] p'
    this.personalDetailsPhoneId = '[data-testid="personalDetailsPhone"]'
    this.personalDetailsPasswordId =
      '[data-testid="personalDetailsPassword"] input'
    this.preferencePanelPersonalDetailsSectionId =
      '[data-testid="preferencePanelPersonalDetails"]'
    this.updateAccountFormFirstNameId =
      '[data-testid="UpdateAccountDetailsFormFirstNameField"]'
    this.updateAccountFormLastNameId =
      '[data-testid="UpdateAccountDetailsFormLastNameField"]'
    this.updateAccountFormPhoneId =
      '[data-testid="UpdateAccountDetailsFormPhoneNumberField"]'
    this.cancelUpdateAccountFormButtonId =
      '[data-testid="cancelUpdateAccountFormButton"]'
    this.updateAccountButtonId =
      '[data-testid="UpdateAccountDetailsFormButton"]'
    this.updateAccountFormId = '[data-testid="UpdateAccountDetailsForm"] form'
    this.updateFirstNameErrorId = '#first-name_error'
    this.updateLastNameErrorId = '#last-name_error'
    this.updatePhoneErrorId = '#phone-number_error'
    this.errorWrapperId = '[data-testid="notification"]'
    this.orderStatusUpdatedCheckboxId =
      '[data-testid="orderStatusUpdated"] input'
    this.personalRecommendationsCheckboxId =
      '[data-testid="personalRecommendations"] input[type="checkbox"]'
    this.pinnedProductsNotificationsCheckboxId =
      '[data-testid="pinnedProductsNotifications"] input[type="checkbox"]'
    this.updateAccountFormCountryId =
      '[data-testid="UpdateAccountDetailsFormCountry"] input'
    this.businessDetailsSectionId = '[data-testid="businessDetails"]'
    this.businessDetailsCompanyNameId =
      '[data-testid="businessDetailsCompanyName"] p'
    this.businessDetailsTaxReferenceId =
      '[data-testid="businessDetailsTaxReference"] span:last-child'
    this.goToCheckoutButton =
      '[data-testid="notification"] [data-testid="navigationItemLink"]'
    this.successMessage = '[data-testid="notificationTitle"]'
  }

  getPersonalDetailsBlock(data) {
    cy.get(this.personalDetailsSectionId).should('be.visible')
    for (const [key, value] of Object.entries(data)) {
      cy.checkElementTextIsNotEmpty(
        this[`personalDetails${capitalizeFirstLetter(key)}Id`],
        value
      )
    }
    cy.get(this.personalDetailsPasswordId).should('be.visible')
  }

  getBusinessDetailsBlock(data) {
    cy.get(this.businessDetailsSectionId).should('be.visible')
    for (const [key, value] of Object.entries(data)) {
      cy.checkElementTextIsNotEmpty(
        this[`businessDetails${capitalizeFirstLetter(key)}Id`],
        value
      )
    }
    cy.get(this.personalDetailsPasswordId).should('be.visible')
  }

  getUpdateAccountFormData(data) {
    cy.get('h1').should('be.visible')
    for (const [key, value] of Object.entries(data)) {
      cy.get(this[`updateAccountForm${capitalizeFirstLetter(key)}Id`]).should(
        'have.value',
        value
      )
    }
  }

  fillInUpdateAccountForm(data) {
    for (const [key, value] of Object.entries(data)) {
      cy.fillInTextField(
        this[`updateAccountForm${capitalizeFirstLetter(key)}Id`],
        value
      )
    }
    cy.get(this.updateAccountFormId).submit()
  }

  clearUpdateAccountFormField(index) {
    cy.get(this.updateAccountFormId).find('input').eq(index).clear()
    cy.get(this.updateAccountFormId).submit()
  }

  visitPersonalDetailsPage() {
    header.openAccountDetails()
    // eslint-disable-next-line cypress/no-force
    cy.get(this.preferencePanelPersonalDetailsSectionId)
      .find('a')
      .click({ force: true })
    cy.intercept('GET', '*/account/get-customer*', req => {
      delete req.headers['if-none-match']
    }).as('getCustomer')
  }
  confirmPersonalDetails() {
    cy.get(accountDetailsPage.updateAccountButtonId).should('be.visible')
    cy.get(this.updateAccountFormPhoneId).should('not.have.value', undefined)
    cy.get(accountDetailsPage.updateAccountButtonId).click()
  }
  clickGoTocheckoutButton() {
    cy.get(accountDetailsPage.successMessage).should('be.visible')
    cy.get(accountDetailsPage.goToCheckoutButton).click()
  }
  verifyGoTocheckoutButton() {
    cy.url().should('contain', 'checkout')
  }
}

export const accountDetailsPage = new AccountDetailsPage()
