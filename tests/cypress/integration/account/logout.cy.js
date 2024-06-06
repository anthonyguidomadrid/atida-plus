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
const { SuiteTag } = require('../../support/enums/suiteTag')
const { header } = require('../../support/page-objects/components/header')
const {
  loginPage
} = require('../../support/page-objects/pages/account/loginPage')
const dbhelper = new DbHelper()

const pageUri = 'login'

describe([FeatureTag.LOGIN], 'Logout tests', () => {
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
          addresses: new Addresses()
        })
      })
    })

    customersEndpoints.createCustomer(customerData).then(response => {
      expect(response.status).to.eql(201)
    })

    cy.visit(pageUri)

    loginPage.loginUser(emailAddress, password)
  })

  afterEach(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it(
    [SuiteTag.SMOKE],
    '#533 Should not display personal information after logout',
    () => {
      const loginPageSlug = 'login/account'
      const headerLinks = [
        header.accountMenuOverviewLinkId,
        header.accountMenuHistoryLinkId,
        header.accountMenuHistoryLinkId,
        header.accountMenuAddressBookLinkId
      ]
      header.clickLogoutButton()
      cy.get(header.atidaLogo).first().should('be.visible')
      header.clickHeaderAtidaLogo()
      cy.getCookies().each(cookie => {
        expect([
          'atida-plus-jwt',
          'atida-plus-customer',
          'atida-plus-refresh-token'
        ]).not.to.include(cookie.name)
      })
      headerLinks.forEach(headerLink => {
        cy.get(headerLink).find('a').should('have.class', 'cursor-not-allowed')
      })
      cy.visit('account/details')
      cy.url().should('contain', loginPageSlug + '/details')
    }
  )
})
