const { Address } = require('../../support/api/SprykerAPI/models/address')
const { header } = require('../../support/page-objects/components/header')
const { getErrorMessage } = require('../../support/helper')
import { DbHelper } from '../../support/db.helper'
import { customersEndpoints } from '../../support/api/SprykerAPI/endpoints/customer'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import {
  CustomerData,
  Customer
} from '../../support/api/SprykerAPI/models/customer'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { loginPage } from '../../support/page-objects/pages/account/loginPage'
import { addressBookPage } from '../../support/page-objects/pages/account/addressBookPage'
import { District } from '../../support/enums/district'
import { SuiteTag } from '../../support/enums/suiteTag'
import { FeatureTag } from '../../support/enums/featureTag'
import { Province } from '../../support/enums/province'

const dbhelper = new DbHelper()
const faker = require('faker')
const apiUrl = Cypress.env('apiUrl')
let emailAddress
let password
let firstName
let lastName
let address1
let phone
let city
let zipCode
let country
let houseNumber
let addition
let district
let province

let invalidAddressDetails = [
  {
    firstName: ' ',
    lastName: faker.name.lastName(),
    address: faker.address.streetName(),
    houseNumber: faker.datatype.number(),
    zipCode: Cypress.env('locale') == 'es' ? '43434' : '3322-445',
    city: faker.address.city(),
    district: Cypress.env('locale') == 'es' ? '' : District.AVEIRO,
    province: Cypress.env('locale') == 'es' ? Province.SALAMANCA : '',
    errorMessage: addressBookPage.firstNameError
  },
  {
    firstName: faker.name.firstName(),
    lastName: ' ',
    address: faker.address.streetName(),
    houseNumber: faker.datatype.number(),
    zipCode: Cypress.env('locale') == 'es' ? '43434' : '3322-445',
    city: faker.address.city(),
    district: Cypress.env('locale') == 'es' ? '' : District.AVEIRO,
    province: Cypress.env('locale') == 'es' ? Province.SALAMANCA : '',
    errorMessage: addressBookPage.lastNameError
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: ' ',
    houseNumber: faker.datatype.number(),
    zipCode: Cypress.env('locale') == 'es' ? '43434' : '3322-445',
    city: faker.address.city(),
    district: Cypress.env('locale') == 'es' ? '' : District.AVEIRO,
    province: Cypress.env('locale') == 'es' ? Province.SALAMANCA : '',
    errorMessage: addressBookPage.address1Error
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.city(),
    houseNumber: ' ',
    zipCode: Cypress.env('locale') == 'es' ? '43434' : '3322-445',
    city: faker.address.city(),
    district: Cypress.env('locale') == 'es' ? '' : District.AVEIRO,
    province: Cypress.env('locale') == 'es' ? Province.SALAMANCA : '',
    errorMessage: addressBookPage.houseNumberError
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.city(),
    houseNumber: faker.datatype.number(),
    zipCode: ' ',
    city: faker.address.city(),
    district: Cypress.env('locale') == 'es' ? '' : District.AVEIRO,
    province: Cypress.env('locale') == 'es' ? Province.SALAMANCA : '',
    errorMessage: addressBookPage.zipCodeError
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: faker.address.city(),
    houseNumber: faker.datatype.number(),
    zipCode: Cypress.env('locale') == 'es' ? '43434' : '3322-445',
    city: ' ',
    district: Cypress.env('locale') == 'es' ? '' : District.AVEIRO,
    province: Cypress.env('locale') == 'es' ? Province.SALAMANCA : '',
    errorMessage: addressBookPage.cityError
  }
]

