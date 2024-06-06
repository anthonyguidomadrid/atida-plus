import { AccountType } from '../../../enums/accountType'

export class RegistrationPage {
  constructor() {
    this.createAccountFormEmailId =
      '[data-testid="createAccountFormEmail"] input'
    this.createAccountFormFirstNameId =
      '[data-testid="createAccountFormFirstName"] input'
    this.createAccountFormLastNameId =
      '[data-testid="createAccountFormLastName"] input'
    this.createAccountFormAddressId =
      '[data-testid="ShippingAddressFormAddress1Field"]'
    this.createAccountFormZipCodeId =
      '[data-testid="ShippingAddressFormZipCodeField"]'
    this.createAccountFormCityId =
      '[data-testid="ShippingAddressFormCityField"]'
    this.createAccountFormPhoneId =
      '[data-testid="createAccountFormPhoneNumber"] input'
    this.createAccountFormPasswordId =
      '[data-testid="createAccountFormPassword"] input'
    this.createAccountCountryId =
      '[data-testid="UpdateAccountDetailsFormCountry"] input'
    this.createAccountFormTermsCheckboxId = '#notificationsCheckbox'
    this.createAccountFormButtonId = '[data-testid="createAccountFormButton"]'
    this.emailErrorId = '#email_error'
    this.salutationErrorId = '#salutation_error'
    this.firstNameErrorId = '#firstName_error'
    this.lastNameErrorId = '#lastName_error'
    this.addressErrorId = '#address_error'
    this.zipCodeErrorId = '#zip-code_error'
    this.cityErrorId = '#city_error'
    this.phoneErrorId = '#phone-number_error'
    this.passwordErrorId = '#password_error'
    this.errorWrapperId = '[data-testid="notification"]'
    this.zipCodeError = '#zip-code_error'
    this.notificationId = '[data-testid="emailWarningNotification"]'
    this.continueButtonId = '[data-testid="createAccountFormContinueButton"]'
    this.createBusinessAccountButton = 'button.underline'
    this.personalDetailsSummaryId = '[data-testid="personalDetailsSummary"]'
    this.persinalDetailsSummaryHeaderId =
      '[data-testid="personalDetailsSummaryHeader"]'
    this.billingSameAsDeliveryCheckboxId =
      '[data-testid="BillingSameAsDeliveryCheckbox"]'
    this.addressFormCompanyFieldId = '[data-testid="AddressFormCompanyField"]'
    this.addressFormTaxReferenceBusinessFieldId =
      '[data-testid="AddressFormTaxReferenceBusinessField"]'
    this.equivalenceSurchargeCheckboxId =
      '[data-testid="equivalenceSurchargeCheckbox"]'
    this.addressShippingAddressFormHouseNumberFieldId =
      '[data-testid="ShippingAddressFormHouseNumberField"]'
    this.addressShippingAddressFormAdditionField =
      '[data-testid="ShippingAddressFormAdditionField"]'
    this.addressShippingAddressFormSubdivisionSelectorId =
      '[data-testid="ShippingAddressFormSubdivisionSelector"]'
    this.addressBillingAddressFormAddress1FieldId =
      '[data-testid="BillingAddressFormAddress1Field"]'
    this.addressBillingAddressFormHouseNumberFieldId =
      '[data-testid="BillingAddressFormHouseNumberField"]'
    this.addressBillingAddressFormAdditionField =
      '[data-testid="BillingAddressFormAdditionField"]'
    this.addressBillingAddressFormZipCodeFieldId =
      '[data-testid="BillingAddressFormZipCodeField"]'
    this.addressBillingAddressFormCityFieldId =
      '[data-testid="BillingAddressFormCityField"]'
    this.addressBillingAddressFormSubdivisionSelectorId =
      '[data-testid="BillingAddressFormSubdivisionSelector"]'
    this.companyFieldErrorId = '#company_error'
    this.createAccountFormChangeAccountTypeButtonId =
      '[data-testid="createAccountFormChangeAccountTypeButton"]'
  }

  enterFirstName(firstName) {
    cy.fillInTextField(this.createAccountFormFirstNameId, firstName)
  }

  enterLastName(lastName) {
    cy.fillInTextField(this.createAccountFormLastNameId, lastName)
  }

  enterPhoneNumber(phoneNumber) {
    cy.fillInTextField(this.createAccountFormPhoneId, phoneNumber)
  }

  enterEmailAddress(emailAddress) {
    cy.fillInTextField(this.createAccountFormEmailId, emailAddress)
  }

  enterPassword(password) {
    cy.fillInTextField(this.createAccountFormPasswordId, password)
  }

  enterBusinessName(businessName) {
    cy.fillInTextField(this.addressFormCompanyFieldId, businessName)
  }

  enterTaxReference(taxReference) {
    cy.fillInTextField(
      this.addressFormTaxReferenceBusinessFieldId,
      taxReference
    )
  }

  checkEquivalenceSurchargeCheckbox() {
    cy.get(this.addressFormTaxReferenceBusinessFieldId).check()
  }

