import { addToBasket } from '../components/addToBasket'

export class PDP {
  constructor() {
    this.pdpHeader = '[data-testid="pageWrapper"] main header'
    this.pdpKeyInfo = 'aside[aria-live="assertive"]'
    this.pdpGeneralPrice = '[data-testid="productPrice"]'
    this.pdpSinglePrice = '[data-testid="pricePrice"]'
    this.pdpPriceRrp = '[data-testid="priceRRP"]'
    this.pdpPricePricePerUnit = '[data-testid="pricePricePerUnit"]'
    this.pdpAccordionBlock = '[data-testid="productAccordion"]'
    this.addToFavouritesButton = '[data-testid="saveToFavouritesButton"]'
    this.productTitle = '[data-testid="pdpLayout"] h1'
    this.imageGallery = '[data-testid="gallery"]'
    this.recommendationsTitle = '[data-testid="recommendationTitle"]'
    this.recommendationsProductGrid = '[data-testid="recommendationBlock"]'
    this.productTile = '[data-testid="productCard"]'
    this.productTileImage = '[data-testid="productCardLink"] img'
    this.productTileTitle =
      '[data-testid="productCardLink"] [data-testid="productTitle"]'
    this.productTilePrice = '[data-testid="productCardPrice"]'
  }

  getProductHeader() {
    cy.checkElementTextIsNotEmpty(this.pdpHeader)
    cy.get(this.pdpHeader)
      .should('be.visible')
      .find('h1')
      .should('not.be.empty')
  }

  getProductPrice() {
    cy.checkElementTextIsNotEmpty(this.pdpGeneralPrice)
    cy.checkElementTextIsNotEmpty(this.pdpSinglePrice)
    cy.checkElementTextIsNotEmpty(this.pdpPriceRrp)
    cy.checkElementTextIsNotEmpty(this.pdpPricePricePerUnit)
  }

  getPdpDetailsBlock() {
    cy.get(this.pdpAccordionBlock)
      .should('be.visible')
      .find('details')
      .then(accordionBlocks => {
        cy.wrap(accordionBlocks).its('length').should('be.equal', 4)
      })
  }

  getProductGallery() {
    cy.get(this.imageGallery)
      .find('img')
      .first()
      .should('be.visible')
      .and('have.class', 'cursor-zoom-in')
      .click()
      .should('have.class', 'cursor-zoom-out')
  }

  getPdpRecommendations() {
    cy.scrollTo('bottom', { duration: 500 })
    cy.get(this.recommendationsProductGrid)
      .last()
      .scrollIntoView({ duration: 200 })

    cy.get(this.recommendationsProductGrid)
      .find(this.productTile)
      .should('have.length.gte', 1)
      .first()
      .within(() => {
        cy.get(this.productTileImage).its('length').should('eql', 1)
        cy.get(this.productTilePrice).its('length').should('eql', 1)
        cy.get(this.productTileTitle).its('length').should('eql', 1)
        cy.get(addToBasket.addToBasketButton).should('be.visible')
      })
  }

  addProductToBasket() {
    cy.get(this.pdpKeyInfo).find(addToBasket.addToBasketButton).first().click()
  }

  addEnabledProductToBasket() {
    cy.get(addToBasket.addToBasketEnabledButton).first().click()
  }

  addProductToFavorites() {
    cy.get(this.addToFavouritesButton).click()
  }

  addFirstActiveRecommendedProductToBasket() {
    cy.get(this.recommendationsProductGrid)
      .find(this.productTile)
      .find(addToBasket.addToBasketEnabledButton)
      .first()
      .click()
  }

  getAddToBasketProductCount(quantity) {
    cy.get(this.productTile)
      .find(addToBasket.quantitySelector)
      .first()
      .find(addToBasket.quantitySelectorInput)
      .should('have.value', quantity)
  }
}

export const pdp = new PDP()
