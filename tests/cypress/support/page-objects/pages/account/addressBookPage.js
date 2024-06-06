export class AddressBookPage {
  constructor() {
    this.addressSummaryTileId = '[data-testid="AddressSummaryTile"]'
    this.deleteAddressButtonId = '[data-testid="deleteAddressButton"]'
    this.editAddressButtonId = '[data-testid="editAddressButton"]'
    this.addAddressButton = 'button.button--add-address'
    this.setAsDefaultDeliveryAddressId =
      '[data-testid="defaultShippingAddressButton"]'
    this.setAsDefaultBillignAddressId =
      '[data-testid="defaultBillingAddressButton"]'
    this.addressSection = 'section.mb-2.flex-col'
    this.defaultDeliveryAddressLabelId =
      '[data-testid="defaultShippingAddressLabel"]'
    this.defaultBillingAddressLabelId =
      '[data-testid="defaultBillingAddressLabel"]'
    this.addEditAddressModalTitle = 'h1.mb-3'
    this.addressFormModalLoyoutId = '[data-testid="AddressFormModalLayout"]'
    this.addressFormFirstNameFieldId = '[data-testid="AddressFormFirstName"]'
    this.addressFormLastNameFieldId = '[data-testid="AddressFormLastName"]'
    this.addressFormAddress1FieldId = '[data-testid="AddressFormAddress1Field"]'
    this.addressFormHouseNumberFieldId =
      '[data-testid="AddressFormHouseNumberField"]'
    this.addressFormAdditionFieldId = '[data-testid="AddressFormAdditionField"]'
    this.addressFormZipCodeFieldId = '[data-testid="AddressFormZipCodeField"]'
    this.addressFormCityFieldId = '[data-testid="AddressFormCityField"]'
    this.addressFormProvincePickerId = '[data-testid="AddressFormSubdivision"]'
    this.addressFormDefautlShippingCheckboxId =
      '[data-testid="isDefaultShippingCheckbox"] input'
    this.addressFormDefautlBillingCheckboxId =
      '[data-testid="isDefaultBillingCheckbox"] input'
    this.addressFormCancelButtonId = '[data-testid="AddressFormCancelButton"]'
    this.addressFormSubmitButtonId = '[data-testid="AddressFormSubmitButton"]'
    this.closeAddressFormModalId = '[data-testid="closeAddressFormModalLayout"]'
    this.addressFormProvinceSelectorId =
      '[data-testid="AddressFormSubdivision"]'
    this.notificationModalLayoutId = '[data-testid="notificationModalLayout"]'
    this.notificationModalCloseButtonId =
      '[data-testid="notificationModalLayoutCloseButton"]'
    this.notificationModalConfirmationButtonId =
      '[data-testid="notificationModalLayoutConfirmButton"]'
    this.zipCodeError = '#zipCode_error'
    this.firstNameError = '#firstName_error'
    this.lastNameError = '#lastName_error'
    this.address1Error = '#address1_error'
    this.houseNumberError = '#houseNumber_error'
    this.cityError = '#city_error'
    this.subdivisionError = '#subdivision_error'
    this.notificationId = '[data-testid="notification"]'
  }

  verifyNoAddressForTheLocaleNotificationIsDisplayed() {
    cy.get(this.notificationId).should('be.visible')
  }

  clickNotificationAddAddressButton() {
    cy.get(this.notificationId).find('button').click()
  }

  clickNotificationModalCloseButton() {
    cy.get(this.notificationModalCloseButtonId).click()
  }

  clickNotificationModalConfirmationButton() {
    cy.get(this.notificationModalConfirmationButtonId).click()
  }

  enterFirstName(firstName) {
    cy.fillInTextField(this.addressFormFirstNameFieldId, firstName)
  }

  enterLastName(lastName) {
    cy.fillInTextField(this.addressFormLastNameFieldId, lastName)
  }

  enterAddress(address) {
    // eslint-disable-next-line cypress/no-force
    cy.get(this.addressFormAddress1FieldId)
      .should('be.visible')
      .clear()
      .type(address, { force: true })
  }

  enterHouseNumber(houseNumber) {
    // eslint-disable-next-line cypress/no-force
    cy.get(this.addressFormHouseNumberFieldId)
      .should('be.visible')
      .clear()
      .type(houseNumber, { force: true })
  }

  enterAddition(addition) {
    cy.fillInTextField(this.addressFormAdditionFieldId, addition)
  }

  enterZipCode(zipCode) {
    cy.get(this.addressFormZipCodeFieldId).scrollIntoView()
    cy.fillInTextField(this.addressFormZipCodeFieldId, zipCode)
  }

  enterCity(city) {
    cy.fillInTextField(this.addressFormCityFieldId, city)
  }

  selectDistrict(district) {
    cy.get(this.addressFormProvincePickerId).find('#subdivision').click()
    cy.get(this.addressFormProvincePickerId).contains(district).click()
  }

  setAsDefaultDeliveryAddress() {
    // eslint-disable-next-line cypress/no-force
    cy.get(this.addressFormDefautlShippingCheckboxId).click({ force: true })
  }

  setAsDefaultBillignAddress() {
    // eslint-disable-next-line cypress/no-force
    cy.get(this.addressFormDefautlBillingCheckboxId).click({ force: true })
  }

  closeModal() {
    cy.get(this.addressFormCancelButtonId).click()
  }

  submitModal(submittedSuccessfully) {
    cy.intercept('GET', '/api/account/get-customer*', req => {
      delete req.headers['if-none-match']
    }).as('accountGetCustomer')
    cy.get(this.addressFormSubmitButtonId).click()
    if (submittedSuccessfully) {
      cy.wait('@accountGetCustomer')
        .its('response.statusCode')
        .should('eql', 200)
    }
  }

  fillAndSubmitAddressModal(
    addressData,
    defaultBillingAddress = false,
    defaultDeliveryAddress = false,
    submittedSuccessfully = true
  ) {
    this.enterFirstName(addressData.firstName)
    this.enterLastName(addressData.lastName)
    this.enterAddress(addressData.address1)
    this.enterHouseNumber(addressData.houseNumber)
    this.enterAddition(addressData.addition)
    this.enterZipCode(addressData.zipCode)
    this.enterCity(addressData.city)
    this.selectDistrict(
      Cypress.env('locale') == 'es'
        ? addressData.province
        : addressData.district
    )
    if (defaultBillingAddress) {
      this.setAsDefaultBillignAddress()
    }
    if (defaultDeliveryAddress) {
      this.setAsDefaultDeliveryAddress()
    }
    this.submitModal(submittedSuccessfully)
  }

  clickButtonByTileId(tileId, button) {
    cy.get(this.addressSummaryTileId).eq(tileId).find(button).click()
  }

  assertAddressRow(row, expectedText, tileId = 0) {
    cy.get(this.addressSummaryTileId)
      .eq(tileId)
      .find(this.addressSection)
      .children()
      .eq(row)
      .should('have.text', expectedText)
  }

  verifyButtonIsDisabled(tileId = 0, button) {
    cy.get(this.addressSummaryTileId)
      .eq(tileId)
      .find(button)
      .should('have.class', 'text-ui-grey')
  }

  verifyButtonIsEnabled(tileId = 0, button) {
    cy.get(this.addressSummaryTileId)
      .eq(tileId)
      .find(button)
      .should('not.have.class', 'text-ui-grey')
  }

  verifyDeleteButtonIsDisabled(tileId = 0) {
    this.verifyButtonIsDisabled(tileId, this.deleteAddressButtonId)
  }

  verifyEditButtonIsDisabled(tileId = 0) {
    this.verifyButtonIsDisabled(tileId, this.editAddressButtonId)
  }

  verifyDeleteButtonIsEnabled(tileId = 0) {
    this.verifyButtonIsEnabled(tileId, this.deleteAddressButtonId)
  }

  verifyEditButtonIsEnabled(tileId = 0) {
    this.verifyButtonIsEnabled(tileId, this.editAddressButtonId)
  }

  verifySetAsDefaultDeliveryAddressButtonIsDisabled(tileId = 0) {
    this.verifyButtonIsDisabled(tileId, this.setAsDefaultDeliveryAddressId)
  }

  verifySetAsDefaultBillingAddressButtonIsDisabled(tileId = 0) {
    this.verifyButtonIsDisabled(tileId, this.setAsDefaultBillignAddressId)
  }

  verifySetAsDefaultDeliveryAddressButtonIsEnabled(tileId = 0) {
    this.verifyButtonIsEnabled(tileId, this.setAsDefaultDeliveryAddressId)
  }

  verifySetAsDefaultBillingAddressButtonIsEnabled(tileId = 0) {
    this.verifyButtonIsEnabled(tileId, this.setAsDefaultBillignAddressId)
  }

  verifyDefaultBillingAddressLabelIsDisplayed(tileId = 0) {
    cy.get(this.addressSummaryTileId)
      .eq(tileId)
      .find(this.defaultBillingAddressLabelId)
      .should('be.visible')
  }

  verifyDefaultDeliveryAddressLabelIsDisplayed(tileId = 0) {
    cy.get(this.addressSummaryTileId)
      .eq(tileId)
      .find(this.defaultDeliveryAddressLabelId)
      .should('be.visible')
  }

  clickAddAddressButton() {
    cy.get(this.addAddressButton).click()
  }

  clickEditAddressButton(tileId = 0) {
    this.clickButtonByTileId(tileId, this.editAddressButtonId)
  }

  clickDeleteAddressButton(tileId = 0) {
    this.clickButtonByTileId(tileId, this.deleteAddressButtonId)
  }

  isNumberOfAddressesCorrect(expectedNumber) {
    cy.get(this.addressSummaryTileId).should('have.length', expectedNumber)
  }

  setAddressAsDefaultDeliveryAddress(tileId = 0) {
    this.clickButtonByTileId(tileId, this.setAsDefaultDeliveryAddressId)
  }

  setAddressAsDefaultBillingAddress(tileId = 0) {
    this.clickButtonByTileId(tileId, this.setAsDefaultBillignAddressId)
    this.verifyDefaultBillingAddressLabelIsDisplayed(tileId)
  }
}

export const addressBookPage = new AddressBookPage()