  clickEditSummaryButton() {
    cy.get(this.persinalDetailsSummaryHeaderId).find('button').click()
  }

  enterShippingAddressStreet(street) {
    cy.fillInTextField(this.createAccountFormAddressId, street)
  }

  enterShippingAddressHouseNumber(houseNumber) {
    cy.fillInTextField(
      this.addressShippingAddressFormHouseNumberFieldId,
      houseNumber
    )
  }

  enterShippingAddressAdditionalAddress(additionlAddress) {
    cy.fillInTextField(
      this.addressShippingAddressFormAdditionField,
      additionlAddress
    )
  }

  enterShippingAddressZipCode(zipCode) {
    cy.fillInTextField(this.createAccountFormZipCodeId, zipCode)
  }

  enterShippingAddressCity(city) {
    cy.fillInTextField(this.createAccountFormCityId, city)
  }

  selectShippingAddressSubdivision(subdivision) {
    cy.get(this.addressShippingAddressFormSubdivisionSelectorId).select(
      subdivision
    )
  }

  enterBillingAddressStreet(street) {
    cy.fillInTextField(this.addressBillingAddressFormAddress1FieldId, street)
  }

  enterBillingAddressHouseNumber(houseNumber) {
    cy.fillInTextField(
      this.addressBillingAddressFormHouseNumberFieldId,
      houseNumber
    )
  }

  enterBillingAddressAdditionallAddress(additionlAddress) {
    cy.fillInTextField(
      this.addressBillingAddressFormAdditionField,
      additionlAddress
    )
  }

  enterBillingAddressZipCode(zipCode) {
    cy.fillInTextField(this.addressBillingAddressFormZipCodeFieldId, zipCode)
  }

  enterBillingAddressCity(city) {
    cy.fillInTextField(this.addressBillingAddressFormCityFieldId, city)
  }

  selectBillingAddressSubdivision(subdivision) {
    cy.get(this.addressBillingAddressFormSubdivisionSelectorId).select(
      subdivision
    )
  }

  fillFirstStep(customerData) {
    this.enterFirstName(customerData.data.attributes.firstName)
    this.enterLastName(customerData.data.attributes.lastName)
    this.enterEmailAddress(customerData.data.attributes.email)
    this.enterPassword(customerData.data.attributes.password)
  }

  clickContinueButton() {
    cy.get(this.continueButtonId).should('be.visible').click()
  }

  clickSubmitButton() {
    cy.get(this.createAccountFormButtonId).click()
  }

  enterShippingAddress(shippingAddress) {
    this.enterShippingAddressStreet(shippingAddress.address1)
    this.enterShippingAddressHouseNumber(shippingAddress.houseNumber)
    this.enterShippingAddressAdditionalAddress(shippingAddress.addition)
    this.enterShippingAddressZipCode(shippingAddress.zipCode)
    this.enterShippingAddressCity(shippingAddress.city)
    if (shippingAddress.province) {
      this.selectShippingAddressSubdivision(shippingAddress.province)
    } else {
      this.selectShippingAddressSubdivision(shippingAddress.district)
    }
  }

  enterBillingAddress(billingAddress) {
    this.enterBillingAddressStreet(billingAddress.address1)
    this.enterBillingAddressHouseNumber(billingAddress.houseNumber)
    this.enterBillingAddressAdditionallAddress(billingAddress.addition)
    this.enterBillingAddressZipCode(billingAddress.zipCode)
    this.enterBillingAddressCity(billingAddress.city)
    if (billingAddress.province) {
      this.selectBillingAddressSubdivision(billingAddress.province)
    } else {
      this.selectBillingAddressSubdivision(billingAddress.district)
    }
  }

  toggleBillingSameAsDeliveryCheckbox() {
    cy.get(this.billingSameAsDeliveryCheckboxId).click()
  }

  fillSecondStep(customerData, isSameAsShippingAddress = true) {
    this.enterShippingAddress(
      customerData.data.attributes.addresses.addresses[0]
    )
    this.enterPhoneNumber(
      customerData.data.attributes.addresses.addresses[0].phone
    )
    if (customerData.data.attributes.accountType == AccountType.BUSINESS) {
      this.enterBusinessName(customerData.data.attributes.company)
      this.enterTaxReference(customerData.data.attributes.taxReference)
    }
    if (!isSameAsShippingAddress) {
      this.toggleBillingSameAsDeliveryCheckbox()
      this.enterBillingAddress(
        customerData.data.attributes.addresses.addresses[1]
      )
    }
  }

  changeAccountType() {
    cy.get(this.createAccountFormChangeAccountTypeButtonId).click()
  }

  createCustomer(customerData, isSameAsShippingAddress = true) {
    if (customerData.data.attributes.accountType == AccountType.BUSINESS) {
      this.changeAccountType()
    }
    this.fillFirstStep(customerData)
    this.clickContinueButton()
    this.fillSecondStep(customerData, isSameAsShippingAddress)
    this.clickSubmitButton()
  }
}

export const registrationPage = new RegistrationPage()
