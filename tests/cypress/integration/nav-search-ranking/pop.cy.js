import { pop } from '../../support/page-objects/pages/pop'
import { productResults } from '../../fixtures/productList'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import { SuiteTag } from '../../support/enums/suiteTag'
import { skipOn } from '@cypress/skip-test'
const { getProductImageUrl } = require('../../support/helper')
const locale = Cypress.env('locale')
const pageUri = locale == 'es' ? '/vitaminas-suplementos' : '/beleza/rosto'

describe([SuiteTag.SMOKE], '#395 Product Overview Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/basket/get').as('getBasket')
    cy.viewportPreset('ipad-pro')
    cy.visit(pageUri)
    cy.intercept('POST', '/1/indexes/*/queries*').as('loadMoreProducts')
    pop.getProductsPerPage()
  })

  it('displays initial results on page', () => {
    pop.getProductListHeader()
    cy.get('@productsPerPage').then(productsPerPage => {
      pop.getProductSearchList(productsPerPage, 'be.eql')
    })
  })

  it('displays second page of results', () => {
    cy.get(pop.infinitePaginationButton).should('be.visible').click()
    cy.wait('@loadMoreProducts').its('response.statusCode').should('eql', 200)
    cy.get('@productsPerPage').then(productsPerPage => {
      pop.getProductSearchList(productsPerPage + 1, 'be.at.least')
    })
  })
})

