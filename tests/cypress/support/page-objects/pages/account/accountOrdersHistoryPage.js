export class AccountOrdersHistoryPage {
  constructor() {
    this.accountOrderContainerId = '[data-testid="orderHistoryItem"]'
  }

  getLastOrderData(orderData) {
    cy.get('main section').find('h4').first().should('contain', orderData.date)

    cy.get('main section')
      .find(this.accountOrderContainerId)
      .first()
      .find('header')
      .should('contain', orderData.number)

    cy.get('main section')
      .find(this.accountOrderContainerId)
      .first()
      .find('header')
      .should('contain', orderData.price)

    cy.get('main section')
      .find(this.accountOrderContainerId)
      .first()
      .find('header')
      .contains(/paid|cancelled|payment failed|pending/g)
  }

  getNoOrdersBlock() {
    cy.checkElementTextIsNotEmpty('h3')
    cy.get(this.accountOrderContainerId).should('not.exist')
  }
}

export const accountOrdersHistoryPage = new AccountOrdersHistoryPage()
