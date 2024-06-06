const glueApiUrl =
  Cypress.env('locale') == 'es'
    ? Cypress.env('glueEsApiUrl')
    : Cypress.env('glueApiUrl')

export class CustomersEndpoints {
  createCustomer(body, url = glueApiUrl, headers = {}) {
    return cy.postRequest(`${url}customers`, body, headers)
  }

  loginCustomer(body) {
    return cy.postRequest(`${glueApiUrl}access-tokens`, body).then(response => {
      expect(response.status).to.eql(201)
      expect(response.body.data.attributes.tokenType).to.eql('Bearer')
      expect(response.body.data.attributes.accessToken).to.not.eql('')
      expect(response.body.data.attributes.refreshToken).to.not.eql('')
      cy.setLocalStorage(
        'identity_token',
        response.body.data.attributes.accessToken
      )
    })
  }

  getCustomerInfo() {
    return cy.getLocalStorage('customerReference').then(reference => {
      return cy.getRequest(`${glueApiUrl}customers/${reference}`)
    })
  }

  updateCustomer(body) {
    return cy.getLocalStorage('customerReference').then(reference => {
      return cy.patchRequest(`${glueApiUrl}customers/${reference}`, body)
    })
  }
}

export const customersEndpoints = new CustomersEndpoints()
