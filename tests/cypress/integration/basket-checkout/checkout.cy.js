import { checkoutPage } from '../../support/page-objects/pages/checkoutPage'
import { header } from '../../support/page-objects/components/header'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import { basketPage } from '../../support/page-objects/pages/basketPage'
import { dbhelper } from '../../support/db.helper'
import { loginPage } from '../../support/page-objects/pages/account/loginPage'
import { onlyOn, skipOn } from '@cypress/skip-test'
import { UserBuilder } from '../../support/builder/user.builder'
import { SuiteTag } from '../../support/enums/suiteTag'
import { customerAPI } from '../../support/api/endpoints/customer'
import { FeatureFlag } from '../../../../src/config/constants/feature-flags'
import { AccountType } from '../../support/enums/accountType'
import { getErrorMessage } from '../../support/helper'
import {
  Customer,
  CustomerData
} from '../../support/api/SprykerAPI/models/customer'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { customersEndpoints } from '../../support/api/SprykerAPI/endpoints/customer'
import { Address } from '../../support/api/SprykerAPI/models/address'
import { Province } from '../../support/enums/province'
const faker = require('faker')
const checkoutUri = 'checkout'
const loginBasketUri = 'login/basket'
const confirmationUri = 'confirmation'

Cypress.on('uncaught:exception', (err, runnable) => {
  // temporary hack due to type error post-checkout
  return false
})

describe([SuiteTag.SMOKE], 'Redirection from checkout page', () => {
  it('#403 redirects to login page when user is not logged in', () => {
    cy.visit(checkoutUri)
    cy.url().should('include', '/login/checkout')
  })

  it('#406 redirects authenticated user to basket page when basket is empty', () => {
    cy.visit(loginBasketUri)
    loginPage.loginWithFixturedUser()
    basketPage.removeAllProducts()
    cy.visit(checkoutUri)
    cy.url().should('not.include', checkoutUri)
    cy.url().should('include', 'basket')
  })
})