describe([FeatureTag.ADDRESS_BOOK], 'Customer with one address', () => {
  beforeEach(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@atida.com`
    password = 'P@ssword1'
    firstName = faker.name.firstName()
    lastName = faker.name.lastName()
    address1 = faker.address.streetAddress()
    phone = faker.phone.phoneNumberFormat()
    city = faker.address.city()
    country = Cypress.env('locale') == 'es' ? 'España' : 'Portugal'
    zipCode = Cypress.env('locale') == 'es' ? '43434' : '3322-445'
    houseNumber = '3A'
    addition = 'Additional address information'
    district = Cypress.env('locale') == 'es' ? '' : District.AVEIRO
    province = Cypress.env('locale') == 'es' ? Province.SEVILLA : ''

    let address = new Address({
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      phone: phone,
      city: city,
      zipCode: zipCode,
      houseNumber: houseNumber,
      addition: addition,
      district: district,
      province: province
    })

    let customerData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          email: emailAddress,
          password: password,
          confirmPassword: password,
          addresses: new Addresses({
            addresses: [address]
          })
        })
      })
    })

    customersEndpoints.createCustomer(customerData).then(response => {
      expect(response.status).to.eql(201)
    })

    cy.request({
      method: 'POST',
      url: `${apiUrl}account/login`,
      body: {
        email: emailAddress,
        password: password
      }
    })
      .its('status')
      .should('eql', 200)

    cy.visit('/')
  })

  afterEach(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it([SuiteTag.SMOKE], '#436 Should open the Address book', () => {
    header.openAddressBook()
    addressBookPage.assertAddressRow(0, `${firstName} ${lastName}`)
    addressBookPage.assertAddressRow(
      1,
      `${address1} ${houseNumber}, ${addition}`
    )
    addressBookPage.assertAddressRow(2, `${zipCode} ${city}`)
    addressBookPage.assertAddressRow(
      3,
      `${Cypress.env('locale') == 'es' ? province : district}, ${country}`
    )
    addressBookPage.verifyDeleteButtonIsDisabled()
    addressBookPage.verifySetAsDefaultBillingAddressButtonIsDisabled()
    addressBookPage.verifySetAsDefaultDeliveryAddressButtonIsDisabled()
    addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed()
    addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
  })

  it('#438 Should add new addresses from the Address book', () => {
    let newAddressZipCode = Cypress.env('locale') == 'es' ? '43434' : '3322-445'
    let newAddressHouseNumber = '45T'
    let newAddressAddition = 'New additional address information'
    let newAddressDistrict =
      Cypress.env('locale') == 'es' ? '' : District.LISBOA
    let newAddressProvince =
      Cypress.env('locale') == 'es' ? Province.SALAMANCA : ''

    let addressData = new Address({
      zipCode: newAddressZipCode,
      houseNumber: newAddressHouseNumber,
      addition: newAddressAddition,
      district: newAddressDistrict,
      province: newAddressProvince
    })

    header.openAddressBook()
    addressBookPage.clickAddAddressButton()
    addressBookPage.fillAndSubmitAddressModal(addressData)

    addressBookPage.assertAddressRow(
      0,
      `${addressData.firstName} ${addressData.lastName}`,
      1
    )
    addressBookPage.assertAddressRow(
      1,
      `${addressData.address1} ${addressData.houseNumber}, ${addressData.addition}`,
      1
    )
    addressBookPage.assertAddressRow(
      2,
      `${addressData.zipCode} ${addressData.city}`,
      1
    )
    addressBookPage.assertAddressRow(
      3,
      `${
        Cypress.env('locale') == 'es'
          ? addressData.province
          : addressData.district
      }, ${country}`,
      1
    )
    addressBookPage.verifyDeleteButtonIsEnabled(1)
    addressBookPage.verifyEditButtonIsEnabled(1)
    addressBookPage.verifySetAsDefaultBillingAddressButtonIsEnabled(1)
    addressBookPage.verifySetAsDefaultDeliveryAddressButtonIsEnabled(1)
  })

  it('#512 Should not add a new address when the required fields are not populated', () => {
    header.openAddressBook()
    addressBookPage.clickAddAddressButton()

    invalidAddressDetails.forEach(invalidAddress => {
      let addressData = new Address({
        firstName: invalidAddress.firstName,
        lastName: invalidAddress.lastName,
        address1: invalidAddress.address,
        houseNumber: invalidAddress.houseNumber,
        zipCode: invalidAddress.zipCode,
        city: invalidAddress.city,
        district: invalidAddress.district,
        province: invalidAddress.province
      })

      addressBookPage.fillAndSubmitAddressModal(
        addressData,
        false,
        false,
        false
      )
      cy.get(addressBookPage.addEditAddressModalTitle).scrollIntoView({
        easing: 'linear'
      })

      getErrorMessage(invalidAddress.errorMessage)
    })
  })

  it('#513 Should not edit an address when the required fields are not populated', () => {
    header.openAddressBook()
    addressBookPage.clickEditAddressButton()

    invalidAddressDetails.forEach(invalidAddress => {
      let addressData = new Address({
        firstName: invalidAddress.firstName,
        lastName: invalidAddress.lastName,
        address1: invalidAddress.address,
        houseNumber: invalidAddress.houseNumber,
        zipCode: invalidAddress.zipCode,
        city: invalidAddress.city,
        district: invalidAddress.district,
        province: invalidAddress.province
      })

      addressBookPage.fillAndSubmitAddressModal(
        addressData,
        false,
        false,
        false
      )
      cy.get(addressBookPage.addEditAddressModalTitle).scrollIntoView({
        easing: 'linear'
      })

      getErrorMessage(invalidAddress.errorMessage)
    })
  })

  it('#714 All mandatory address fields should be filled out when adding an address', () => {
    header.openAddressBook()

    addressBookPage.clickAddAddressButton()
    cy.get(addressBookPage.addressFormFirstNameFieldId).clear()
    cy.get(addressBookPage.addressFormLastNameFieldId).clear()
    addressBookPage.submitModal(false)

    cy.get(addressBookPage.addEditAddressModalTitle).scrollIntoView({
      easing: 'linear'
    })

    getErrorMessage(addressBookPage.firstNameError)
    getErrorMessage(addressBookPage.lastNameError)
    getErrorMessage(addressBookPage.address1Error)
    getErrorMessage(addressBookPage.houseNumberError)
    cy.get(addressBookPage.addressFormHouseNumberFieldId).scrollIntoView({
      easing: 'linear'
    })
    getErrorMessage(addressBookPage.zipCodeError)
    getErrorMessage(addressBookPage.cityError)
    getErrorMessage(addressBookPage.subdivisionError)
  })

  it('#714 All mandatory address fields should be filled out when editing an address', () => {
    header.openAddressBook()
    addressBookPage.clickEditAddressButton()
    cy.get(addressBookPage.addressFormFirstNameFieldId)
      .should('be.visible')
      .clear()
    cy.get(addressBookPage.addressFormLastNameFieldId)
      .should('be.visible')
      .clear()
    cy.get(addressBookPage.addressFormAddress1FieldId)
      .should('be.visible')
      .clear()
    cy.get(addressBookPage.addressFormHouseNumberFieldId)
      .should('be.visible')
      .clear()
    cy.get(addressBookPage.addressFormZipCodeFieldId)
      .should('be.visible')
      .clear()
    cy.get(addressBookPage.addressFormCityFieldId).should('be.visible').clear()

    addressBookPage.submitModal(false)

    cy.get(addressBookPage.addEditAddressModalTitle).scrollIntoView({
      easing: 'linear'
    })

    getErrorMessage(addressBookPage.firstNameError)
    getErrorMessage(addressBookPage.lastNameError)
    getErrorMessage(addressBookPage.address1Error)
    getErrorMessage(addressBookPage.houseNumberError)
    cy.get(addressBookPage.addressFormHouseNumberFieldId).scrollIntoView({
      easing: 'linear'
    })
    getErrorMessage(addressBookPage.zipCodeError)
    getErrorMessage(addressBookPage.cityError)
  })

  it([SuiteTag.SMOKE], '#443 Should edit address in the Address book', () => {
    let newAddressZipCode = Cypress.env('locale') == 'es' ? '23454' : '3322-445'
    let newAddressHouseNumber = '45T'
    let newAddressAddition = 'New additional address information'
    let newAddressDistrict =
      Cypress.env('locale') == 'es' ? '' : District.AVEIRO
    let newAddressProvince = Cypress.env('locale') == 'es' ? Province.SORIA : ''

    let addressData = new Address({
      zipCode: newAddressZipCode,
      houseNumber: newAddressHouseNumber,
      addition: newAddressAddition,
      district: newAddressDistrict,
      province: newAddressProvince
    })

    header.openAddressBook()
    addressBookPage.clickEditAddressButton()
    addressBookPage.fillAndSubmitAddressModal(addressData)
    cy.reload()
    addressBookPage.assertAddressRow(
      0,
      `${addressData.firstName} ${addressData.lastName}`
    )
    addressBookPage.assertAddressRow(
      1,
      `${addressData.address1} ${addressData.houseNumber}, ${addressData.addition}`
    )
    addressBookPage.assertAddressRow(
      2,
      `${addressData.zipCode} ${addressData.city}`
    )
    addressBookPage.assertAddressRow(
      3,
      `${
        Cypress.env('locale') == 'es'
          ? addressData.province
          : addressData.district
      }, ${country}`
    )
    addressBookPage.verifyDeleteButtonIsDisabled()
    addressBookPage.verifySetAsDefaultBillingAddressButtonIsDisabled()
    addressBookPage.verifySetAsDefaultDeliveryAddressButtonIsDisabled()
    addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed()
    addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
  })

  it('#514 Should get notification error when I try to delete my default billing address which is also my default shipping address', () => {
    header.openAddressBook()
    addressBookPage.clickDeleteAddressButton()
    cy.get(addressBookPage.notificationModalLayoutId).should('be.visible')
    cy.get(addressBookPage.notificationModalConfirmationButtonId).should(
      'be.visible'
    )
    cy.get(addressBookPage.notificationModalCloseButtonId).should('not.exist')
    addressBookPage.clickNotificationModalConfirmationButton()
    cy.get(addressBookPage.notificationModalLayoutId).should('not.exist')
    cy.get(addressBookPage.addressSummaryTileId).should('have.length', 1)
  })

  it(
    [SuiteTag.SMOKE],
    '#458 Should mark the address as default delivery and default billing when added',
    () => {
      let newAddressZipCode =
        Cypress.env('locale') == 'es' ? '23454' : '3322-445'
      let newAddressHouseNumber = '45T'
      let newAddressAddition = 'New additional address information'
      let newAddressDistrict =
        Cypress.env('locale') == 'es' ? '' : District.LISBOA
      let newAddressProvince =
        Cypress.env('locale') == 'es' ? Province.SORIA : ''

      let addressData = new Address({
        zipCode: newAddressZipCode,
        houseNumber: newAddressHouseNumber,
        addition: newAddressAddition,
        district: newAddressDistrict,
        province: newAddressProvince
      })

      header.openAddressBook()
      addressBookPage.clickAddAddressButton()
      addressBookPage.fillAndSubmitAddressModal(addressData, true, true)

      addressBookPage.assertAddressRow(
        0,
        `${addressData.firstName} ${addressData.lastName}`
      )
      addressBookPage.assertAddressRow(
        1,
        `${addressData.address1} ${addressData.houseNumber}, ${addressData.addition}`
      )
      addressBookPage.assertAddressRow(
        2,
        `${addressData.zipCode} ${addressData.city}`
      )
      addressBookPage.assertAddressRow(
        3,
        `${
          Cypress.env('locale') == 'es'
            ? addressData.province
            : addressData.district
        }, ${country}`
      )
      addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed()
      addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()

      addressBookPage.verifyDeleteButtonIsDisabled()
      addressBookPage.verifyEditButtonIsEnabled()
      addressBookPage.verifySetAsDefaultBillingAddressButtonIsDisabled()
      addressBookPage.verifySetAsDefaultDeliveryAddressButtonIsDisabled()
    }
  )

  it('#459 The zip code should be in the correct format when adding a new address', () => {
    let invalidZipCodeFormat =
      Cypress.env('locale') == 'es' ? '3233-333' : '32333'
    header.openAddressBook()
    addressBookPage.clickAddAddressButton()
    addressBookPage.enterZipCode(invalidZipCodeFormat)
    cy.get(addressBookPage.addressFormZipCodeFieldId).blur()
    addressBookPage.submitModal()
    getErrorMessage(addressBookPage.zipCodeError)
  })

  it('#529 The zip code should in the correct format when editing an address', () => {
    let invalidZipCodeFormat =
      Cypress.env('locale') == 'es' ? '3233-333' : '32333'
    header.openAddressBook()
    addressBookPage.clickEditAddressButton()
    addressBookPage.enterZipCode(invalidZipCodeFormat)
    cy.get(addressBookPage.addressFormZipCodeFieldId).blur()
    addressBookPage.submitModal()
    getErrorMessage(addressBookPage.zipCodeError)
  })
})

describe([FeatureTag.ADDRESS_BOOK], 'Customer with multiple address', () => {
  beforeEach(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@gmail.com`
    password = 'P@ssword1'
    firstName = faker.name.firstName()
    lastName = faker.name.lastName()
    address1 = faker.address.streetAddress()
    phone = faker.phone.phoneNumberFormat()
    city = faker.address.city()
    country = Cypress.env('locale') == 'es' ? 'España' : 'Portugal'
    zipCode = Cypress.env('locale') == 'es' ? '43434' : '3322-445'
    houseNumber = '3A'
    addition = 'Additional address information'
    province = Cypress.env('locale') == 'es' ? Province.TARRAGONA : ''
    district = Cypress.env('locale') == 'es' ? '' : District.LISBOA

    let address = new Address({
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      phone: phone,
      city: city,
      zipCode: zipCode,
      houseNumber: houseNumber,
      addition: addition,
      district: district,
      province: province
    })

    let customerData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          email: emailAddress,
          password: password,
          confirmPassword: password,
          addresses: new Addresses({
            addresses: [address, new Address()]
          })
        })
      })
    })

    customersEndpoints.createCustomer(customerData).then(response => {
      expect(response.status).to.eql(201)
    })

    cy.request({
      method: 'POST',
      url: `${apiUrl}account/login`,
      body: {
        email: emailAddress,
        password: password
      }
    })
      .its('status')
      .should('eql', 200)

    cy.visit('/')
  })

  after(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it(
    [SuiteTag.SMOKE],
    '#441 Should delete address from the Address book',
    () => {
      header.openAddressBook()
      addressBookPage.isNumberOfAddressesCorrect(2)
      addressBookPage.clickDeleteAddressButton(1)
      addressBookPage.isNumberOfAddressesCorrect(1)
      addressBookPage.assertAddressRow(0, `${firstName} ${lastName}`)
      addressBookPage.assertAddressRow(
        1,
        `${address1} ${houseNumber}, ${addition}`
      )
      addressBookPage.assertAddressRow(2, `${zipCode} ${city}`)
      addressBookPage.assertAddressRow(
        3,
        `${Cypress.env('locale') == 'es' ? province : district}, ${country}`
      )
      addressBookPage.verifyDeleteButtonIsDisabled()
      addressBookPage.verifySetAsDefaultBillingAddressButtonIsDisabled()
      addressBookPage.verifySetAsDefaultDeliveryAddressButtonIsDisabled()
      addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed()
      addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
    }
  )

  it(
    [SuiteTag.SMOKE],
    '#439 Should make address billing address from the Address book',
    () => {
      header.openAddressBook()
      addressBookPage.setAddressAsDefaultBillingAddress(1)
      addressBookPage.verifySetAsDefaultBillingAddressButtonIsDisabled(1)
      addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed(1)
      addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
      addressBookPage.verifySetAsDefaultDeliveryAddressButtonIsDisabled()
    }
  )

  it(
    [SuiteTag.SMOKE],
    '#440 Should make address delivery address from the Address book',
    () => {
      header.openAddressBook()
      addressBookPage.setAddressAsDefaultDeliveryAddress(1)
      addressBookPage.verifySetAsDefaultBillingAddressButtonIsDisabled(1)
      addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed(1)
      addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
      addressBookPage.verifySetAsDefaultDeliveryAddressButtonIsDisabled()
    }
  )

  it(
    [SuiteTag.SMOKE],
    '#444 Should be able to delete billing address from the address book',
    () => {
      header.openAddressBook()
      addressBookPage.setAddressAsDefaultBillingAddress(1)
      addressBookPage.clickDeleteAddressButton(1)

      cy.get(addressBookPage.notificationModalLayoutId).should('be.visible')
      cy.get(addressBookPage.notificationModalConfirmationButtonId).should(
        'be.visible'
      )
      cy.get(addressBookPage.notificationModalCloseButtonId).should(
        'be.visible'
      )
      addressBookPage.clickNotificationModalConfirmationButton()

      cy.get(addressBookPage.notificationModalLayoutId).should('not.exist')
      cy.get(addressBookPage.addressSummaryTileId).should('have.length', 1)
      addressBookPage.verifyDeleteButtonIsDisabled()
      addressBookPage.verifySetAsDefaultBillingAddressButtonIsDisabled()
      addressBookPage.verifySetAsDefaultDeliveryAddressButtonIsDisabled()
      addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed()
      addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
    }
  )

  it('#519 Should cancel billing address deletion', () => {
    header.openAddressBook()
    addressBookPage.setAddressAsDefaultBillingAddress(1)
    addressBookPage.clickDeleteAddressButton(1)

    cy.get(addressBookPage.notificationModalLayoutId).should('be.visible')
    cy.get(addressBookPage.notificationModalConfirmationButtonId).should(
      'be.visible'
    )
    cy.get(addressBookPage.notificationModalCloseButtonId).should('be.visible')
    addressBookPage.clickNotificationModalCloseButton()

    cy.get(addressBookPage.notificationModalLayoutId).should('not.exist')
    cy.get(addressBookPage.addressSummaryTileId).should('have.length', 2)
  })

  it('#442 Should not be able to delete delivery address from the address book', () => {
    header.openAddressBook()
    addressBookPage.setAddressAsDefaultBillingAddress(1)
    addressBookPage.clickDeleteAddressButton()

    cy.get(addressBookPage.notificationModalLayoutId).should('be.visible')
    cy.get(addressBookPage.notificationModalConfirmationButtonId).should(
      'be.visible'
    )
    cy.get(addressBookPage.notificationModalCloseButtonId).should('not.exist')
    addressBookPage.clickNotificationModalConfirmationButton()

    cy.get(addressBookPage.notificationModalLayoutId).should('not.exist')
    cy.get(addressBookPage.addressSummaryTileId).should('have.length', 2)
  })
})

