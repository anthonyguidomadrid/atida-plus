import { addToBasket } from '../components/addToBasket'

export class BasketPage {
  constructor() {
    this.backButtonId = '[data-testid="backButton"]'
    this.headerNumberOfItemsId = '[data-testid="basketHeaderNumberOfItems"]'
    this.basketHeaderId = '[data-testid="basketHeader"]'
    this.basketHeaderTotalId = '[data-testid="basketHeaderTotal"]'
    this.basketHeaderTitleId = '[data-testid="pageWrapper"] header h1'
    this.emtpyBasketContentTitleId = '[data-testid="pageWrapper"] main h2'
    this.emtpyBasketContentTextId =
      '[data-testid="pageWrapper"] main .items-center p'
    this.emtpyBasketContentLinkId =
      '[data-testid="pageWrapper"] main .items-center a'
    this.basketProductTileId = '[data-testid="basketProductTile"]'
    this.basketProductQuantityId = '[data-testid="quantityInput"]'
    this.basketProductTileTitleId = '[data-testid="basketProductTile"] h2'
    this.basketProductTilePrice = '[data-testid="basketProductTilePrice"]'
    this.basketProductTileImageId = '[data-testid="basketProductTile"] a img'
    this.basketProductTileAvailability =
      '[data-testid="basketProductTileAvailability"]'
    this.basketProductListId = '[data-testid="pageWrapper"] main ul'
    this.basketSummaryId = '[data-testid="basketSummary"]'
    this.basketSummaryTotalId = '[data-testid="total"]'
    this.basketOrderButtonId = '[data-testid="basketSummaryOrderButton"]'
    this.basketCouponDropdownButtonId =
      '[data-testid="basketSummary"] [data-testid="dropdownWithContent"]'
    this.basketCouponInputId =
      '[data-testid="couponFormField"] [data-testid="inputContainer"] input'
    this.basketCouponButtonId = '[data-testid="redeemCouponFormButton"]'
    this.basketCouponValidationError =
      '[data-testid="basketSummary"] [role="alert"]'
    this.basketRemoveProductButtonId =
      '[data-testid="basketProductTileRemoveButton"]'
    this.quantityCounterDivId =
      '[data-testid="basketProductModal"] [data-testid="quantitySelector"] [data-testid="quantityInput"]'
    this.shippingId = '[data-testid="shipping"]'
    this.warningBox = '[data-testid="notification"]'
    this.basketHeaderOrderButton = '[data-testid="basketHeaderOrderButton"]'
    this.productSummaryTotalProductsId = '[data-testid="total-products"]'
    this.basketCouponOrderSummaryId = '[data-testid="coupon"] > p'
    this.basketCouponAreaId = '[data-testid="coupons"]'
    this.basketSumaryRemoveCouponId = '[data-testid^="removeCouponButton"]'
    this.basketPageIncreaseButtonId =
      '[data-testid="quantitySelector"] [data-testid="increaseQuantityButton"]'
  }

  getProductsTotalCount(expectedCount) {
    cy.get(basketPage.headerNumberOfItemsId).should('contain', expectedCount)
  }

  getBasketHeader(productCount = 0, grandTotalPrice = 0) {
    cy.get(this.backButtonId).should('be.visible')
    this.getProductsTotalCount(productCount)

    cy.get(this.basketHeaderTotalId)
      .should('be.visible')
      .should('contain', grandTotalPrice)

    cy.checkElementTextIsNotEmpty(this.basketHeaderTitleId)
  }

  getEmptyBasketContent() {
    cy.checkElementTextIsNotEmpty(this.emtpyBasketContentTitleId)
    cy.checkElementTextIsNotEmpty(this.emtpyBasketContentTextId)
    cy.get(this.emtpyBasketContentLinkId)
      .should('be.visible')
      .and('have.attr', 'href')
  }

  getBasketSummaryBlock(subTotal, totalPrice, locale = 'pt-PT') {
    const subTotal = (subTotal / 100).toLocaleString(locale)
    const totalValue = (totalPrice / 100).toLocaleString(locale)

    cy.get(this.basketSummaryId)
      .should('be.visible')
      .find(this.basketOrderButtonId)
      .should('be.enabled')
    cy.get(this.basketSummaryTotalId).should('be.visible').contains(totalValue)
    cy.get(this.productSummaryTotalProductsId)
      .should('be.visible')
      .contains(subTotal)
  }

