import { addToBasket } from '../../components/addToBasket'

export class FavouritesPage {
  constructor() {
    this.favouritesProductListId = '[data-testid="favouritesProductList"]'
    this.backButtonId = '[data-testid="backButton"]'
    this.headerActionsFavouritesId = '[data-testid="headerActionsFavorites"]'
    this.removeFromFavouritesId = '[data-testid="removeFromFavouritesButton"]'
    this.addToBasketButtonId = '[data-testid="addToBasketButton"]'
    this.productTileId = '[data-testid="productCard"]'
    this.productTileLabelsId = '[data-testid="productTileLabels"]'
    this.productTileLabelsListId = '[data-testid="productLabelList"]'
    this.productTilePriceId = '[data-testid="productTilePrice"]'
    this.productTileavailabilityId = '[data-testid="productTileAvailability"]'
    this.noFaivoritesPinnedText = 'main h2'
    this.noFaivoritesPinnedDescriptionText = 'main p'
    this.productTileLinkId = '[data-testid="productTileLink"]'
    this.productTileTitle = '[data-testid="productTitle"]'
    this.emptyPagePinIcon = 'main section svg'
    this.emptyPageHeader = 'main section h2'
    this.emptyPageText = 'main section p'
    this.continueShoppingButton = 'main section button'
    this.addToBasketControlsId = '[data-testid="addToBasketControls"]'
  }

  clickRemoveButton() {
    // eslint-disable-next-line cypress/no-force
    cy.get(this.productTileId)
      .should('be.visible')
      .find(this.removeFromFavouritesId)
      .should('be.visible')
      .click({ force: true })
  }

  clickAddToBasketButton() {
    // eslint-disable-next-line cypress/no-force
    cy.get(this.favouritesProductListId)
      .should('be.visible')
      .find(addToBasket.addToBasketButton)
      .click({ force: true })
  }

  getNumberOfProducts() {
    return cy.get(this.favouritesProductListId).should('be.visible').first('p')
  }

  getProductTitle() {
    return cy.get(this.productTileId).find(this.productTileTitle)
  }

  verifyEmptyFavouritesPageIsDisplayed() {
    cy.get(favouritesPage.noFaivoritesPinnedText).should('be.visible')
    cy.get(favouritesPage.noFaivoritesPinnedDescriptionText).should(
      'be.visible'
    )
    cy.get(favouritesPage.emptyPagePinIcon).should('be.visible')
    cy.get(favouritesPage.emptyPageHeader).should('be.visible')
    cy.get(favouritesPage.emptyPageText).should('be.visible')
    cy.get(favouritesPage.continueShoppingButton).should('be.visible')
  }
}

export const favouritesPage = new FavouritesPage()