describe([FeatureTag.ADDRESS_BOOK], 'Guest customer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('#437 Should not open the Address book as guest customer', () => {
    header.openAddressBook(false)
    loginPage.verifyLoginFormIsDisplayed()
  })

  it([SuiteTag.SMOKE], '#457 Should open the Address book after login', () => {
    const addressBookSlug = 'account/address-book'
    const randomNumber = Date.now()
    let emailAddress = `automation-${randomNumber}@gmail.com`
    let password = 'P@ssword1'

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

    header.openAddressBook(false)
    loginPage.verifyLoginFormIsDisplayed()
    loginPage.loginUser(emailAddress, password)

    cy.url().should('contain', addressBookSlug)
    cy.get(addressBookPage.addressSummaryTileId).should('be.visible')
  })
})

describe([FeatureTag.ADDRESS_BOOK], 'Cross-store tests', () => {
  beforeEach(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@gmail.com`
    password = 'P@ssword1'

    let customerData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          email: emailAddress,
          password: password,
          confirmPassword: password,
          addresses: new Addresses({
            addresses: [new Address()]
          })
        })
      })
    })

    customersEndpoints.createCustomer(customerData).then(response => {
      expect(response.status).to.eql(201)
    })
    Cypress.env('locale') == 'es'
      ? cy.visit(Cypress.config().baseUrl.replace('/es-es', '/pt-pt/login'))
      : cy.visit(Cypress.config().baseUrl.replace('/pt-pt', '/es-es/login'))

    loginPage.loginUser(emailAddress, password)
  })

  afterEach(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it(
    [SuiteTag.SMOKE],
    '#530 Should be notified that I do not have address in the locale I want to order',
    () => {
      header.openAddressBook()
      addressBookPage.verifyNoAddressForTheLocaleNotificationIsDisplayed()
    }
  )

  it(
    [SuiteTag.SMOKE],
    '#531 Should create and set as default address an address for the locale I want to order',
    () => {
      let newAddressZipCode =
        Cypress.env('locale') == 'es' ? '3322-445' : '23454'
      let newAddressHouseNumber = '45T'
      let newAddressAddition = 'New additional address information'
      let newAddressDistrict =
        Cypress.env('locale') == 'es' ? District.LISBOA : ''
      let newAddressProvince =
        Cypress.env('locale') == 'es' ? '' : Province.TARRAGONA
      let country = Cypress.env('locale') == 'es' ? 'Portugal' : 'España'

      let addressData = new Address({
        zipCode: newAddressZipCode,
        houseNumber: newAddressHouseNumber,
        addition: newAddressAddition,
        district: newAddressProvince,
        province: newAddressDistrict
      })

      header.openAddressBook()
      addressBookPage.verifyNoAddressForTheLocaleNotificationIsDisplayed()
      addressBookPage.clickNotificationAddAddressButton()
      addressBookPage.fillAndSubmitAddressModal(addressData, true, true)

      addressBookPage.isNumberOfAddressesCorrect(2)
      addressBookPage.assertAddressRow(
        0,
        `${addressData.firstName} ${addressData.lastName}`
      )
      addressBookPage.assertAddressRow(
        1,
        `${addressData.address1} ${addressData.houseNumber}, ${addressData.addition}`
      )
      addressBookPage.assertAddressRow(
        2,
        `${addressData.zipCode} ${addressData.city}`
      )
      addressBookPage.assertAddressRow(
        3,
        `${
          Cypress.env('locale') == 'es'
            ? addressData.province
            : addressData.district
        }, ${country}`
      )
      addressBookPage.verifyDeleteButtonIsDisabled()
      addressBookPage.verifySetAsDefaultBillingAddressButtonIsDisabled()
      addressBookPage.verifySetAsDefaultDeliveryAddressButtonIsDisabled()
      addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed()
      addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
    }
  )
})
