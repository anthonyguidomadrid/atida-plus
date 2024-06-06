import { DbHelper } from '../../support/db.helper'
import { FeatureTag } from '../../support/enums/featureTag'
import { SuiteTag } from '../../support/enums/suiteTag'
const {
  customersEndpoints
} = require('../../support/api/SprykerAPI/endpoints/customer')
const { Addresses } = require('../../support/api/SprykerAPI/models/addresses')
const { Attributes } = require('../../support/api/SprykerAPI/models/attributes')
const {
  Customer,
  CustomerData
} = require('../../support/api/SprykerAPI/models/customer')
const { AccountType } = require('../../support/enums/accountType')
const {
  businessDetailsPage
} = require('../../support/page-objects/pages/account/businessDetailsPage')
const {
  loginPage
} = require('../../support/page-objects/pages/account/loginPage')
const dbhelper = new DbHelper()
let emailAddress
let password
let customerData
const loginPageSlug = '/login'
const accountDetailsPageSlug = '/account/details'
const faker = require('faker')

describe([FeatureTag.ACCOUNT_DETAILS], 'Business account details tests', () => {
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
          addresses: new Addresses(),
          company: faker.company.companyName(),
          accountTypeBusiness: AccountType.BUSINESS
        })
      })
    })

    customersEndpoints.createCustomer(customerData).then(response => {
      expect(response.status).to.eql(201)
    })

    cy.visit(loginPageSlug)

    loginPage.loginUser(emailAddress, password)

    cy.visit(accountDetailsPageSlug)
  })
  afterEach(() => {
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })
  it(
    [SuiteTag.SMOKE],
    '#602, #587 Company name and tax reference should be visible',
    () => {
      businessDetailsPage.assertCompanyNameIsCorrect(
        customerData.data.attributes.company
      )
      businessDetailsPage.assertTaxReferenceIsCorrect(
        customerData.data.attributes.taxReference
      )
    }
  )
})