describe([SuiteTag.SMOKE], 'POP pagination and add to cart (mocked)', () => {
  beforeEach(() => {
    cy.viewportPreset('samsung-s10-plus')
    cy.visit(pageUri)
    cy.intercept('POST', '/1/indexes/*/queries*', {
      statusCode: 200,
      body: productResults
    }).as('loadProducts')
    pop.getProductsPerPage()
    cy.checkFlag(addToBasket.basketNotificationFF).as('basketNotificationFF')
    cy.get(pop.infinitePaginationButton).should('be.visible').click()
    cy.wait('@loadProducts').its('response.statusCode').should('eql', 200)
  })

  it.skip('#395 displays mocked products in list view', () => {
    pop.openGridListView()
    cy.get('@productsPerPage').then(productsPerPage => {
      pop.getProductSearchListMobile(
        productsPerPage + 2,
        productsPerPage,
        'be.equal'
      )
    })
    const productListArraySize = productResults.results[0].hits.length

    for (var i = 0; i < productListArraySize; i++) {
      const productName = productResults.results[0].hits[i].name
      const productPrice = productResults.results[0].hits[i].price.sale / 100
      const productFormat =
        productResults.results[0].hits[i].attributes.format.label
      const baseProductImageUrl =
        productResults.results[0].hits[i].attributes.asset_image_list[0]
      const productImageThumbnailUrl = getProductImageUrl(
        baseProductImageUrl,
        'Tile'
      )

      const productListIndex = i == 0 ? 0 : 1

      cy.findListSelector(
        productListIndex,
        pop.productSearchList,
        pop.productTile
      )
        .find('h3')
        .should('contain', productName)

      cy.findListSelector(
        productListIndex,
        pop.productSearchList,
        pop.productTile
      )
        .find('small')
        .should('contain', productFormat)

      cy.findListSelector(
        productListIndex,
        pop.productSearchList,
        pop.productTile
      )
        .find('img')
        .invoke('attr', 'src')
        .should('not.be', 'empty')

      cy.findListSelector(
        productListIndex,
        pop.productSearchList,
        pop.productTile
      ).should('contain', productPrice)
    }
  })

  it('#392 & #396 adds and removes mocked product', () => {
    cy.intercept('POST', '/api/basket/add', {
      statusCode: 200,
      body: {
        currency: 'EUR',
        items: [
          {
            product: {
              availability: productResults.results[0].hits[0].availability
            },
            quantity: 1,
            sku: productResults.results[0].hits[0].sku,
            subtotal: productResults.results[0].hits[0].price.sale,
            tax: 0,
            unitPrice: productResults.results[0].hits[0].price.sale
          }
        ],
        grandTotal: productResults.results[0].hits[0].price.sale,
        id: '00bad885-f600-5aef-ac50-f925c913114f',
        rrpTotal: productResults.results[0].hits[0].price.rrp,
        shippingTotal: 399
      }
    }).as('addMockedProduct')
    cy.findListSelector(0, pop.productSearchList, pop.productTile).within(
      () => {
        addToBasket.addToBasket()
      }
    )
    cy.wait('@addMockedProduct').its('response.statusCode').should('eql', 200)
    addToBasket.verifyModalSuccess()
    cy.get('@basketNotificationFF').then(basketNotificationFF => {
      skipOn(basketNotificationFF === true, () => {
        addToBasket.assertProductQuantityIsCorrect(1)
      })
    })
    cy.intercept('POST', '/api/basket/remove', {
      statusCode: 200,
      body: {
        currency: 'EUR',
        items: [
          {
            product: {
              availability: productResults.results[0].hits[0].availability
            },
            quantity: 0,
            sku: productResults.results[0].hits[0].sku,
            subtotal: productResults.results[0].hits[0].price.sale,
            tax: 0,
            unitPrice: productResults.results[0].hits[0].price.sale
          }
        ],
        grandTotal: productResults.results[0].hits[0].price.sale,
        id: '00bad885-f600-5aef-ac50-f925c913114f',
        rrpTotal: productResults.results[0].hits[0].price.rrp,
        shippingTotal: 399
      }
    }).as('removeMockedProduct')
    cy.get('@basketNotificationFF').then(basketNotificationFF => {
      skipOn(basketNotificationFF === true, () => {
        addToBasket.closeMinicart()
      })
    })
    addToBasket.removeProduct()
    cy.wait('@removeMockedProduct')
      .its('response.statusCode')
      .should('eql', 200)
    cy.findListSelector(0, pop.productSearchList, pop.productTile).within(
      () => {
        addToBasket.verifyAddToBasketButtonDefault()
      }
    )
  })

  it('#392 & #396 adds two units of mocked product', () => {
    cy.intercept('POST', '/api/basket/add', {
      statusCode: 200,
      body: {
        currency: 'EUR',
        items: [
          {
            product: {
              availability: productResults.results[0].hits[1].availability
            },
            quantity: 1,
            sku: productResults.results[0].hits[1].sku,
            subtotal: productResults.results[0].hits[1].price.sale,
            tax: 0,
            unitPrice: productResults.results[0].hits[1].price.sale
          }
        ],
        grandTotal: productResults.results[0].hits[1].price.sale,
        id: '00bad885-f600-5aef-ac50-f925c913114f',
        rrpTotal: productResults.results[0].hits[1].price.rrp,
        shippingTotal: 399
      }
    }).as('addMockedProduct')
    cy.findListSelector(1, pop.productSearchList, pop.productTile).within(
      () => {
        addToBasket.addToBasket()
      }
    )
    cy.wait('@addMockedProduct').its('response.statusCode').should('eql', 200)
    addToBasket.verifyModalSuccess()
    cy.get('@basketNotificationFF').then(basketNotificationFF => {
      skipOn(basketNotificationFF === true, () => {
        addToBasket.closeMinicart()
      })
    })
    cy.findListSelector(1, pop.productSearchList, pop.productTile)
      .scrollIntoView()
      .within(() => {
        addToBasket.verifyAddToBasketProductCount(1)
      })

    cy.intercept('PATCH', '/api/basket/change-item-quantity', {
      statusCode: 200,
      body: {
        currency: 'EUR',
        items: [
          {
            product: {
              availability: productResults.results[0].hits[1].availability
            },
            quantity: 2,
            sku: productResults.results[0].hits[1].sku,
            subtotal: productResults.results[0].hits[1].price.sale,
            tax: 0,
            unitPrice: productResults.results[0].hits[1].price.sale
          }
        ],
        grandTotal: productResults.results[0].hits[1].price.sale,
        id: '00bad885-f600-5aef-ac50-f925c913114f',
        rrpTotal: productResults.results[0].hits[1].price.rrp,
        shippingTotal: 399
      }
    }).as('changeQuantityMockedProduct')
    cy.findListSelector(1, pop.productSearchList, pop.productTile).within(
      () => {
        addToBasket.increaseQuantity()
      }
    )
    cy.wait('@changeQuantityMockedProduct')
      .its('response.statusCode')
      .should('eql', 200)

    cy.findListSelector(1, pop.productSearchList, pop.productTile).within(
      () => {
        addToBasket.verifyAddToBasketProductCount(2)
      }
    )
  })
})

describe('Subcategories listing page tests', () => {
  beforeEach(() => {
    cy.viewportPreset('samsung-s10-plus')
    cy.visit(pageUri)
    cy.intercept({
      method: 'GET',
      url: `**${pageUri}/**`
    }).as('loadCategory')
  })

  it.skip('displays at least one category', () => {
    cy.get(pop.subCategoryUl)
      .should('be.visible')
      .its('length')
      .should('be.at.least', 1)
    pop.clickOnSubcategoryFilter(0)
    cy.url().should('include', pageUri)
    cy.get(pop.categoryHeader).find('h1').should('not.be.empty')
    cy.checkElementTextIsNotEmpty(pop.popBackButton)
    pop.getProductSearchList(1, 'be.at.least')
  })
})

describe.skip('Subcategories listing page show more button', () => {
  before(() => {
    cy.viewportPreset('ms-surface')
    cy.visit(pageUri)
  })

  it('displays show more categories', () => {
    pop.getVisibleShowMoreButton()
  })
})
