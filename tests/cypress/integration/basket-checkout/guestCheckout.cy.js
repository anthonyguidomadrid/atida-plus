import { loginPage } from '../../support/page-objects/pages/account/loginPage'
import { checkoutPage } from '../../support/page-objects/pages/checkoutPage'
import { FeatureTag } from '../../support/enums/featureTag'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import {
  Customer,
  CustomerData
} from '../../support/api/SprykerAPI/models/customer'
import { onlyOn } from '@cypress/skip-test'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { basketPage } from '../../support/page-objects/pages/basketPage'
import { Address } from '../../support/api/SprykerAPI/models/address'
import { Province } from '../../support/enums/province'
import { guestCheckoutPage } from '../../support/page-objects/pages/guestCheckoutPage'
import { District } from '../../support/enums/district'
import { DbHelper } from '../../support/db.helper'
import { SuiteTag } from '../../support/enums/suiteTag'
import { FeatureFlag } from '../../../../src/config/constants/feature-flags'
const { getErrorMessage } = require('../../support/helper')
const faker = require('faker')
const checkoutUri = 'checkout'
const confirmationUri = 'confirmation'
let dbhelper = new DbHelper()

describe([FeatureTag.GUEST_CHECKOUT], 'Guest Checkout tests', () => {
  beforeEach(() => {
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    dbhelper.buildAndGetProdUrlSlugByIds(1024, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    basketPage.addProductInBasket()
    addToBasket.clickViewBasketButton()
    basketPage.clickOnOrderButton(checkoutUri)
  })

  it('#1013 User should be able to open guest checkout page successfully', () => {
    loginPage.continueAsGuest()
    const randomNumber = Date.now()
    let email = `automation-${randomNumber}@atida.com`
    let address1 = faker.address.streetAddress()
    let address2 = faker.address.streetAddress()
    let phone = faker.phone.phoneNumberFormat()
    let city = faker.address.city()
    let country = Cypress.env('locale') == 'es' ? 'España' : 'Portugal'
    let zipCode = Cypress.env('locale') == 'es' ? '43434' : '3322-445'
    let houseNumber = '3A'
    let addition = 'Additional address information'
    let district = Cypress.env('locale') == 'es' ? '' : District.AVEIRO
    let province = Cypress.env('locale') == 'es' ? Province.SEVILLA : ''

    let addressData = new Address({
      address1: address1,
      address2: address2,
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
          email: email,
          addresses: new Addresses({})
        })
      })
    })
    guestCheckoutPage.fillGuestCheckoutForm(customerData, addressData, country)
    guestCheckoutPage.goToGuestCheckout()
  })

  it(
    [SuiteTag.SMOKE],
    '#1014 Error messages should be displayed on guest checkout form when fields are empty',
    () => {
      loginPage.continueAsGuest()
      cy.get(guestCheckoutPage.guestCheckoutButtonId).click()
      getErrorMessage(guestCheckoutPage.firstName_error)
      getErrorMessage(guestCheckoutPage.lastName_error)
      getErrorMessage(guestCheckoutPage.email_error)
      getErrorMessage(guestCheckoutPage.shippingaddress1_error)
      getErrorMessage(guestCheckoutPage.houseNumber_error)
      getErrorMessage(guestCheckoutPage.zipCode_error)
      getErrorMessage(guestCheckoutPage.city_error)
      getErrorMessage(guestCheckoutPage.subdivision_error)
      getErrorMessage(guestCheckoutPage.phoneNumber_error)
    }
  )

  it('#939 Guest Checkout button on login page should be visible after refresh', () => {
    cy.visit('login/checkout')
    cy.get(loginPage.guestCheckoutButton).should('be.visible')
  })
})

