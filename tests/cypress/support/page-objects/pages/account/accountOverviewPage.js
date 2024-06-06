export class AccountOverviewPage {
  constructor() {
    this.invoicesPanelId = '[data-testid="preferencePanelInvoices"]'
    this.returnsPanelId = '[data-testid="preferencePanelReturns"]'
    this.accountDetailsPanelId = '[data-testid="preferencePanelAccountDetails"]'
    this.accountOverviewHeaderId = 'main h1'
  }

  getAccountDetailsPanel(data) {
    cy.get(this.accountDetailsPanelId)
      .children()
      .first()
      .should('contain', data.name)
  }
}

export const accountOverviewPage = new AccountOverviewPage()