  getBasketSummaryCouponBlock() {
    cy.get(this.basketCouponDropdownButtonId).should('be.visible').click()
    cy.get(this.basketCouponInputId).should('be.visible').and('be.empty')
    cy.get(this.basketCouponButtonId).should('be.disabled')
  }

  getProductListItemsCount(listItemsCount) {
    cy.get(this.basketProductListId)
      .find(this.basketProductTileId)
      .should('have.length', listItemsCount)
  }

  changeProductQuantity(quantity) {
    cy.get(this.basketHeaderOrderButton).scrollIntoView({ duration: 700 })
    cy.get(this.basketProductQuantityId).click().type(quantity)
  }

  verifyProductTitle(productTitle) {
    cy.get(this.basketProductTileId)
      .find('h2 a')
      .first()
      .should('have.text', productTitle)
  }

  verifyShippingCost(shippingCostValue) {
    cy.get(this.shippingId).find('span').contains(shippingCostValue)
  }

  removeAllProducts() {
    cy.intercept('/api/basket/remove').as('basketRemove')
    cy.get(this.basketHeaderId)
    cy.get('main').then($main => {
      if ($main.find(this.basketProductTileId).length) {
        cy.get(this.basketRemoveProductButtonId).click({
          multiple: true
        })
        cy.wait('@basketRemove').its('response.statusCode').should('eql', 200)
      }
    })
  }

  addProductInBasket() {
    cy.intercept('POST', '/api/basket/add').as('basketAdd')
    cy.get(addToBasket.addToBasketButton).first().click()
    cy.wait('@basketAdd').its('response.statusCode').should('eql', 200)
  }

  clickOnOrderButton(url) {
    cy.get(this.basketOrderButtonId).should('be.visible').click()
    cy.url().should('contain', url)
  }
  checkAvailabilityLabel(availabilityStatus) {
    const cssClass =
      availabilityStatus === 'AVAILABLE'
        ? 'text-feedback-success'
        : 'text-feedback-error'
    cy.get(this.basketProductTileAvailability)
      .should('be.visible')
      .and('have.class', cssClass)
  }

  checkProductUnavailability(availabilityStatus) {
    cy.checkElementTextIsNotEmpty(this.warningBox)
    cy.get(this.basketHeaderOrderButton).should('be.disabled')
    cy.get(this.basketOrderButtonId).should('be.disabled')
    this.checkAvailabilityLabel(availabilityStatus)
  }
  getBasketProductTile(
    index,
    productName,
    unitPrice,
    imageSrc,
    availabilityStatus
  ) {
    cy.findListSelector(index, this.basketProductListId, 'h2').should(
      'contain',
      productName
    )
    cy.findListSelector(
      index,
      this.basketProductListId,
      this.basketProductTilePrice
    ).should('contain', unitPrice)

    cy.findListSelector(index, this.basketProductListId, 'img')
      .invoke('attr', 'src')
      .should('contain', imageSrc)
    this.checkAvailabilityLabel(availabilityStatus)
  }

  fillInVoucherCode(codeName) {
    cy.get(this.basketCouponDropdownButtonId).click()
    cy.fillInTextField(this.basketCouponInputId, codeName)
    cy.get(this.basketCouponButtonId).click()
    cy.get(this.basketCouponOrderSummaryId)
      .should('be.visible')
      .and('contain', codeName)
    cy.get(this.basketCouponAreaId)
      .should('be.visible')
      .and('contain', codeName)
  }
  removeAddedVoucherCode() {
    cy.get(this.basketSumaryRemoveCouponId).should('be.visible').click()
    cy.get(this.basketCouponOrderSummaryId).should('not.exist')
    cy.get(this.basketCouponAreaId).should('not.exist')
    cy.get(this.basketCouponInputId).should('be.visible').and('be.empty')
  }
}

export const basketPage = new BasketPage()
