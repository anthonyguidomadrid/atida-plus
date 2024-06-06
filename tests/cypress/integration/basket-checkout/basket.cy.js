import { basketPage } from '../../support/page-objects/pages/basketPage'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import { loginPage } from '../../support/page-objects/pages/account/loginPage'
import { SuiteTag } from '../../support/enums/suiteTag'
import { ProductBuilder } from '../../support/builder/product.builder'
import { DbHelper } from '../../support/db.helper'
const localPrefix = Cypress.env('locale') == 'es' ? 'es-es' : 'pt-pt'
const getBasketApi = `/api/basket/get?locale=${localPrefix}`
const locale = 'pt-PT'
const pageUri = 'basket'
const loginBasketUri = 'login/basket'
let dbhelper = new DbHelper()

describe('Responsive basket tests', () => {
  const resolutions = ['samsung-s10-plus', 'iphone-se', 'ipad-pro', 'full-hd']

  describe('Empty basket page', () => {
    beforeEach(() => {
      cy.visit(pageUri)
    })

    it('displays empty basket header and content', () => {
      resolutions.forEach(resolution => {
        cy.viewportPreset(resolution)
        basketPage.getBasketHeader()
        basketPage.getEmptyBasketContent()
        cy.get(basketPage.basketSummaryId).should('not.exist')
      })
    })
  })

  describe('One product in the basket', () => {
    const productData = new ProductBuilder().build(1, 'AVAILABLE', 1, 100)
    beforeEach(() => {
      cy.intercept('GET', getBasketApi, { body: productData })
      cy.visit(pageUri)
    })

    it('displays basket header and content with one product', () => {
      const unitPrice = (productData.items[0].unitPrice / 100).toLocaleString(
        locale
      )
      const imageSrc = productData.items[0].product.thumbnailImage
      const productName = productData.items[0].product.name
      const grandTotalPrice = (productData.grandTotal / 100).toLocaleString(
        locale
      )
      const productAvailability = productData.items[0].product.availability
      resolutions.forEach(resolution => {
        cy.viewportPreset(resolution)
        basketPage.getBasketHeader(1, grandTotalPrice)
        basketPage.getBasketSummaryBlock(
          productData.rrpTotal,
          productData.grandTotal
        )
        basketPage.getBasketProductTile(
          0,
          productName,
          unitPrice,
          imageSrc,
          productAvailability
        )
        basketPage.getBasketSummaryCouponBlock()
      })
    })
  })
})

describe('Basket is empty', () => {
  const productData = new ProductBuilder().build(1, 'AVAILABLE', 1, 100)
  beforeEach(() => {
    cy.viewportPreset('samsung-s10-plus')
    cy.intercept('GET', getBasketApi, { body: productData })
    cy.visit(pageUri)
  })

  it('displays empty basket when product is removed', () => {
    cy.intercept('POST', '/api/basket/remove', {
      statusCode: 200,
      body: {
        currency: productData.currency,
        grandTotal: 0,
        id: productData.id,
        shippingTotal: 0,
        subTotal: 0,
        rrpTotal: 0
      }
    }).as('removeProduct')

    cy.findListSelector(
      0,
      basketPage.basketProductListId,
      basketPage.basketRemoveProductButtonId
    ).click()
    cy.wait('@removeProduct')
    basketPage.getBasketHeader()
    basketPage.getEmptyBasketContent()
  })
})

