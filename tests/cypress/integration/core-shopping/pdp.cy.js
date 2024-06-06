import { pdp } from '../../support/page-objects/pages/pdp'
import { basketPage } from '../../support/page-objects/pages/basketPage'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import { DbHelper } from '../../support/db.helper'
import { ProductBuilder } from '../../support/builder/product.builder'
import { SuiteTag } from '../../support/enums/suiteTag'
import { header } from '../../support/page-objects/components/header'
import { skipOn } from '@cypress/skip-test'
import { FeatureFlag } from '../../../../src/config/constants/feature-flags'

const addProductBasketApiResource = '/api/basket/add'
const dbhelper = new DbHelper()
const locale = Cypress.env('locale')
const productId = locale == 'es' ? 77 : 167

Cypress.on('uncaught:exception', (err, runnable) => {
  // temporary hack due to type error on basket page
  return false
})

describe('Add to basket tests with mocked data', () => {
  const productSku = 100000001
  const invalidSkus = [0, 'testy', 1234567]
  const invalidQuantities = [-10, 0, '-1']

  beforeEach(() => {
    cy.intercept('GET', '/api/basket/get').as('getBasket')
    cy.viewportPreset('iphone-se')
    dbhelper.buildAndGetProdUrlSlugByIds(19756, productId).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
  })

  it([SuiteTag.SMOKE], '#398 adds mocked product to basket', () => {
    const productData = new ProductBuilder().build(1, 'AVAILABLE', 1, 100)
    cy.intercept('POST', addProductBasketApiResource, {
      body: productData
    }).as('addProduct')
    pdp.addProductToBasket()
    cy.wait('@addProduct')
    cy.get('@addProduct').then(xhr => {
      expect(xhr.response.statusCode).to.equal(200)
      expect(xhr.response.body.currency).to.eql(productData.currency)
      expect(xhr.response.body.id).to.eql(productData.id)
      expect(xhr.response.body.items.length).to.eql(1)
      expect(xhr.response.body.items[0].sku).to.eql(productData.items[0].sku)
      expect(xhr.response.body.items[0].quantity).to.eql(
        productData.items[0].quantity
      )
      expect(xhr.response.body.items[0].unitPrice).to.eql(
        productData.items[0].unitPrice
      )
      expect(xhr.response.body.items[0].subtotal).to.eql(
        productData.items[0].subtotal
      )
      expect(xhr.response.body.grandTotal).to.eql(productData.grandTotal)
    })
    addToBasket.verifyModalSuccess()
  })

  it('cannot add product without quantity', () => {
    cy.intercept('POST', addProductBasketApiResource, req => {
      req.body = {
        sku: productSku
      }
    }).as('addProduct')
    pdp.addProductToBasket()
    cy.wait('@addProduct').then(xhr => {
      expect(xhr.response.statusCode).to.eql(422)
    })
    addToBasket.verifyModalError()
  })

  invalidQuantities.forEach(quantityVal => {
    it(`cannot add product invalid quantity value ${quantityVal}`, () => {
      cy.intercept('POST', addProductBasketApiResource, req => {
        req.body = {
          sku: productSku,
          quantity: quantityVal
        }
      }).as('addProduct')
      pdp.addProductToBasket()
      cy.wait('@addProduct').then(xhr => {
        expect(xhr.response.statusCode).to.eql(422)
      })
      addToBasket.verifyModalError()
    })
  })

  it('cannot add product without sku', () => {
    cy.intercept('POST', addProductBasketApiResource, req => {
      req.body = {
        sku: null,
        quantity: 1
      }
    }).as('addProduct')
    pdp.addProductToBasket()
    cy.wait('@addProduct').then(xhr => {
      expect(xhr.response.statusCode).to.eql(422)
    })
    addToBasket.verifyModalError()
  })

  invalidSkus.forEach(skuVal => {
    it(`cannot add product invalid sku with value ${skuVal}`, () => {
      cy.intercept('POST', addProductBasketApiResource, req => {
        req.body = {
          quantity: 1,
          sku: skuVal
        }
      }).as('addProduct')
      pdp.addProductToBasket()
      cy.wait('@addProduct').then(xhr => {
        expect(xhr.response.statusCode).to.eql(422)
      })
      addToBasket.verifyModalError()
    })
  })
})