describe([SuiteTag.SMOKE], 'End-to-end Checkout tests', () => {
  beforeEach(() => {
    cy.viewportPreset('samsung-s10-plus')
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    cy.visit(loginBasketUri)
    loginPage.loginWithFixturedUser()
    basketPage.removeAllProducts()
    dbhelper.buildAndGetProdUrlSlugByIds(1024, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    basketPage.addProductInBasket()
    addToBasket.clickViewBasketButton()
    basketPage.clickOnOrderButton(checkoutUri)
    cy.intercept('POST', '/api/checkout/set-data').as('setCheckoutData')
    cy.intercept('POST', '/api/checkout/create-order').as('createOrder')
    cy.wait('@setCheckoutData')
  })

  it('Select standard delivery method', () => {
    checkoutPage.clickOnTaxExemptButtonId()
    checkoutPage.selectDeliveryMethod()
    cy.get(checkoutPage.checkoutPaymentHeaderId).should('be.visible')
  })

  onlyOn(Cypress.env('locale') == 'pt', () => {
    it.skip('#413 Display Multibanco Sibs payment method and checkout', () => {
      cy.intercept('POST', '/api/checkout/create-sibs-multibanco-payment').as(
        'setMultibancoData'
      )
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()

      cy.wait(500) // eslint-disable-line cypress/no-unnecessary-waiting

      checkoutPage.selectMultibancoPaymentMethod(
        checkoutPage.multiBancoAdyenMethodId,
        checkoutPage.multibancoAdyenPaymentButtonId
      )

      cy.wait('@createOrder')
        .its('response.body.orderId')
        .should('be.a', 'string')
      cy.wait('@setMultibancoData')
        .its('response.body.internal_ref')
        .should('be.a', 'string')
      cy.url().should('contain', confirmationUri)
      checkoutPage.getOrderConfirmationHeader()
      cy.get(checkoutPage.confirmationBlockMultibancoSibs).should('be.visible')
    })
  })
  onlyOn(Cypress.env('locale') == 'pt', () => {
    it(
      '#37 Display Multibanco Stripe payment method and checkout',
      { browser: '!firefox' },
      () => {
        cy.checkFlag(FeatureFlag.CHECKOUT_PAYMENT_STRIPE_MULTIBANCO).then(
          multibancoStripeEnabled => {
            cy.onlyOn(multibancoStripeEnabled === true)
          }
        )

        cy.intercept('POST', '/api/checkout/stripe-multibanco-data').as(
          'setMultibancoData'
        )

        checkoutPage.clickOnTaxExemptButtonId()
        checkoutPage.selectDeliveryMethod()

        cy.wait(500) // eslint-disable-line cypress/no-unnecessary-waiting

        checkoutPage.selectMultibancoPaymentMethod(
          checkoutPage.multiBancoStripeMethodId,
          checkoutPage.multibancoStripePaymentButtonId
        )

        cy.wait('@createOrder')
          .its('response.body.orderId')
          .should('be.a', 'string')
        cy.wait('@setMultibancoData')
          .its('response.body.internal_ref')
          .should('be.a', 'string')
        cy.url().should('contain', 'stripe.com/sources')
        cy.get('form button').click()
        cy.url().should('contain', confirmationUri)
        checkoutPage.getOrderConfirmationHeader()
      }
    )
  })

  it(
    '#415 Display Braintree payment method and checkout with saved card',
    { browser: '!firefox' },
    () => {
      const secureCode = '1234'
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectBraintreePaymentMethod(
        checkoutPage.checkoutPaymentMethodBraintreeCard,
        checkoutPage.braintreeMethodId
      )
      checkoutPage.checkAvailableMethod()
      checkoutPage.clickOnBraintreePaymentButton()
      checkoutPage.fillInBraintreeSecureCode(secureCode)
      cy.wait('@createOrder')
        .its('response.body.orderId')
        .should('be.a', 'string')
      cy.url().should('contain', confirmationUri)
      checkoutPage.getOrderConfirmationHeader()
    }
  )
  it(
    '#511 Update quantity of basket item via order details panel',
    { browser: '!firefox' },
    () => {
      const newQuantity = 2
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.editCart()
      basketPage.changeProductQuantity(newQuantity)
      cy.get(checkoutPage.basketSummaryOrderButton).click()
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()
      checkoutPage.verifyNewQuantityOnCheckout(newQuantity)
    }
  )

  onlyOn(Cypress.env('locale') == 'pt', () => {
    it('#414 Display MBWay payment method and checkout with valid Spanish phone number', () => {
      const phoneNumber = '932123456'
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectPaymentMethod(checkoutPage.mbWayAdyenMethodId)
      checkoutPage.fillInMbwayPaymentPhone(phoneNumber)
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(25000)
      cy.url().should('contain', confirmationUri)
      checkoutPage.getOrderConfirmationHeader()
    })
  })

  it(
    '#412 Display Braintree Paypal payment method and show PayPal Checkout button',
    { browser: '!firefox' },
    () => {
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectBraintreePaymentMethod(
        checkoutPage.checkoutPaymentMethodBraintreePayPal,
        checkoutPage.braintreeMethodPaypalButtonId
      )
      checkoutPage.clickOnPaypalCheckoutButton()
      cy.url().should('contain', confirmationUri)
    }
  )
})

onlyOn(Cypress.env('locale') == 'es', () => {
  describe('Bizum payment method tests', () => {
    before(() => {
      cy.checkFlag(FeatureFlag.CHECKOUT_PAYMENT_BIZUM).then(bizumEnabled => {
        cy.onlyOn(bizumEnabled === true)
      })
    })

    beforeEach(() => {
      cy.viewportPreset('samsung-s10-plus')
      let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
      cy.visit(loginBasketUri)
      loginPage.loginWithFixturedUser()
      basketPage.removeAllProducts()
      dbhelper.buildAndGetProdUrlSlugByIds(1491, storeLocale).then(data => {
        cy.visit(`${data.rows[0].url_slug}`)
      })
      basketPage.addProductInBasket()
      addToBasket.clickViewBasketButton()
      basketPage.clickOnOrderButton(checkoutUri)
      cy.intercept('POST', '/api/checkout/set-data').as('setCheckoutData')
      cy.intercept('POST', '/api/checkout/create-order').as('createOrder')
      cy.wait('@setCheckoutData')
    })

    it(
      [SuiteTag.SMOKE],
      '#426 Should place order via Bizum payment method with valid credentials',
      () => {
        const bizumValidPhone = '700000000'
        checkoutPage.clickOnTaxExemptButtonId()
        checkoutPage.selectDeliveryMethod()
        checkoutPage.selectBizumPaymentMethod(
          checkoutPage.bizumPaymentMethod,
          checkoutPage.bizumPaymentButtonId
        )

        cy.wait('@createOrder')
          .its('response.body.orderId')
          .should('be.a', 'string')
        checkoutPage.fillInBizumPaymentPhone(bizumValidPhone)
        checkoutPage.selectCompleteOrderBizum()
        cy.url().should('contain', confirmationUri)
        checkoutPage.getOrderConfirmationHeader()
      }
    )

    it('Should not be able to place successful order with Bizum when credentials are invalid', () => {
      const bizumInvalidPhone = 'ko@ko.bg'
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectBizumPaymentMethod(
        checkoutPage.bizumPaymentMethod,
        checkoutPage.bizumPaymentButtonId
      )

      cy.wait('@createOrder')
        .its('response.body.orderId')
        .should('be.a', 'string')
      checkoutPage.fillInBizumPaymentPhone(bizumInvalidPhone)
      checkoutPage.verifyBizumError()
    })
  })
})

onlyOn(Cypress.env('locale') == 'pt', () => {
  describe('Payments failed with', () => {
    const locale = Cypress.env('locale') == 'es' ? 'es-ES' : 'pt-PT'
    let userData
    let emailAddress
    let password
    before(() => {
      const randomNumber = Date.now()
      emailAddress = `automation-${randomNumber}@atida.com`
      password = 'P@ssword1'

      userData = new CustomerData({
        data: new Customer({
          attributes: new Attributes({
            email: emailAddress,
            password: password,
            confirmPassword: password,
            addresses: new Addresses()
          })
        })
      })

      customersEndpoints.createCustomer(userData).then(response => {
        expect(response.status).to.eql(201)
      })
    })

    after(() => {
      dbhelper.buildAndDeleteQueryByUser(emailAddress)
    })

    beforeEach(() => {
      cy.viewportPreset('samsung-s10-plus')
      let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
      cy.visit(loginBasketUri)
      loginPage.loginUser(emailAddress, password)
      basketPage.removeAllProducts()
      dbhelper.buildAndGetProdUrlSlugByIds(17884, storeLocale).then(data => {
        cy.visit(`${data.rows[0].url_slug}`)
      })
      basketPage.addProductInBasket()
      addToBasket.clickViewBasketButton()
      basketPage.clickOnOrderButton(checkoutUri)
    })

    it('#48 Mbway method when portugal or spain phone field is empty', () => {
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectPaymentMethod(checkoutPage.mbWayAdyenMethodId)
      cy.get(checkoutPage.mbWayButton).should('be.disabled')
      cy.get(checkoutPage.mbWayButton).should('be.disabled')
    })

    it.skip('#49 Mbway method when portugal phone is not subscribed in SIBS', () => {
      const phoneNumber = faker.phone.phoneNumberFormat()
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectPaymentMethod(checkoutPage.mbWayAdyenMethodId)
      checkoutPage.fillInMbwayPaymentPhone(phoneNumber)
      getErrorMessage(checkoutPage.mbWayError)
      cy.get(checkoutPage.mbWayButton).should('be.disabled')
    })

    it.skip('#50 Mbway method when spain phone is not subscribed in SIBS', () => {
      const phoneNumber = faker.phone.phoneNumberFormat()
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectPaymentMethod(checkoutPage.mbWayAdyenMethodId)
      checkoutPage.fillInMbwayPaymentPhone(phoneNumber)
      getErrorMessage(checkoutPage.mbWayError)
      cy.get(checkoutPage.mbWayButton).should('be.disabled')
    })

    it(
      'Braintree payment method when invalid card details are used',
      { browser: '!firefox' },
      () => {
        const randomFutureDate = faker.date.past()
        const pastMonth = new Date(randomFutureDate).getMonth()
        const pastYear = new Date(randomFutureDate)
          .getFullYear()
          .toString()
          .substr(-2)
        const creditCard = faker.datatype.number()
        const expiredDate = `${pastMonth}/${pastYear}`
        const cvvNumber = '1'

        checkoutPage.clickOnTaxExemptButtonId()
        checkoutPage.selectDeliveryMethod()
        checkoutPage.selectBraintreePaymentMethod(
          checkoutPage.checkoutPaymentMethodBraintreeCard,
          checkoutPage.braintreeMethodId
        )

        checkoutPage.fillInNewBraintreeForm(creditCard, expiredDate, cvvNumber)
        cy.get(checkoutPage.erroredBraintreeNumberId).should('be.visible')
        cy.get(checkoutPage.erroredBraintreeDateId).should('be.visible')
        cy.get(checkoutPage.braintreePayNowButton).should('be.disabled')
      }
    )
  })
})

describe([SuiteTag.SMOKE], 'Add new Braintree card', () => {
  const locale = Cypress.env('locale') == 'es' ? 'es-ES' : 'pt-PT'
  let userData
  let emailAddress
  let password
  before(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@atida.com`
    password = 'P@ssword1'

    userData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          email: emailAddress,
          password: password,
          confirmPassword: password,
          addresses: new Addresses()
        })
      })
    })

    customersEndpoints.createCustomer(userData).then(response => {
      expect(response.status).to.eql(201)
    })
  })

  beforeEach(() => {
    cy.viewportPreset('samsung-s10-plus')
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    cy.visit(loginBasketUri)
    loginPage.loginUser(emailAddress, password)
    dbhelper.buildAndGetProdUrlSlugByIds(17884, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    basketPage.addProductInBasket()
    addToBasket.clickViewBasketButton()
    basketPage.clickOnOrderButton(checkoutUri)
    cy.intercept('POST', '/api/checkout/create-order').as('createOrder')
    cy.intercept('POST', '/api/checkout/set-data').as('setCheckoutData')
  })

  after(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it('#416, #429, #516, #517, #860, #861, #865, #869, #350 Display Braintree payment method and checkout with new card', () => {
    const randomFutureDate = faker.date.future()
    const futureMonth = new Date(randomFutureDate).getMonth()
    const futureYear = new Date(randomFutureDate)
      .getFullYear()
      .toString()
      .substr(-2)
    const expiredDate = `${futureMonth}/${futureYear}`
    const cvvNumber = '123'
    const creditCard = '4000000000001091'
    const secureCode = '1234'
    const taxShippingPrice = (299 / 100).toLocaleString(locale)
    const taxMinDays = 1

    cy.wait('@setCheckoutData')
    checkoutPage.checkDeliveryMethodInformation(taxShippingPrice, taxMinDays)
    checkoutPage.selectDeliveryMethod()
    checkoutPage.selectBraintreePaymentMethod(
      checkoutPage.checkoutPaymentMethodBraintreeCard,
      checkoutPage.braintreeMethodId
    )
    checkoutPage.fillInNewBraintreeForm(creditCard, expiredDate, cvvNumber)
    checkoutPage.clickOnBraintreePaymentButton()
    checkoutPage.fillInBraintreeSecureCode(secureCode)
    cy.wait('@createOrder')
      .its('response.body.orderId')
      .should('be.a', 'string')
    cy.url().should('contain', confirmationUri)
    checkoutPage.getOrderConfirmationHeader()
  })
})

describe([SuiteTag.SMOKE], 'Zip code validation', () => {
  const data = {
    locale: Cypress.env('locale') == 'es' ? 'pt' : 'es',
    accountType: AccountType.PERSONAL
  }
  let userData = new UserBuilder(data).buildCustomerData()
  const headerValue = Cypress.env('locale') == 'es' ? 'pt-pt' : 'es-es'

  before(() => {
    customerAPI.createCustomer(userData, headerValue).then(resp => {
      expect(resp.status).to.eq(201)
    })
    cy.viewportPreset('samsung-s10-plus')
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    cy.visit(loginBasketUri)
    loginPage.loginUser(userData.email, userData.password)
    dbhelper.buildAndGetProdUrlSlugByIds(17884, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    basketPage.addProductInBasket()
    addToBasket.clickViewBasketButton()
    basketPage.clickOnOrderButton(checkoutUri)
  })

  after(() => {
    dbhelper.buildAndDeleteQueryByUser(userData.email)
  })

  it('#1299 Should display guest checkout address form when address locale is invalid', () => {
    cy.get(checkoutPage.guestCheckoutForm).within(() => {
      cy.get(checkoutPage.guestCheckoutFormFname).should(
        'have.value',
        userData.firstName
      )
    })
    cy.get(checkoutPage.guestCheckoutFormButton).should('be.enabled')
  })
})

onlyOn(Cypress.env('locale') == 'es', () => {
  describe([SuiteTag.SMOKE], 'tax exempt test', () => {
    const zipCode = 35001
    const productCount = 1
    let customerData
    const randomNumber = Date.now()

    let emailAddress = `automation-${randomNumber}@atida.com`
    let password = 'P@ssword1'
    let shipingAddress = new Address({
      province: Province.CEUTA,
      zipCode: zipCode
    })

    before(() => {
      cy.intercept('POST', '/api/checkout/create-order').as('createOrder')
      cy.intercept('POST', '/api/checkout/set-data').as('setCheckoutData')

      customerData = new CustomerData({
        data: new Customer({
          attributes: new Attributes({
            email: emailAddress,
            password: password,
            confirmPassword: password,
            addresses: new Addresses({
              addresses: [shipingAddress]
            }),
            taxReference: '12345678Z',
            locale: 'es',
            accountType: AccountType.PERSONAL,
            surcharge: false
          })
        })
      })

      customersEndpoints.createCustomer(customerData).then(response => {
        expect(response.status).to.eql(201)
      })
      cy.viewportPreset('samsung-s10-plus')
      let storeLocale = 77
      cy.visit(loginBasketUri)
      loginPage.loginUser(emailAddress, password)
      dbhelper.buildAndGetProdUrlSlugByIds(17884, storeLocale).then(data => {
        cy.visit(`${data.rows[0].url_slug}`)
      })
      basketPage.addProductInBasket()
      addToBasket.clickViewBasketButton()
      header.checkItemsCount(productCount)
      basketPage.clickOnOrderButton(checkoutUri)
    })

    afterEach(() => {
      dbhelper.buildAndDeleteQueryByUser(emailAddress)
    })

    it('#428, #518, #868, #350, #401 Should place an order without VAT', () => {
      const randomFutureDate = faker.date.future()
      const futureMonth = new Date(randomFutureDate).getMonth()
      const futureYear = new Date(randomFutureDate)
        .getFullYear()
        .toString()
        .substr(-2)
      const expiredDate = `${futureMonth}/${futureYear}`
      const cvvNumber = '123'
      const creditCard = '4000000000001091'
      const secureCode = '1234'
      const taxExemptShippingPrice = '4,92'
      const taxExemptMinDays = 5

      cy.wait('@setCheckoutData')
      checkoutPage.clickOnTaxExemptButtonId()
      checkoutPage.checkDeliveryMethodInformation(
        taxExemptShippingPrice,
        taxExemptMinDays
      )
      checkoutPage.selectDeliveryMethod()
      checkoutPage.selectBraintreePaymentMethod(
        checkoutPage.checkoutPaymentMethodBraintreeCard,
        checkoutPage.braintreeMethodId
      )
      checkoutPage.fillInNewBraintreeForm(creditCard, expiredDate, cvvNumber)
      checkoutPage.clickOnBraintreePaymentButton()
      checkoutPage.fillInBraintreeSecureCode(secureCode)
      cy.wait('@createOrder')
        .its('response.body.orderId')
        .should('be.a', 'string')
      cy.url().should('contain', confirmationUri)
      checkoutPage.getOrderConfirmationHeader()
    })
  })
})

describe('Order is placed with voucher code', () => {
  let voucherCode = '10discount'
  const locale = Cypress.env('locale') == 'es' ? 'es-ES' : 'pt-PT'
  const randomFutureDate = faker.date.future()
  const futureMonth = new Date(randomFutureDate).getMonth()
  const futureYear = '32'
  const expiredDate = `${futureMonth}/${futureYear}`
  const cvvNumber = '123'
  const creditCard = '4000000000001091'
  const secureCode = '1234'
  let userData
  let emailAddress
  let password
  before(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@atida.com`
    password = 'P@ssword1'

    userData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          email: emailAddress,
          password: password,
          confirmPassword: password,
          addresses: new Addresses()
        })
      })
    })

    customersEndpoints.createCustomer(userData).then(response => {
      expect(response.status).to.eql(201)
    })
  })

  after(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  beforeEach(() => {
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    cy.visit(loginBasketUri)
    loginPage.loginUser(emailAddress, password)
    basketPage.removeAllProducts()
    dbhelper.buildAndGetProdUrlSlugByIds(1024, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    basketPage.addProductInBasket()
    addToBasket.clickViewBasketButton()
  })

  it('#19, #339 valid voucher code is added succesfully', () => {
    const secureCode = '1234'
    basketPage.fillInVoucherCode(voucherCode)
    basketPage.clickOnOrderButton(checkoutUri)
    cy.intercept('POST', '/api/checkout/set-data').as('setCheckoutData')
    cy.intercept('POST', '/api/checkout/create-order').as('createOrder')
    cy.wait('@setCheckoutData')
    checkoutPage.clickOnTaxExemptButtonId()
    checkoutPage.selectDeliveryMethod()
    checkoutPage.selectBraintreePaymentMethod(
      checkoutPage.checkoutPaymentMethodBraintreeCard,
      checkoutPage.braintreeMethodId
    )
    checkoutPage.fillInNewBraintreeForm(creditCard, expiredDate, cvvNumber)
    checkoutPage.clickOnBraintreePaymentButton()
    checkoutPage.fillInBraintreeSecureCode(secureCode)
    cy.wait('@createOrder')
      .its('response.body.orderId')
      .should('be.a', 'string')
    cy.url().should('contain', confirmationUri)
    checkoutPage.getOrderConfirmationHeader()
    checkoutPage.getDiscountOnOrderPage()
  })
})