describe(
  [SuiteTag.SMOKE],
  '#402 Multiple products in the basket and one of them is removed',
  () => {
    const productData = new ProductBuilder().build(2, 'AVAILABLE', 1, 100)
    beforeEach(() => {
      cy.viewportPreset('ipad-pro')
      cy.intercept('GET', getBasketApi, { body: productData })
      cy.visit(pageUri)
    })

    it('displays only one product', () => {
      const unitPriceFirst = (
        productData.items[0].unitPrice / 100
      ).toLocaleString(locale)
      const imageSrcFirst = productData.items[0].product.thumbnailImage
      const productNameFirst = productData.items[0].product.name
      const productAvailabilityFirst = productData.items[0].product.availability
      const grandTotal =
        productData.items[0].subtotal + productData.shippingTotal
      const unitPriceSecond = (
        productData.items[1].unitPrice / 100
      ).toLocaleString(locale)
      const imageSrcSecond = productData.items[1].product.thumbnailImage
      const productNameSecond = productData.items[1].product.name
      const productAvailabilitySecond =
        productData.items[1].product.availability
      basketPage.getProductListItemsCount(2)
      basketPage.getBasketProductTile(
        1,
        productNameSecond,
        unitPriceSecond,
        imageSrcSecond,
        productAvailabilitySecond
      )
      cy.intercept('POST', '/api/basket/remove', {
        statusCode: 200,
        body: {
          currency: productData.currency,
          grandTotal: grandTotal,
          id: productData.id,
          items: [productData.items[0]],
          shippingTotal: productData.shippingTotal,
          subTotal: productData.items[0].subtotal,
          rrpTotal: productData.items[0].subtotal
        }
      }).as('removeSecondProduct')
      cy.findListSelector(
        1,
        basketPage.basketProductListId,
        basketPage.basketRemoveProductButtonId
      ).click()
      cy.wait('@removeSecondProduct')

      basketPage.getBasketProductTile(
        0,
        productNameFirst,
        unitPriceFirst,
        imageSrcFirst,
        productAvailabilityFirst
      )

      basketPage.getBasketSummaryBlock(
        productData.items[0].subtotal,
        grandTotal
      )

      // basketPage.getProductListItemsCount(1)
    })
  }
)

describe('Change quantity of one product', () => {
  const productData = new ProductBuilder().build(1, 'AVAILABLE', 1, 100)
  const increasedQuantityProductData = new ProductBuilder().build(
    1,
    'AVAILABLE',
    2,
    100
  )
  beforeEach(() => {
    cy.viewportPreset('iphone-se')
    cy.intercept('GET', getBasketApi, { body: productData })
    cy.visit(pageUri)
  })

  it.skip('displays increased product data', () => {
    const newSubtotalValue = increasedQuantityProductData.items[0].subtotal
    const newGrandTotal = increasedQuantityProductData.grandTotal
    cy.intercept('PATCH', '/api/basket/change-item-quantity', {
      statusCode: 200,
      body: increasedQuantityProductData
    }).as('addNewProductQuantity')

    basketPage.changeProductQuantity(2)
    basketPage.getBasketSummaryBlock(newSubtotalValue, newGrandTotal)
  })
})

describe([SuiteTag.REGRESSION], 'Shipping cost tests', () => {
  beforeEach(() => {
    cy.viewportPreset('iphone-se')
  })
  it('#17 displays free delivery when sum is greater than 49E', () => {
    const freeDelivery = /Grátis|Free|Gratis/g
    const productData = new ProductBuilder().build(3, 'AVAILABLE', 1, 1000)
    cy.intercept('GET', getBasketApi, { body: productData })
    cy.visit(pageUri)
    basketPage.verifyShippingCost(freeDelivery)
  })
  it('#18 displays shipping cost when sum is less than 49E', () => {
    const productData = new ProductBuilder().build(1, 'AVAILABLE', 1, 100)
    const expectedDeliveryPrice = (
      productData.shippingTotal / 100
    ).toLocaleString(locale)
    cy.intercept('GET', getBasketApi, { body: productData })
    cy.visit(pageUri)
    basketPage.verifyShippingCost(expectedDeliveryPrice)
  })
})

describe([SuiteTag.REGRESSION], 'Unavailable product basket test', () => {
  beforeEach(() => {
    cy.viewportPreset('iphone-se')
  })

  it('#22 order buttons are disabled', () => {
    const productData = new ProductBuilder().build(1, 'NOT_AVAILABLE', 1, 100)
    cy.intercept('GET', getBasketApi, {
      body: productData
    }).as('getBasket')
    cy.visit(pageUri)
    cy.wait('@getBasket')
    basketPage.checkProductUnavailability(
      productData.items[0].product.availability
    )
  })
})

describe([SuiteTag.REGRESSION], 'Voucher code basket test', () => {
  const voucherCode = '10discount'

  it('#21 valid voucher code is added then removed', () => {
    cy.viewportPreset('iphone-se')
    cy.visit(loginBasketUri)
    loginPage.loginWithFixturedUser()
    basketPage.removeAllProducts()
    let storeLocale = Cypress.env('locale') == 'es' ? 77 : 167
    dbhelper.buildAndGetProdUrlSlugByIds(1024, storeLocale).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    basketPage.addProductInBasket()
    addToBasket.clickViewBasketButton()
    basketPage.fillInVoucherCode(voucherCode)
    basketPage.removeAddedVoucherCode()
  })
})
