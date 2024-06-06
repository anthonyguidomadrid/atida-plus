export class POP {
  constructor() {
    this.productSearchList = '[data-testid="productSearchList"]'
    this.productTileLink = '[data-testid="productTileLink"]'
    this.infinitePagination = '[data-testid="infinitePagination"]'
    this.infinitePaginationButton = '[data-testid="infinitePagination"] a'
    this.progressBar = '[data-testid="progressBar"]'
    this.productCount = '[data-testid="infinitePaginationProductCount"]'
    this.popBackButton = '[data-testid="popBackButton"]'
    this.productSearchTotalCount = '[data-testid="productSearchTotalCount"]'
    this.popWrapper = '[data-testid="popLayout"]'
    this.categoryHeader = '[data-testid="mainSectionHeader"]'
    this.productTilePrice = '[data-testid="productTilePrice"]'
    this.productTileSellingPrice = '[data-testid="pricePrice"]'
    this.subCategoryUl = '[data-testid="subcategoryList"] ul'
    this.showMoreLink = '[data-testid="subcategoryList"] ul .button--primary'
    this.productTile = '[data-testid="productCard"]'
    this.productTileTitle = '[data-testid="productTitle"]'
    this.noResultsTitle = '[data-testid="searchWithNoResultsTitle"]'
    this.searchAgainButton = '[data-testid="searchWithNoResultsButton"]'
    this.searchTerm = '[data-testid="autoComplete"]'
    this.gridListButton = '[data-testid="gridListButton"]'
    this.addToFavouritesButton = '[data-testid="saveToFavouritesButton"]'
    this.productCardLink = '[data-testid="productCardLink"]'
    this.mobileFilterButton = 'button[title="Filters & sort"]'
    this.mobilefilterClose =
      '[data-testid="filterAndSortMenu"] button.button--secondary'
    this.brandFilter = '[data-testid="filterBrandPanel"]:visible'
    this.priceFilter = '[data-testid="filterPricePanel"]:visible'
    this.formatFilter = '[data-testid="filterFormatPanel"]:visible'
    this.sortDropdown = '.ais-SortBy-select select'
    this.filterCheckboxLabel = 'label.ais-RefinementList-label'
    this.filterCheckboxLabelText = 'span.ais-RefinementList-labelText'
    this.minField = '[data-testid="minField"]'
    this.maxField = '[data-testid="maxField"]'
    this.priceFilterButton = '[data-testid="priceFilterButton"]'
  }

  getProductSearchList(productsCount, assertionType) {
    cy.get(pop.productSearchList)
      .find(this.productTile)
      .then(listItems => {
        cy.wrap(listItems).its('length').should(assertionType, productsCount)
        cy.wrap(listItems).its('length').as('listItemsCount')
      })

    cy.get(this.progressBar).should('be.visible')
    cy.get(this.infinitePagination)
      .find(this.productCount)
      .invoke('text')
      .then(text => {
        cy.get('@listItemsCount').then(listItemsCount => {
          expect(parseInt(text.split(' ')[0])).to.be.eql(listItemsCount)
        })
      })
  }

  getProductSearchListMobile(
    newProductsCount,
    prevProductsCount,
    assertionType
  ) {
    cy.get(pop.productSearchList)
      .find(this.productTile)
      .its('length')
      .should(assertionType, newProductsCount - prevProductsCount)

    cy.get(this.progressBar).should('be.visible')
    cy.get(this.infinitePagination)
      .find(this.productCount)
      .invoke('text')
      .then(text => {
        expect(parseInt(text.split(' ')[0])).to.be.eql(newProductsCount)
      })
  }

  getProductListHeader() {
    cy.get(this.categoryHeader).find('h1').should('not.be.empty')
    cy.checkElementTextIsNotEmpty(this.productSearchTotalCount)
  }

  clickOnSubcategoryFilter(index) {
    cy.get(this.subCategoryUl)
      .children()
      .eq(index)
      .click({ waitForAnimations: false })
  }

  getVisibleShowMoreButton() {
    let subcategoriesVisibleCount, subcategoriesCount
    cy.get('body').then($body => {
      if ($body.find(this.showMoreLink).length > 0) {
        cy.get(this.showMoreLink).then($button => {
          if ($button.is(':visible')) {
            cy.wrap($button).filter(':visible').click()
            cy.get(this.subCategoryUl)
              .find('li.flex-shrink-0')
              .then(subCategoryItems => {
                subcategoriesVisibleCount = subCategoryItems.filter(':visible')
                  .length
                subcategoriesCount = subCategoryItems.length
                expect(subcategoriesVisibleCount).to.be.eql(subcategoriesCount)
              })
          }
        })
        cy.get(this.showMoreLink).should('not.exist')
      }
    })
  }

  verifyZeroProductSearchResults() {
    cy.checkElementTextIsNotEmpty(this.noResultsTitle)
    cy.get(this.searchAgainButton).should('be.visible')
    cy.get(this.productSearchTotalCount).should('not.exist')
  }

  addFirstProductToFavorites() {
    cy.get(this.addToFavouritesButton)
      .eq(0)
      .focus()
      .should('be.focused')
      .click()
  }

  openGridListView() {
    // eslint-disable-next-line cypress/no-force
    cy.get(this.gridListButton).scrollIntoView().click({ force: true })
  }

  openFirstProductPDP() {
    cy.get(this.productCardLink).eq(0).click()
  }

  getInitialProductCount() {
    cy.get(this.productSearchTotalCount)
      .invoke('text')
      .then(text => {
        cy.wrap(parseInt(text)).as('initialProductCount')
      })
  }

  getProductsPerPage() {
    cy.get(this.productCount)
      .invoke('text')
      .then(text => {
        const productsPerPage = parseInt(text.split(' ')[0])
        cy.wrap(productsPerPage).as('productsPerPage')
      })
  }

  filterByBrand(index = 0) {
    cy.intercept('POST', '/1/indexes/*/queries*').as('filterProducts')
    this.getInitialProductCount()
    cy.get(this.brandFilter)
      .find(this.filterCheckboxLabel)
      .eq(index)
      .find(this.filterCheckboxLabelText)
      .invoke('text')
      .as('labelText')
    cy.get(this.brandFilter)
      .find(this.filterCheckboxLabel)
      .eq(index)
      .click()
      .then(() => {
        cy.wait('@filterProducts').its('response.statusCode').should('eql', 200)
        cy.url().should('include', 'brand=')
      })

    cy.get('@initialProductCount').then(initialProductCount => {
      cy.get(this.productSearchTotalCount)
        .invoke('text')
        .then(newProductCount => {
          expect(parseInt(newProductCount)).to.be.lessThan(initialProductCount)
        })
    })

    cy.get('@labelText').then(labelText => {
      cy.get(this.productTile)
        .first()
        .within($ProductTile => {
          cy.get($ProductTile)
            .find(this.productCardLink)
            .find(this.productTileTitle)
            .contains(labelText, { matchCase: false })
        })
    })
  }

  filterByFirstFormat() {
    cy.intercept('POST', '/1/indexes/*/queries*').as('filterProducts')
    this.getInitialProductCount()
    cy.get(this.formatFilter)
      .find(this.filterCheckboxLabel)
      .first()
      .find(this.filterCheckboxLabelText)
      .invoke('text')
      .as('labelText')
    cy.get(this.formatFilter)
      .find(this.filterCheckboxLabel)
      .first()
      .click()
      .then(() => {
        cy.wait('@filterProducts').its('response.statusCode').should('eql', 200)
        cy.url().should('include', 'format=')
      })
    cy.get('@initialProductCount').then(initialProductCount => {
      cy.get(this.productSearchTotalCount)
        .invoke('text')
        .then(newProductCount => {
          expect(parseInt(newProductCount)).to.be.lessThan(initialProductCount)
        })
    })
    cy.get('@labelText').then(labelText => {
      cy.get(this.productTile).each($ProductTile => {
        cy.get($ProductTile)
          .find(this.productCardLink)
          .find('small')
          .should('include.text', labelText)
      })
    })
  }

  filterbyPrice(minValue, maxValue) {
    cy.intercept('POST', '/1/indexes/*/queries*').as('filterProducts')
    cy.get(this.priceFilter)
      .should('be.visible')
      .within(() => {
        cy.get(this.minField).type(minValue)
        cy.get(this.maxField).type(maxValue)
        cy.get(this.priceFilterButton)
          .click()
          .then(() => {
            cy.wait('@filterProducts')
              .its('response.statusCode')
              .should('eql', 200)
            cy.url().should('include', `priceRange=${minValue}-${maxValue}`)
          })
      })
  }

  verifyPriceRanges(minValue, maxValue) {
    cy.get(this.productTile).each($ProductTile => {
      cy.get($ProductTile)
        .find(this.productTileSellingPrice)
        .invoke('text')
        .then(text => {
          cy.wrap(parseInt(text.replace(/\D/g, '')))
        })
        .should('be.gte', minValue)
        .and('be.lte', maxValue)
    })
  }

  sortByPriceAscending() {
    cy.get(this.sortDropdown).select(1)
  }

  sortByPriceDescending() {
    cy.get(this.sortDropdown).select(2)
  }

  sortByPopular() {
    cy.get(this.sortDropdown).select(0)
  }

  verifyPriceAscending() {
    let prices = []
    cy.get(this.productTile)
      .each($ProductTile => {
        cy.get($ProductTile)
          .find(this.productTileSellingPrice)
          .invoke('text')
          .then(text => {
            let parsedPrice = parseInt(text.replace(/\D/g, ''))
            prices.push(parsedPrice)
          })
      })
      .then(() => {
        expect(prices).to.eql(prices.sort())
      })
  }

  verifyPriceDescending() {
    let prices = []
    cy.get(this.productTile)
      .each($ProductTile => {
        cy.get($ProductTile)
          .find(this.productTileSellingPrice)
          .invoke('text')
          .then(text => {
            let parsedPrice = parseInt(text.replace(/\D/g, ''))
            prices.push(parsedPrice)
          })
      })
      .then(() => {
        expect(prices).to.eql(prices.sort().reverse())
      })
  }
}
export const pop = new POP()
