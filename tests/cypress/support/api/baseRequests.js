Cypress.Commands.add('postRequest', (url, body, headers = {}) => {
  return cy.request({
    method: 'POST',
    url: url,
    body: body,
    headers: headers,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('patchRequest', (url, body) => {
  cy.getLocalStorage('identity_token').then(token => {
    const authorization = `Bearer ${token}`
    return cy.request({
      method: 'PATCH',
      url: url,
      headers: {
        authorization: authorization
      },
      body: body
    })
  })
})

Cypress.Commands.add('postAuthRequest', (url, body) => {
  cy.getLocalStorage('identity_token').then(token => {
    const authorization = `Bearer ${token}`
    return cy.request({
      method: 'POST',
      url: url,
      headers: {
        authorization: authorization
      },
      body: body
    })
  })
})

Cypress.Commands.add('getRequest', url => {
  cy.getLocalStorage('identity_token').then(token => {
    const authorization = `Bearer ${token}`
    return cy.request({
      method: 'GET',
      url: url,
      headers: {
        authorization: authorization
      }
    })
  })
})