describe([SuiteTag.SMOKE], 'PDP real tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/basket/get').as('getBasket')
    cy.intercept('POST', addProductBasketApiResource).as('addProduct')
    cy.intercept('POST', '/api/recommendations/fetch').as(
      'getRecommendedProducts'
    )
    cy.viewportPreset('samsung-s10-plus')
    dbhelper.buildAndGetProdUrlSlugByIds(19756, productId).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
    cy.checkFlag(addToBasket.basketNotificationFF).as('basketNotificationFF')
    cy.checkFlag(
      FeatureFlag.PRODUCT_PDP_ADD_TO_BASKET_CONTROLS_NEW_QUANTITY_SELECTOR
    ).as('newQuantitySelectorFF')
    cy.wait('@getRecommendedProducts')
  })

  it('#521 displays pdp page blocks', () => {
    pdp.getProductHeader()
    pdp.getProductPrice()
    pdp.getPdpDetailsBlock()
  })

  it('#521 displays PDP gallery', () => {
    cy.checkFlag(FeatureFlag.PRODUCT_PDP_PRODUCT_MEDIA_GALLERY).then(
      galleryEnabled => {
        cy.onlyOn(galleryEnabled === true)
        pdp.getProductGallery()
      }
    )
  })

  it('#510 displays recommended products', () => {
    pdp.getPdpRecommendations()
  })

  it('#398 adds a real product to basket', () => {
    pdp.addProductToBasket()
    cy.wait('@addProduct').its('response.statusCode').should('eql', 200)
    addToBasket.verifyModalSuccess()
    dbhelper.buildAndGetProdUrlSlugByIds(19756, productId).then(data => {
      addToBasket.verifyBasketModal(data.rows[0].name)
    })
    cy.get(addToBasket.basketModalViewBasket).click()
    basketPage.getProductsTotalCount(1)
  })

  it('#398 increases product quantity from 1 to 2', () => {
    cy.get('@newQuantitySelectorFF').then(newQuantitySelectorFF => {
      cy.skipOn(newQuantitySelectorFF === true)
    })
    pdp.addProductToBasket()
    cy.wait('@addProduct').its('response.statusCode').should('eql', 200)
    addToBasket.verifyModalSuccess()
    cy.get('@basketNotificationFF').then(basketNotificationFF => {
      skipOn(basketNotificationFF === true, () => {
        addToBasket.closeMinicart()
      })
    })
    cy.get(addToBasket.removeProductButton).should('be.visible')
    cy.get(addToBasket.decreaseQuantityButton).should('be.hidden')
    addToBasket.increaseQuantity()
    addToBasket.clickViewBasketButton()
    basketPage.getProductsTotalCount(2)
  })

  it('#398 decreases product quantity from 2 to 1', () => {
    cy.get('@newQuantitySelectorFF').then(newQuantitySelectorFF => {
      cy.skipOn(newQuantitySelectorFF === true)
    })
    pdp.addProductToBasket()
    cy.wait('@addProduct').its('response.statusCode').should('eql', 200)
    addToBasket.verifyModalSuccess()
    cy.get('@basketNotificationFF').then(basketNotificationFF => {
      skipOn(basketNotificationFF === true, () => {
        addToBasket.closeMinicart()
      })
    })
    cy.get(addToBasket.removeProductButton).should('be.visible')
    cy.get(addToBasket.decreaseQuantityButton).should('be.hidden')
    addToBasket.increaseQuantity()
    addToBasket.decreaseQuantity()
    addToBasket.clickViewBasketButton()
    basketPage.getProductsTotalCount(1)
  })

  it('#398 removes product from basket', () => {
    cy.get('@newQuantitySelectorFF').then(newQuantitySelectorFF => {
      cy.skipOn(newQuantitySelectorFF === true)
    })
    pdp.addProductToBasket()
    cy.wait('@addProduct').its('response.statusCode').should('eql', 200)
    addToBasket.verifyModalSuccess()
    addToBasket.removeProduct()
    addToBasket.clickViewBasketButton()
    basketPage.getEmptyBasketContent(0)
  })

  it(
    [SuiteTag.SMOKE],
    '#909 User can add to basket from Exponea Recommendations block',
    () => {
      pdp.getPdpRecommendations()
      addToBasket.addFirstActiveProductToTheBasket()
      addToBasket.verifyBasketModal()
      cy.get('@basketNotificationFF').then(basketNotificationFF => {
        skipOn(basketNotificationFF === true, () => {
          addToBasket.assertProductQuantityIsCorrect(1)
          addToBasket.closeMinicart()
        })
      })
      header.checkItemsCount(1)
    }
  )
})
