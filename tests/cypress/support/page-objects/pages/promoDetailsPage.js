import { addToBasket } from '../components/addToBasket'

export class PromoDetailsPage {
  constructor() {
    this.promoHeader = '[data-testid="promotionHeader"]'
    this.productTile = '[data-testid="productCard"]'
    this.quantitySelector = '[data-testid="quantitySelector"]'
    this.quantitySelectorInput = '[data-testid="quantityInput"]'
    this.totalCount = '[data-testid="productSearchTotalCount"]'
    this.gridListButton = '[data-testid="gridListButton"]'
    this.paginationBlock = '[data-testid="infinitePagination"]'
    this.productsGrid = '[data-testid="oneRowProductGrid"]'
    this.pdpLayout = '[data-testid="pdpLayout"]'
  }

  assertPromotionTitleIsCorrect(title) {
    cy.get(this.promoHeader).find('h1').should('have.text', title)
  }

  assertNumberOfPromoProductsIsCorrect(numberOfProducts) {
    cy.get(this.productTile).should('have.length.at.least', numberOfProducts)
  }

  clickProductTile() {
    cy.get(this.productTile).first().click()
  }

  assertMainComponentsAreDisplayed() {
    cy.get(this.promoHeader).should('be.visible')
    cy.get(this.promoHeader).find('picture').should('be.visible')
    cy.get(this.promoHeader).find('h1').invoke('text').should('not.be.empty')
    cy.get(this.totalCount).invoke('text').should('not.be.empty')
    cy.get(this.productTile).should('be.visible')
    cy.get(this.gridListButton).should('be.visible')
    cy.get(this.paginationBlock).should('be.visible')
    cy.get(this.productsGrid).should('be.visible')
  }

  assertPdpIsLoaded() {
    cy.get(this.pdpLayout).find('h1').should('be.visible')
    cy.get(this.pdpLayout)
      .find(addToBasket.addToBasketButton)
      .should('be.visible')
  }
}

export const promoDetailsPage = new PromoDetailsPage()
