export class OrderConfirmationPage {
  constructor() {
    this.viewOrderButtonId = '[data-testid="confirmationViewOrder"]'
  }

  openOrderDetailsPage() {
    cy.get(this.viewOrderButtonId).click()
  }
}

export const orderConfirmationPage = new OrderConfirmationPage()
