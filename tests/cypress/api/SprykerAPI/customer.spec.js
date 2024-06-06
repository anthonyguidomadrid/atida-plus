import { customersEndpoints } from '../../support/api/SprykerAPI/endpoints/customer'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import {
  CustomerData,
  Customer
} from '../../support/api/SprykerAPI/models/customer'
import { LoginData } from '../../support/api/SprykerAPI/models/login'
import 'cypress-localstorage-commands'
import { AccountType } from '../../support/enums/accountType'

describe('Creates customer API tests', () => {
  it('creates, gets and updates customer', () => {
    const randomNumber = Date.now()
    let emailAddress = `automation-${randomNumber}@gmail.com`
    let password = 'P@ssword1'
    let taxReference = 'A12345678'
    let accountType = AccountType.BUSINESS
    let company = 'Test company'
    let newTaxReference = 'B12345678'
    let newCompany = 'My new company name'
    let newAccountType = AccountType.PERSONAL

    let customerData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          email: emailAddress,
          password: password,
          confirmPassword: password
        })
      })
    })

    let updateCustomerData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          taxReference: newTaxReference,
          company: newCompany,
          accountType: newAccountType
        })
      })
    })

    customersEndpoints.createCustomer(customerData).then(response => {
      expect(response.status).to.eql(201)
      cy.setLocalStorage('customerReference', response.body.data.id)
    })

    customersEndpoints.loginCustomer(new LoginData(emailAddress, password))

    customersEndpoints.getCustomerInfo().then(response => {
      expect(response.status).to.eql(200)
      expect(response.body.data.attributes.taxReference).to.eql(taxReference)
      expect(response.body.data.attributes.accountType).to.eql(accountType)
      expect(response.body.data.attributes.company).to.eql(company)
    })

    customersEndpoints.updateCustomer(updateCustomerData).then(response => {
      expect(response.status).to.eql(200)
      expect(response.body.data.attributes.taxReference).to.eql(newTaxReference)
      expect(response.body.data.attributes.accountType).to.eql(newAccountType)
      expect(response.body.data.attributes.company).to.eql(newCompany)
    })
  })
})
