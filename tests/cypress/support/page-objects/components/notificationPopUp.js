export class NotificationPopUp {
  constructor() {
    this.notificationModal = '[data-testid="notificationModalLayout"]'
    this.notificationPopUpConfirmationButton =
      '[data-testid="notificationModalLayoutConfirmButton"]'
  }

  clickConfirmationButton() {
    cy.log('here')
    cy.intercept('GET', '/api/account/get-customer*', req => {
      delete req.headers['if-none-match']
    }).as('getCustomer')
    cy.get(this.notificationModal)
      .should('be.visible')
      .find(this.notificationPopUpConfirmationButton)
      .click()
    cy.wait('@getCustomer').its('response.statusCode').should('eql', 200)
  }
}

export const notificationPopUp = new NotificationPopUp()
