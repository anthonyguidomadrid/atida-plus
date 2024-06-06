import { accountDetailsPage } from '../../support/page-objects/pages/account/accountDetailsPage'
import { accountOverviewPage } from '../../support/page-objects/pages/account/accountOverviewPage'
import { accountOrdersHistoryPage } from '../../support/page-objects/pages/account/accountOrdersHistoryPage'
import { accountOrdersDetailsPage } from '../../support/page-objects/pages/account/accountOrderDetailsPage'
import { header } from '../../support/page-objects/components/header'
import { basketPage } from '../../support/page-objects/pages/basketPage'
import { DbHelper } from '../../support/db.helper'
import { SuiteTag } from '../../support/enums/suiteTag'
import { Address } from '../../support/api/SprykerAPI/models/address'
import {
  Customer,
  CustomerData
} from '../../support/api/SprykerAPI/models/customer'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { customersEndpoints } from '../../support/api/SprykerAPI/endpoints/customer'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import { skipOn } from '@cypress/skip-test'
const dbhelper = new DbHelper()
const resolutions = ['samsung-s10-plus', 'iphone-se', 'ipad-pro', 'full-hd']
const locale = 'pt-PT'
const apiUrl = Cypress.env('apiUrl')
let dbQuery
const faker = require('faker')
let emailAddress
let password
let firstName
let lastName
let phone
let customerData
let address
describe('Basic account pages', () => {
  before(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@atida.com`
    password = 'P@ssword1'
    firstName = faker.name.firstName()
    lastName = faker.name.lastName()
    phone = faker.phone.phoneNumberFormat()

    address = new Address({
      firstName: firstName,
      lastName: lastName,
      phone: phone
    })

    customerData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          firstName: firstName,
          lastName: lastName,
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
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(
      'atida-plus-jwt',
      'atida-plus-refresh-token',
      'atida-plus-customer',
      'ajs_anonymous_id'
    )
    cy.visit('/')
    cy.checkFlag(addToBasket.basketNotificationFF).as('basketNotificationFF')
  })

  after(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it('#476 Should display account details page', () => {
    const data = {
      email: emailAddress,
      name: `${firstName} ${lastName}`,
      phone: phone
    }

    header.clickLinkFromAccounMenu(header.accountMenuDetailsLinkId)
    cy.url().should('contain', '/account/details')

    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      accountDetailsPage.getPersonalDetailsBlock(data)
      // cy.get(accountDetailsPage.orderStatusUpdatedCheckboxId).should(
      //   'be.disabled'
      // )
      // cy.get(accountDetailsPage.personalRecommendationsCheckboxId).should(
      //   'not.be.checked'
      // )
      // cy.get(accountDetailsPage.pinnedProductsNotificationsCheckboxId).should(
      //   'not.be.checked'
      // )
    })
  })

  it('#477 Should display account overview page', () => {
    const data = {
      name: `${firstName} ${lastName}`,
      address: address.address1
    }
    header.clickLinkFromAccounMenu(header.accountMenuOverviewLinkId)
    cy.url().should('contain', '/account')
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      accountOverviewPage.getAccountDetailsPanel(data)
      cy.get(accountOverviewPage.accountOverviewHeaderId).should(
        'contain',
        firstName
      )
    })
  })

  it(
    [SuiteTag.SMOKE],
    '#478 Should display account order history page with no orders',
    () => {
      cy.intercept('GET', `${apiUrl}account/order-history`, req => {
        delete req.headers['if-none-match']
      }).as('getOrderHistory')
      header.clickLinkFromAccounMenu(header.accountMenuHistoryLinkId)
      cy.wait('@getOrderHistory')
        .its('response.statusCode')
        .should('be.eql', 200)
      cy.url().should('contain', '/account/order-history')
      resolutions.forEach(resolution => {
        cy.viewportPreset(resolution)
        accountOrdersHistoryPage.getNoOrdersBlock()
      })
    }
  )

  it('#911 Checkout button should be visible in account details if there are products in the basket', () => {
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    dbhelper.buildAndGetProdUrlSlugByIds(1024, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    basketPage.addProductInBasket()
    addToBasket.verifyModalSuccess()
    cy.get('@basketNotificationFF').then(basketNotificationFF => {
      skipOn(basketNotificationFF === true, () => {
        addToBasket.closeMinicart()
      })
    })
    accountDetailsPage.visitPersonalDetailsPage()
    accountDetailsPage.confirmPersonalDetails()
    accountDetailsPage.clickGoTocheckoutButton()
    accountDetailsPage.verifyGoTocheckoutButton()
  })
})

describe([SuiteTag.SMOKE], 'Order page with existing orders', () => {
  before(() => {
    cy.fixture('auth').then(user => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}account/login`,
        body: {
          email: user.email,
          password: user.password
        }
      })
        .its('status')
        .should('eql', 200)

      dbQuery = dbhelper.buildAndGetLastOrderByEmail(user.email)
    })
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(
      'atida-plus-jwt',
      'atida-plus-refresh-token',
      'atida-plus-customer',
      'ajs_anonymous_id'
    )
    cy.viewportPreset('ipad-pro')
    cy.visit('/')
    cy.intercept('GET', '/api/account/order-history', req => {
      delete req.headers['if-none-match']
    }).as('getOrderHistory')
    header.clickLinkFromAccounMenu(header.accountMenuHistoryLinkId)
    cy.wait('@getOrderHistory').its('response.statusCode').should('eql', 200)
    cy.url().should('contain', '/account/order-history')
  })

  it('#480 Should display correct order info on order history page', () => {
    dbQuery.then(rowData => {
      const price = (rowData.rows[0].grand_total / 100).toLocaleString(locale)
      const orderData = {
        date: new Date(rowData.rows[0].created_at).getDate(),
        number: rowData.rows[0].order_reference,
        price: price
      }
      resolutions.forEach(resolution => {
        cy.viewportPreset(resolution)
        accountOrdersHistoryPage.getLastOrderData(orderData)
      })
    })
  })

  it('#481 Should displays correct order info on order details page', () => {
    dbQuery.then(rowData => {
      const price = (rowData.rows[0].grand_total / 100).toLocaleString(locale)
      const orderData = {
        date: new Date(rowData.rows[0].created_at).getDate(),
        number: rowData.rows[0].order_reference,
        price: price,
        productName: rowData.rows[0].name
      }
      cy.visit(`account/order-history/${orderData.number}`)
      resolutions.forEach(resolution => {
        cy.viewportPreset(resolution)
        accountOrdersDetailsPage.getOrderData(orderData)
      })
    })
  })
})
