import {
  checkoutPage,
  checkoutPage
} from '../../support/page-objects/pages/checkoutPage'
import { basketPage } from '../../support/page-objects/pages/basketPage'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import {
  Customer,
  CustomerData
} from '../../support/api/SprykerAPI/models/customer'

import { Address } from '../../support/api/SprykerAPI/models/address'
import { LoginData } from '../../support/api/SprykerAPI/models/login'
import { createCutomerAddressEndpoints } from '../../support/api/SprykerAPI/endpoints/createCustomerAddress'
import { CustomerAddressData } from '../../support/api/SprykerAPI/models/createCustomerAddress/customerAddress'
import { orderConfirmationPage } from '../../support/page-objects/pages/orderConfirmationPage'
import { accountOrdersDetailsPage } from '../../support/page-objects/pages/account/accountOrderDetailsPage'
import { SuiteTag } from '../../support/enums/suiteTag'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
const {
  customersEndpoints
} = require('../../support/api/SprykerAPI/endpoints/customer')
const { DbHelper } = require('../../support/db.helper')
const { FeatureTag } = require('../../support/enums/featureTag')
const {
  loginPage
} = require('../../support/page-objects/pages/account/loginPage')
const dbhelper = new DbHelper()

const faker = require('faker')
const pageUri = 'login'
let emailAddress
let password
const checkoutUri = 'checkout'
const confirmationUri = 'confirmation'
let deliveryAddress
let billingAddress

describe([FeatureTag.ORDER_DETAILS], 'Order details page', () => {
  beforeEach(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@gmail.com`
    password = 'P@ssword1'
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    deliveryAddress = new Address()
    billingAddress = new CustomerAddressData()

    let customerData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          email: emailAddress,
          password: password,
          confirmPassword: password,
          addresses: new Addresses({
            addresses: [deliveryAddress]
          })
        })
      })
    })

    customersEndpoints.createCustomer(customerData).then(response => {
      expect(response.status).to.eql(201)
      cy.setLocalStorage('customerReference', response.body.data.id)
    })

    customersEndpoints.loginCustomer(new LoginData(emailAddress, password))
    createCutomerAddressEndpoints.createCustomerAddress(billingAddress)

    cy.visit(pageUri)

    loginPage.loginUser(emailAddress, password)

    dbhelper.buildAndGetProdUrlSlugByIds(1024, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    addToBasket.addFirstActiveProductToTheBasket()
    addToBasket.clickViewBasketButton()
    basketPage.clickOnOrderButton(checkoutUri)

    cy.intercept('POST', '/api/checkout/create-order').as('createOrder')
  })

  afterEach(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it(
    [SuiteTag.SMOKE],
    '#731 #732 View correct billing and delivery address in order history',
    () => {
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
      let deliveryBlock =
        Cypress.env('locale') == 'es'
          ? checkoutPage.checkoutSpainStandardDeliveryBlockId
          : checkoutPage.checkoutStandardDeliveryBlockId

      checkoutPage.selectDeliveryMethod(deliveryBlock)
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

      orderConfirmationPage.openOrderDetailsPage()
      accountOrdersDetailsPage.assertDeliveryAddress(deliveryAddress)
      accountOrdersDetailsPage.assertBillingAddress(
        billingAddress.data.attributes
      )
    }
  )
})
