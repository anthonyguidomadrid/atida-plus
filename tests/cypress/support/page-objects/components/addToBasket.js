import { onlyOn } from '@cypress/skip-test'
import { FeatureFlag } from '../../../../../src/config/constants/feature-flags'

export class AddToBasket {
  constructor() {
    this.addToBasketButton = '[data-testid="addToBasketButton"]'
    this.addToBasketEnabledButton = '[data-testid="addToBasketButton"]:enabled'
    this.buttonLoadingSpinnerId = '[data-testid="buttonLoadingSpinner"]'
    this.quantitySelector = '[data-testid="quantitySelector"]'
    this.quantitySelectorInput = '[data-testid="quantityInput"]'
    this.increaseQuantityButton = '[data-testid="increaseQuantityButton"]'
    this.decreaseQuantityButton = '[data-testid="decreaseQuantityButton"]'
    this.removeProductButton = '[data-testid="removeProductButton"]'
    this.basketNotificationFF = FeatureFlag.BASKET_NOTIFICATION
    this.basketNotificationModal = '[data-testid="basketNotification"]'
    this.basketModalProductName = '[data-testid="basketProductModalName"]'
    this.basketModalViewBasket = '[data-testid$="ViewBasket"]'
    this.oldBasketModal = '[data-testid="basketModalLayout"]'
    this.basketProductModal = '[data-testid="basketProductModal"]'
    this.addProductNotificationId =
      '[data-testid="basketModal"] [data-testid="notification"]'
    this.addProductNotificationSuccessId =
      '[data-testid="basketModalNotification"]'
    this.basketModalDecreaseQuantityButton =
      '[data-testid="basketProductModal"] [data-testid="decreaseQuantityButton"]'
    this.basketModalIncreaseQuantityButton =
      '[data-testid="basketProductModal"] [data-testid="increaseQuantityButton"]'
    this.basketModalRemoveProductsButton =
      '[data-testid="basketProductModal"] [data-testid="removeProductButton"]'
    this.genericNotification = '[data-testid="notification"]'
    this.closeMenuButton = '[data-testid="closeMenu"]'
    this.continueShoppingButton = '[data-testid="basketModalContinueShopping"]'
  }

  addToBasket() {
    cy.get(this.addToBasketButton).click()
  }

  addFirstActiveProductToTheBasket() {
    cy.get(addToBasket.addToBasketEnabledButton).first().click()
  }

  assertProductQuantityIsCorrect(expectedQuantity) {
    cy.get(this.oldBasketModal)
      .find(this.basketProductModal)
      .find(this.quantitySelectorInput)
      .should('be.visible')
      .invoke('attr', 'placeholder')
      .should('include', expectedQuantity)
  }

  clickViewBasketButton() {
    const localePrefix = Cypress.env('locale') == 'es' ? 'es-es' : 'pt-pt'
    const getBasketApi = `/api/basket/get?locale=${localePrefix}`
    cy.intercept('GET', getBasketApi).as('getBasket')
    cy.get(this.basketModalViewBasket).click()
    cy.wait('@getBasket').its('response.statusCode').should('eql', 200)
  }

  closeMinicart() {
    cy.get(this.oldBasketModal).find(this.continueShoppingButton).click()
  }

  increaseQuantity() {
    cy.get(this.increaseQuantityButton).click()
  }

  decreaseQuantity() {
    cy.get(this.decreaseQuantityButton).filter(':visible').click()
  }

  removeProduct() {
    cy.get(this.removeProductButton).filter(':visible').click()
  }

  verifyAddToBasketProductCount(quantity) {
    cy.get(this.quantitySelector)
      .first()
      .find(this.quantitySelectorInput)
      .should('have.value', quantity)
  }

  verifyAddToBasketButtonDefault() {
    cy.get(addToBasket.addToBasketButton)
      .should('not.contain', '1')
      .and('not.have.class', 'button--tertiary')
      .and('have.class', 'button--secondary')
  }

  verifyBasketModal(productName = '') {
    cy.checkFlag(this.basketNotificationFF).then(basketNotificationEnabled => {
      onlyOn(basketNotificationEnabled === true, () => {
        cy.get(this.basketNotificationModal)
          .find(this.basketModalProductName)
          .then(productNameId => {
            cy.wrap(productNameId).checkElementTextIsNotEmpty(
              productNameId,
              productName
            )
          })
      })
      onlyOn(basketNotificationEnabled === false, () => {
        cy.get(this.oldBasketModal).should('be.visible')
        cy.get(this.addProductNotificationSuccessId)
          .should('be.visible')
          .and('not.be.empty')
        cy.get(this.oldBasketModal)
          .find(this.basketProductModal)
          .find('h3')
          .then(productNameId => {
            cy.wrap(productNameId).checkElementTextIsNotEmpty(
              productNameId,
              productName
            )
          })
      })
    })
  }

  verifyModalSuccess() {
    cy.checkFlag(this.basketNotificationFF).then(basketNotificationEnabled => {
      onlyOn(basketNotificationEnabled === true, () => {
        cy.get(this.basketNotificationModal)
          .find('.bg-ui-carribean-green-lightest')
          .should('exist')
        cy.get(this.basketNotificationModal)
          .find(this.basketModalProductName)
          .invoke('text')
          .should('not.be.empty')
      })

      onlyOn(basketNotificationEnabled === false, () => {
        cy.get(this.oldBasketModal)
          .find(this.addProductNotificationSuccessId)
          .should('have.class', 'bg-secondary-green-100')
          .and('be.visible')
        cy.get(this.oldBasketModal)
          .find(this.addProductNotificationSuccessId)
          .find('p')
          .should('not.be.empty')
      })
    })
  }

  verifyModalError() {
    cy.checkFlag(this.basketNotificationFF).then(basketNotificationEnabled => {
      onlyOn(basketNotificationEnabled === true, () => {
        cy.get(this.basketNotificationModal)
          .find('.bg-secondary-red-100')
          .should('exist')
        cy.get(this.basketNotificationModal)
          .find('p')
          .first()
          .invoke('text')
          .should('not.be.empty')
        cy.get(this.basketNotificationModal)
          .find(this.basketModalProductName)
          .invoke('text')
          .should('not.be.empty')
      })

      onlyOn(basketNotificationEnabled === false, () => {
        cy.get(this.oldBasketModal)
          .find(this.genericNotification)
          .should('have.class', 'bg-secondary-red-100')
        cy.get(this.oldBasketModal)
          .find(this.genericNotification)
          .find('p')
          .should('not.be.empty')
      })
    })
  }
}

export const addToBasket = new AddToBasket()
