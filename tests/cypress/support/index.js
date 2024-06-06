import './commands'
import './routes'
import './api/baseRequests'
import '@cypress/skip-test/support'

Cypress.Cookies.defaults({
  preserve: [
    'OptanonAlertBoxClosed',
    'AWSELBAuthSessionCookie-0',
    'AWSELBAuthSessionCookie-1',
    'countrySelectorHeaderData'
  ]
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // temporary hack due to Exponea error
  if (err.message.includes('Invalid type of argument 0')) {
    return false
  }
  //temporary hack due to NewRelic JS agent incompatibility
  if (
    err.message.includes(
      "Cannot read properties of undefined (reading 'length')"
    ) ||
    err.message.includes("Cannot read property 'length' of undefined")
  ) {
    return false
  }

  if (err.message.includes("Unexpected token '<'")) {
    return false
  }

  //temporary hack for UAT
  if (err.message.includes('Script error')) {
    return false
  }
  if (
    err.message.includes(
      'badgeContent?.childNodes[1]?.setAttribute is not a function'
    )
  ) {
    return false
  }

  if (
    err.message.includes(
      "Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'."
    )
  ) {
    return false
  }

  if (err.message.includes('e.initTrustedShopsBadge is not a function')) {
    return false
  }

  if (err.message.includes('window.initTrustedShopsBadge is not a function')) {
    return false
  }

  if (err.message.includes('Request failed with status code 401')) {
    return false
  }

  if (err.message.includes('c.at is not a function')) {
    return false
  }

  if (
    err.message.includes(" Cannot read properties of null (reading 'document')")
  ) {
    return false
  }

  if (err.message.includes('Minified React error')) {
    return false
  }
})

before(() => {
  cy.request('/').then(resp => {
    if (resp.redirects && resp.redirects[0].includes('amazoncognito.com')) {
      const cognitoDomain =
        'alb-users-atida-identity.auth.eu-central-1.amazoncognito.com'
      const cognitoLoginPath = Cypress.$(resp.body).find('form').attr('action')
      const cognitoLoginUrl = `https://${cognitoDomain}${cognitoLoginPath}`
      const cognitoCsrf = Cypress.$(resp.body)
        .find('form input[name="_csrf"]')
        .attr('value')
      cy.fixture('auth').then(auth => {
        cy.request({
          method: 'POST',
          url: cognitoLoginUrl,
          form: true,
          body: {
            _csrf: cognitoCsrf,
            username: auth.cognitoUser,
            password: auth.cognitoPassword
          }
        })
      })
    }
  })

  const isoDateString = new Date().toISOString()
  cy.setCookie('OptanonAlertBoxClosed', isoDateString)

  const cypressLocale = `${Cypress.env('locale')}-${Cypress.env('locale')}`
  cy.setCookie(
    'countrySelectorHeaderData',
    `{%22selectedCountry%22:%22${cypressLocale}%22%2C%22languageSwitched%22:false}`
  )
})
