export class GuestCheckoutPage {
  constructor() {
    this.firstNameFieldId = '[data-testid="guestCheckoutFormFirstNameField"]'
    this.lastNameFieldId = '[data-testid="guestCheckoutFormLastNameField"]'
    this.emailFieldId = '[data-testid="guestCheckoutFormEmailField"]'
    this.streetFieldId = '[data-testid="ShippingAddressFormAddress1Field"]'
    this.houseNumberFiledId =
      '[data-testid="ShippingAddressFormHouseNumberField"]'
    this.addressFormAdditionField =
      '[data-testid="ShippingAddressFormAdditionField"]'
    this.zipCodeId = '[data-testid="ShippingAddressFormZipCodeField"]'
    this.cityId = '[data-testid="ShippingAddressFormCityField"]'
    this.subdivisionSelectorId =
      '[data-testid="ShippingAddressFormSubdivisionSelector"]'
    this.phoneFieldId = '[data-testid="guestCheckoutFormPhoneNumberField"]'
    this.guestCheckoutButtonId = '[data-testid="guestCheckoutFormButton"]'
    this.toPaymentButtonId = '[data-testid="toPaymentButton"]'
    this.firstName_error = '[id="firstName_error"]'
    this.lastName_error = '[id="lastName_error"]'
    this.email_error = '[id="email_error"]'
    this.shippingaddress1_error = '[id="shipping.address1_error"]'
    this.houseNumber_error = '[id="shipping.houseNumber_error"]'
    this.zipCode_error = '[id="shipping.zipCode_error"]'
    this.city_error = '[id="shipping.city_error"]'
    this.subdivision_error = '[id="shipping.subdivision_error"]'
    this.phoneNumber_error = '[id="phoneNumber_error"]'
  }

  fillGuestCheckoutForm(customerData, addressData, country) {
    cy.url().should('contain', 'checkout')
    cy.get(this.firstNameFieldId).should('be.visible')
    this.enterFirstName(addressData.firstName)
    this.enterLastName(addressData.lastName)

    this.enterEmailAddress(customerData.data.attributes.email)
    this.enterPhoneNumber(addressData.phone)
    this.enterAddressStreet(addressData.address1)
    this.enterAddressAdditionalAddress(addressData.address2)
    this.enterAddressHouseNumber(addressData.houseNumber)
    this.enterAddressZipCode(addressData.zipCode)
    this.enterAddressCity(addressData.city)
    if (country == 'España') {
      this.selectAddressSubdivision(addressData.province)
    } else {
      this.selectAddressSubdivision(addressData.district)
    }
  }

  enterFirstName(firstName) {
    cy.fillInTextField(this.firstNameFieldId, firstName)
  }

  enterLastName(lastName) {
    cy.fillInTextField(this.lastNameFieldId, lastName)
  }

  enterEmailAddress(emailAddress) {
    cy.fillInTextField(this.emailFieldId, emailAddress)
  }

  enterPhoneNumber(phoneNumber) {
    cy.fillInTextField(this.phoneFieldId, phoneNumber)
  }

  enterAddressStreet(street) {
    cy.fillInTextField(this.streetFieldId, street)
  }

  enterAddressHouseNumber(houseNumber) {
    cy.fillInTextField(this.houseNumberFiledId, houseNumber)
  }

  enterAddressAdditionalAddress(additionlAddress) {
    cy.fillInTextField(this.addressFormAdditionField, additionlAddress)
  }

  enterAddressZipCode(zipCode) {
    cy.fillInTextField(this.zipCodeId, zipCode)
  }

  enterAddressCity(city) {
    cy.fillInTextField(this.cityId, city)
  }

  selectAddressSubdivision(subdivision) {
    cy.get(this.subdivisionSelectorId).select(subdivision)
  }

  goToGuestCheckout() {
    cy.get(this.guestCheckoutButtonId).click()
    cy.get(this.toPaymentButtonId).should('be.visible')
  }
}

export const guestCheckoutPage = new GuestCheckoutPage()
