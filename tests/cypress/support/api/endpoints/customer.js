const apiUrl = Cypress.env('apiUrl')

export class CustomerAPI {
  createCustomer(body, headerValue) {
    return cy.postRequest(`${apiUrl}account/create-customer`, body, {
      'accept-language': headerValue
    })
  }
}

export const customerAPI = new CustomerAPI()
