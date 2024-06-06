export class BDP {
  constructor() {
    this.productTile = '[data-testid="productCard"]'
    this.headerComponent = '[data-testid="mainSectionHeader"]'
    this.brandDescription = '[data-testid="SeoContentExpandable"]'
    this.sortingComponent = '.select.inline-flex'
    this.filterPricePanel = '[data-testid="filterPricePanel"]'
    this.filterCategory = '[data-testid="filterCategory0Panel"]'
    this.promoFilter = '[data-testid="promotionFilter"]'
    this.pagination = '[data-testid="infinitePagination"]'
    this.gridListButton = '[data-testid="gridListButton"]'
    this.productsListing = '[data-testid="productSearchList"]'
  }

  assertMainComponentsAreDisplayed() {
    cy.get(this.headerComponent).should('be.visible')
    cy.get(this.brandDescription).invoke('text').should('not.be.empty')
    cy.get(this.sortingComponent).should('be.visible')
    cy.get(this.filterPricePanel).should('be.visible')
    cy.get(this.filterCategory).should('be.visible')
    cy.get(this.promoFilter).should('exist')
    cy.get(this.pagination).should('be.visible')
    cy.get(this.gridListButton).should('be.visible')
    cy.get(this.productsListing).should('be.visible')
  }
}

export const bdp = new BDP()
