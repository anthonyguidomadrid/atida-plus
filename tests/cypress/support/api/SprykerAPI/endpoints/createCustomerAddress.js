const glueApiUrl =
  Cypress.env('locale') == 'es'
    ? Cypress.env('glueEsApiUrl')
    : Cypress.env('glueApiUrl')

export class CreateCutomerAddressEndpoints {
  createCustomerAddress(body) {
    return cy.getLocalStorage('customerReference').then(reference => {
      return cy.postAuthRequest(
        `${glueApiUrl}customers/${reference}/addresses`,
        body
      )
    })
  }
}

export const createCutomerAddressEndpoints = new CreateCutomerAddressEndpoints()
