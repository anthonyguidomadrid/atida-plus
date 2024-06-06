const glueApiUrl =
  Cypress.env('locale') == 'es'
    ? Cypress.env('glueEsApiUrl')
    : Cypress.env('glueApiUrl')

export class ForgottenPasswordEndpoints {
  sendForgottenPasswordRequest(body, url = glueApiUrl, headers = {}) {
    return cy.postRequest(`${url}customer-forgotten-password`, body, headers)
  }
}

export const forgottenPasswordEndpoints = new ForgottenPasswordEndpoints()
