export class Error404 {
  constructor() {
    this.pageHeading = 'main h1'
    this.pageIcon = '[data-testid="404PageIcon"]'
    this.backToHomeButton = '[data-testid="404PageButton"]'
  }

  visitError404Page(string) {
    cy.visit(string, {
      failOnStatusCode: false
    })
  }

  getPageHeading() {
    cy.get(this.pageHeading)
      .invoke('text')
      .should('not.eql', '404-page.title')
      .and('not.be.empty')
  }

  getPageIcon() {
    cy.get(this.pageIcon).should('be.visible')
  }

  clickBackToHomeButton() {
    cy.get(this.backToHomeButton).click()
  }

  getBackToHomeButton() {
    cy.get(this.backToHomeButton)
      .invoke('text')
      .should('not.eql', '404-page.back-button')
      .and('not.be.empty')
  }

  verifyRedirectToHomepage(string) {
    cy.url().should('equal', string)
  }
}
export const error404 = new Error404()
