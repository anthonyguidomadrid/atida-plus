import { pop } from '../../support/page-objects/pages/pop'
import { SuiteTag } from '../../support/enums/suiteTag'

const validSearchTerm = 'bioderma'
const genericSearchTerm = 'shampoo'
const invalidSearchTerm = 'blqblq'

describe([SuiteTag.SMOKE], '#389 Valid search term', () => {
  beforeEach(() => {
    cy.viewportPreset('samsung-s10-plus')
    cy.visit(`?search=${validSearchTerm}`)
    pop.getProductsPerPage()
  })

  it('displays initial results on page', () => {
    cy.checkElementTextIsNotEmpty(pop.productSearchTotalCount)
    cy.get(pop.searchTerm).invoke('text').should('contain', validSearchTerm)
    cy.get('@productsPerPage').then(productsPerPage => {
      pop.getProductSearchList(productsPerPage, 'be.eql')
    })
  })

  it('displays second page of results on page', () => {
    cy.intercept('POST', '/1/indexes/*/queries*').as('loadMoreProducts')
    cy.get(pop.infinitePaginationButton).should('be.visible').click()
    cy.wait('@loadMoreProducts').its('response.statusCode').should('eql', 200)
    cy.url().should('include', 'page=2')
    cy.get('@productsPerPage').then(productsPerPage => {
      pop.getProductSearchList(productsPerPage + 1, 'be.at.least')
    })
  })
})

describe([SuiteTag.REGRESSION], '#308 Invalid search term', () => {
  beforeEach(() => {
    cy.viewportPreset('iphone-se')
    cy.visit(`?search=${invalidSearchTerm}`)
  })

  it('displays zero results on page', () => {
    pop.verifyZeroProductSearchResults()
    cy.get(pop.searchTerm).invoke('text').should('contain', invalidSearchTerm)
  })
})

describe('Filter and sort search results - desktop', () => {
  beforeEach(() => {
    cy.intercept('POST', '/1/indexes/*/queries*').as('filterProducts')
    cy.viewport('macbook-16')
    cy.visit(`?search=${genericSearchTerm}`)
  })

  it([SuiteTag.SMOKE], '#390, #686 Filter by brand', () => {
    pop.filterByBrand(0)
  })

  it([SuiteTag.SMOKE], '#390, #684 Filter by price', () => {
    pop.filterbyPrice(3, 5)
    pop.verifyPriceRanges(300, 500)
  })

  it('#390 Filter by format', () => {
    pop.filterByFirstFormat()
  })

  it([SuiteTag.SMOKE], '#391 Sort by price ascending', () => {
    pop.sortByPriceAscending()
    cy.wait('@filterProducts').its('response.statusCode').should('eql', 200)
    cy.wait('@filterProducts').its('response.statusCode').should('eql', 200)
    pop.verifyPriceAscending()
  })

  it([SuiteTag.SMOKE], '#391 Sort by price descending', () => {
    pop.sortByPriceDescending()
    cy.wait('@filterProducts').its('response.statusCode').should('eql', 200)
    cy.wait('@filterProducts').its('response.statusCode').should('eql', 200)
    pop.verifyPriceDescending()
  })
})
