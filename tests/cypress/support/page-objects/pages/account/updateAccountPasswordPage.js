export class UpdateAccountPasswordPage {
  constructor() {
    this.updatePasswordInputId = '[data-testid="loginFormPassword"] input'
    this.updateNewPasswordInputId =
      '[data-testid="newPasswordFormPassword"] input'
    this.confirmNewPasswordButtonId =
      '[data-testid="confirmNewPasswordFormPassword"] input'
    this.updatePasswordFormId = '[data-testid="UpdatePasswordForm"]'
    this.updatePasswordButtonId = '[data-testid="UpdatePasswordFormButton"]'
    this.updatePasswordError = '#password_error'
    this.updateNewPasswordError = '#newPassword_error'
    this.errorNotificationId = '[data-testid="notification"]'
  }

  fillInUpdatePasswordForm(data) {
    cy.get(this.updatePasswordFormId).should('be.visible')
    cy.fillInTextField(this.updatePasswordInputId, data.password)
    cy.fillInTextField(this.updateNewPasswordInputId, data.newPassword)
    cy.get(this.updatePasswordButtonId).click()
  }
}

export const updateAccountPasswordPage = new UpdateAccountPasswordPage()
