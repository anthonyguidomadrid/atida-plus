const {
  customersEndpoints
} = require('../../support/api/SprykerAPI/endpoints/customer')
const { Addresses } = require('../../support/api/SprykerAPI/models/addresses')
const { Attributes } = require('../../support/api/SprykerAPI/models/attributes')
const {
  CustomerData,
  Customer
} = require('../../support/api/SprykerAPI/models/customer')
const { DbHelper } = require('../../support/db.helper')
const { header } = require('../../support/page-objects/components/header')
const {
  loginPage
} = require('../../support/page-objects/pages/account/loginPage')
const { homepage } = require('../../support/page-objects/pages/homepage')
const dbhelper = new DbHelper()

let customerData

describe('Browser back button', () => {
  beforeEach(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@atida.com`
    password = 'P@ssword1'

    customerData = new CustomerData({
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
    cy.visit('login')
    cy.viewport('macbook-13')
    loginPage.loginUser(emailAddress, password)
    homepage.getCategoryBlock(7)
  })

  afterEach(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it(
    [SuiteTag.SMOKE],
    '#874 Clicking on the browser back button should not logout the user',
    () => {
      cy.go('back')
      homepage.getCategoryBlock(7)

      header.assertNameIsDisplayedInMenuButton(
        customerData.data.attributes.firstName
      )
    }
  )

  it(
    [SuiteTag.SMOKE],
    '#875 Clicking the browser back button after logout should not log in the customer',
    () => {
      header.clickLogoutButton()
      cy.go('back')
      homepage.getCategoryBlock(7)

      header.assertNameIsNotDisplayedInMenuButton(
        customerData.data.attributes.firstName
      )
    }
  )
})
