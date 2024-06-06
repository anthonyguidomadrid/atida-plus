export class LoginPage {
  constructor() {
    this.emailInputId = '[data-testid="loginFormEmail"] input'
    this.passwordInputId = '[data-testid="loginFormPassword"] input'
    this.loginButtonId = '[data-testid="loginFormButton"]'
    this.errorEmailMessageId = '#email_error'
    this.errorPasswordMessageId = '#password_error'
    this.notificatonWrapperId = '[data-testid="notification"]'
    this.guestCheckoutButton =
      '[data-testid="continueAsGuestStaticContentBlockButton"]'
    this.staticContentBlock =
      '[data-testid="newCustomerNotificationStaticContentBlock"]'
  }

  verifyLoginFormIsDisplayed() {
    cy.get(this.emailInputId).should('be.visible')
    cy.get(this.passwordInputId).should('be.visible')
    cy.get(this.loginButtonId).should('be.visible')
  }

  loginUser(email, password) {
    cy.intercept('POST', '/api/account/login').as('login')
    cy.login(loginPage.emailInputId, loginPage.passwordInputId, email, password)
    cy.wait('@login').its('response.statusCode').should('eql', 200)
  }

  loginWithFixturedUser(fixtureName = 'auth') {
    cy.fixture(fixtureName).then(user => {
      let email = Cypress.env('locale') == 'es' ? user.emailEs : user.email
      this.loginUser(email, user.password)
    })
  }

  continueAsGuest() {
    cy.get(this.staticContentBlock)
      .find('ul')
      .invoke('text')
      .should('not.be.empty')
    cy.get(this.guestCheckoutButton).should('be.visible')
    // eslint-disable-next-line cypress/no-force
    cy.get(this.guestCheckoutButton).click({ force: true })
  }

  loginMultipleTimes(email, password, attempts) {
    for (var i = 0; i < attempts; i++) {
      cy.login(this.emailInputId, this.passwordInputId, email, password)
    }
  }
}

export const loginPage = new LoginPage()