describe([FeatureTag.GUEST_CHECKOUT], 'Guest Checkout payment tests', () => {
  beforeEach(() => {
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    dbhelper.buildAndGetProdUrlSlugByIds(1024, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    basketPage.addProductInBasket()
    addToBasket.clickViewBasketButton()
    basketPage.clickOnOrderButton(checkoutUri)
    loginPage.continueAsGuest()
    const randomNumber = Date.now()
    let email = `automation-${randomNumber}@atida.com`
    let address1 = faker.address.streetAddress()
    let address2 = faker.address.streetAddress()
    let phone = faker.phone.phoneNumberFormat()
    let city = faker.address.city()
    let country = Cypress.env('locale') == 'es' ? 'España' : 'Portugal'
    let zipCode = Cypress.env('locale') == 'es' ? '43434' : '3322-445'
    let houseNumber = '3A'
    let addition = 'Additional address information'
    let district = Cypress.env('locale') == 'es' ? '' : District.AVEIRO
    let province = Cypress.env('locale') == 'es' ? Province.SEVILLA : ''

    let addressData = new Address({
      address1: address1,
      address2: address2,
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
          email: email,
          addresses: new Addresses({})
        })
      })
    })
    guestCheckoutPage.fillGuestCheckoutForm(customerData, addressData, country)
    guestCheckoutPage.goToGuestCheckout()
  })

  it(
    [SuiteTag.SMOKE],
    '#964 Check Guest user can pay with Visa/Master card',
    () => {
      const randomFutureDate = faker.date.future()
      const futureMonth = new Date(randomFutureDate).getMonth()
      const futureYear = new Date(randomFutureDate).getFullYear().toString()
      const futureDate = `${futureMonth}/${futureYear}`
      const cvvNumber = '123'
      const creditCard = '5555555555554444'
      const secureCode = '1234'

      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectBraintreePaymentMethod(
        checkoutPage.checkoutPaymentMethodBraintreeCard,
        checkoutPage.braintreeMethodId
      )
      checkoutPage.fillInNewBraintreeForm(creditCard, futureDate, cvvNumber)
      checkoutPage.clickOnBraintreePaymentButton()
      checkoutPage.fillInBraintreeSecureCode(secureCode)
      cy.url().should('contain', confirmationUri)
      checkoutPage.getOrderConfirmationHeader()
    }
  )

  onlyOn(Cypress.env('locale') == 'pt', () => {
    it([SuiteTag.SMOKE], '#967 Check Guest user can pay with MB way', () => {
      const phoneNumber = '932123456'

      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectPaymentMethod(checkoutPage.mbWayAdyenMethodId)
      checkoutPage.fillInMbwayPaymentPhone(phoneNumber)
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(20000)
      cy.url().should('contain', confirmationUri)
      checkoutPage.getOrderConfirmationHeader()
    })

    it(
      [SuiteTag.SMOKE],
      '#966 Check Guest user can pay with Stripe Multibanco',
      () => {
        checkoutPage.selectDeliveryMethod()

        checkoutPage.selectMultibancoPaymentMethod(
          checkoutPage.multiBancoAdyenMethodId,
          checkoutPage.multibancoAdyenPaymentButtonId
        )

        cy.intercept('POST', '/api/checkout/create-order').as('createOrder')

        cy.url().should('contain', confirmationUri)
        checkoutPage.getOrderConfirmationHeader()
        cy.get(checkoutPage.confirmationBlockMultibancoSibs).should(
          'be.visible'
        )
      }
    )
  })

  it(
    [SuiteTag.SMOKE],
    '#965 Check Guest user can see Paypal button',
    { browser: '!firefox' },
    () => {
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectBraintreePaymentMethod(
        checkoutPage.checkoutPaymentMethodBraintreePayPal,
        checkoutPage.braintreeMethodPaypalButtonId
      )
      checkoutPage.checkForPaypalCheckoutButton(
        checkoutPage.paypalIframeId,
        checkoutPage.paypalCheckoutButtonId
      )
    }
  )

  onlyOn(Cypress.env('locale') == 'es', () => {
    it([SuiteTag.SMOKE], '#963 Check Guest user can pay with Bizum', () => {
      cy.checkFlag(FeatureFlag.CHECKOUT_PAYMENT_BIZUM).then(bizumEnabled => {
        cy.onlyOn(bizumEnabled === true)
      })
      const bizumValidPhone = '700000000'

      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectBizumPaymentMethod(
        checkoutPage.bizumPaymentMethod,
        checkoutPage.bizumPaymentButtonId
      )
      cy.intercept('POST', '/api/checkout/create-order').as('createOrder')
      checkoutPage.fillInBizumPaymentPhone(bizumValidPhone)
      checkoutPage.selectCompleteOrderBizum()
      cy.url().should('contain', confirmationUri)
      checkoutPage.getOrderConfirmationHeader()
    })
  })
})