describe('Cart rule discount basket tests', () => {
  before(() => {
    cy.viewportPreset('iphone-se')
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    cy.visit(loginBasketUri)
    loginPage.loginWithFixturedUser()
    basketPage.removeAllProducts()
    dbhelper.buildAndGetProdUrlSlugByIds(1024, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    basketPage.addProductInBasket()
    addToBasket.clickViewBasketButton()
  })

  it.skip('#20 cart rule is applied and user can checkout with a discounted item', () => {
    const secureCode = '1234'
    checkoutPage.verifyCartRule()
    basketPage.clickOnOrderButton(checkoutUri)
    cy.intercept('POST', '/api/checkout/set-data').as('setCheckoutData')
    cy.intercept('POST', '/api/checkout/create-order').as('createOrder')
    cy.wait('@setCheckoutData')
    checkoutPage.clickOnTaxExemptButtonId()
    checkoutPage.selectDeliveryMethod()
    checkoutPage.selectBraintreePaymentMethod(
      checkoutPage.checkoutPaymentMethodBraintreeCard,
      checkoutPage.braintreeMethodId
    )
    checkoutPage.checkAvailableMethod()
    checkoutPage.clickOnBraintreePaymentButton()
    checkoutPage.fillInBraintreeSecureCode(secureCode)
    cy.wait('@createOrder')
      .its('response.body.orderId')
      .should('be.a', 'string')
    cy.url().should('contain', confirmationUri)
    checkoutPage.getOrderConfirmationHeader()
    checkoutPage.getDiscountOnOrderPage()
  })
})
