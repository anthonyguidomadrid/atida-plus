export class PromotionsOverviewPage {
  constructor() {
    this.promotionTeaser = '[data-testid="promotionTeaser"]'
    this.pageHeader = '[data-testid="mainSectionHeader"]'
    this.filter = '[data-testid="filter"]'
    this.totalNumberOfPromotions = 'p.text-primary-oxford-blue.text-center'
    this.pagination = '[data-testid="infinitePagination"]'
    this.paginationProductCount =
      '[data-testid="infinitePaginationProductCount"]'
  }

  openFirstPromotionDetailPage() {
    cy.get(this.promotionTeaser).first().click()
  }

  assertPageMainComponentsAreDisplayed() {
    cy.get(this.pageHeader).find('h1').invoke('text').should('not.be.empty')
    cy.get(this.filter)
      .eq(0)
      .find('input')
      .its('length')
      .should('be.at.least', 1)
    cy.get(this.filter)
      .eq(1)
      .find('input')
      .its('length')
      .should('be.at.least', 1)
    cy.get(this.totalNumberOfPromotions).invoke('text').should('not.be.empty')
    cy.get(this.promotionTeaser)
      .should('be.visible')
      .its('length')
      .should('be.at.least', 1)
    cy.get(this.pagination)
      .find(this.paginationProductCount)
      .invoke('text')
      .should('not.be.empty')
  }
}

export const promotionsOverviewPage = new PromotionsOverviewPage()
