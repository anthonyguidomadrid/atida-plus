export class ForgotPasswordPage {
  constructor() {
    this.emailInputId = '[data-testid="passwordForgottenFormEmail"] input'
    this.submitButtonId = '[data-testid="passwordForgottenFormButton"]'
    this.cancelLinkId = '[data-testid="passwordForgottenCancel"]'
    this.NotificationId = '[data-testid="notification"]'
    this.emailErrorId = '#email_error'
  }

  fillInForgotPasswordForm(email) {
    cy.fillInTextField(this.emailInputId, email)
    cy.get('form').submit()
  }
}

export const forgotPasswordPage = new ForgotPasswordPage()
