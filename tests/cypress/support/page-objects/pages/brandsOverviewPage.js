export class BrandOverviewPage {
  constructor() {
    this.pageHeader = '[data-testid="mainSectionHeader"]'
    this.brandsFilter = 'section.container ul'
    this.brandLetters = '[data-testid="tagLink"]'
    this.brandsList = 'main.container'
  }

  assertPageMainComponentsAreDisplayed(
    exampleBrandName = 'Nivea',
    exampleBrandSlug = '/nivea'
  ) {
    cy.get(this.pageHeader).find('h1').invoke('text').should('not.be.empty')
    cy.get(this.brandsFilter)
      .find(this.brandLetters)
      .should('be.visible')
      .its('length')
      .should('be.at.least', 20)
    cy.get(this.brandsList)
      .find('h3')
      .should('be.visible')
      .its('length')
      .should('be.at.least', 20)
    cy.get(this.brandsList)
      .contains(exampleBrandName)
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', exampleBrandSlug)
  }
}

export const brandsOverviewPage = new BrandOverviewPage()
