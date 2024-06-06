import { addToBasket } from '../components/addToBasket'

export class Homepage {
  constructor() {
    this.heroBanner = '[data-testid="heroBanner"]'
    this.heroBannerSearch = '[data-testid="autoComplete"]'
    this.contactBlock = '[data-testid="ctaIcon"]'
    this.contactBlockButton = '[data-testid="contentWithImageButton"]'
    this.contactBlockDivs = '[data-testid="ctaIcon"] div'
    this.categoryBlock = '[data-testid="categorySlider"]'
    this.categoryBlockList = '[data-testid="swiperSlidesWrapper"]'
    this.uspBlock = '[data-testid$="USP"]'
    this.bannerText = '[data-testid="heroBanner"] h2'
    this.bannerRightText = '[data-testid="heroBanner"] .text-right'
    this.contactBlockTitle = '[data-testid="ctaIcon"] h2'
    this.textLink = '[data-testid="textLink"]'
    this.saveToFavourteButton = '[data-testid="saveToFavouritesButton"]'
    this.recommendationBlock = '[data-testid="exponeaRecommendationBlock"]'
    this.recommentationTitle = '[data-testid="recommendationTitle"]'
    this.productTile = '[data-testid="productCard"]:visible'
    this.productCardLink = '[data-testid="productCardLink"]'
    this.productCardTitle = '[data-testid="productTitle"]'
    this.price = '[data-testid="pricePrice"]'
    this.priceRRP = '[data-testid="priceRRP"]'
    this.yotpoReviewCount = '[data-testid="numberOfReviews"]'
  }
  getHeroBlock() {
    cy.get(this.heroBanner)
      .should('be.visible')
      .should('have.css', 'background-image')

    cy.get(this.heroBanner).find('h2').should('be.visible')

    cy.checkElementTextIsNotEmpty(this.bannerText)
  }

  getContactBlock() {
    cy.get(this.contactBlock).should('be.visible')

    cy.checkElementTextIsNotEmpty(this.contactBlockTitle)

    cy.get(this.contactBlockButton)
      .should('be.visible')
      .should('have.attr', 'href')
      .and('not.be', 'empty')

    cy.get(this.contactBlockDivs)
      .find(this.textLink)
      .should('have.attr', 'href')
      .and('not.be', 'empty')
  }

  getCategoryBlock(numberOfCategories) {
    cy.get(this.categoryBlock).should('be.visible')

    cy.get(this.categoryBlockList)
      .find('div.swiper-slide')
      .should('have.length.gte', numberOfCategories)
  }

  getUspBlock() {
    cy.get(this.uspBlock).should('be.visible').find('h2').should('not.be.empty')

    cy.get(this.uspBlock)
      .find('ul li')
      .each(listItem => {
        cy.wrap(listItem)
          .should('be.visible')
          .invoke('text')
          .then(text => {
            expect(text).not.be.empty
          })
      })
  }

  addFirstRecommendedProductToFavourites() {
    cy.get(this.saveToFavourteButton).first().click()
  }

  getRecommendationBlock() {
    cy.scrollTo('bottom', { duration: 500 })
    cy.get(this.recommendationBlock).eq(0).scrollIntoView({ duration: 200 })
    cy.get(this.recommendationBlock)
      .eq(0)
      .find(this.productTile)
      .eq(0)
      .then(productTile => {
        cy.wrap(productTile).find(this.productCardLink).should('be.visible')
        cy.wrap(productTile)
          .find(this.productCardLink)
          .find(this.productCardTitle)
          .should('be.visible')
          .invoke('text')
          .then(text => {
            expect(text).not.be.empty
          })
        cy.wrap(productTile).find(this.yotpoReviewCount).should('be.visible')
        cy.wrap(productTile)
          .find(this.price)
          .should('be.visible')
          .invoke('text')
          .then(text => {
            expect(text).not.be.empty
          })
        cy.wrap(productTile)
          .find(this.priceRRP)
          .should('be.visible')
          .invoke('text')
          .then(text => {
            expect(text).not.be.empty
          })
        cy.wrap(productTile)
          .find(addToBasket.addToBasketButton)
          .should('be.visible')
      })
  }
}

export const homepage = new Homepage()
