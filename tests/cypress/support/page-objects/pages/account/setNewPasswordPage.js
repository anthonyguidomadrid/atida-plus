export class SetNewPasswordPage {
  constructor() {
    this.passwordInputId = '[data-testid="newPasswordFormPassword"] input'
    this.repeatPasswordInputId =
      '[data-testid="newPasswordFormRePassword"] input'
    this.resetPasswordButtonId = '[data-testid="newPasswordFormButton"]'
    this.cancelLinkId = '[data-testid="passwordForgottenCancel"]'
    this.errorPasswordMessageId = '#password_error'
    this.errorRepeatPasswordMessageId = '#rePassword_error'
    this.notificationId = '[data-testid="notification"]'
    this.emailGreenDivId = '[data-testid="userEmail"]'
  }

  fillInSetNewPasswordForm(password) {
    cy.fillInTextField(this.passwordInputId, password)
    cy.get('form').submit()
  }
}

export const setNewPasswordPage = new SetNewPasswordPage()
