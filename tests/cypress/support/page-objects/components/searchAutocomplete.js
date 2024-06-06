import { pop } from '../pages/pop'
import { pdp } from '../pages/pdp'

export class SearchAutoComplete {
  constructor() {
    this.searchInput = 'input.aa-Input'
    this.autocompletePanel =
      '.aa-Panel section[data-autocomplete-source-id="products"]'
    this.autoCompleteButton = '[data-testid="autoComplete"] button'
    this.trendingText = this.autocompletePanel + ' .aa-SourceHeader'
    this.productResultsList =
      '[data-autocomplete-source-id="products"] ul.aa-List'
    this.productResultListItem = 'li.aa-Item'
    this.productResultListItemLink = 'a.aa-ItemLink'
    this.productResultListItemName = '.aa-ItemNameHolder p'
    this.productResultListItemPrice = '.aa-ItemPrice'
    this.productResultListItemSize = '.aa-ItemNameHolder span'
    this.productResultsViewAll = 'button[data-testid="searchbarViewAll"]'
    this.searchIcon = 'form.aa-Form button[type="submit"]'
  }

  openSearchAutocompletePanel() {
    cy.get(this.searchInput).click()
  }

  verifyProductSearchResultsAmount(numberofResults) {
    cy.get(this.productResultsList)
      .children(this.productResultListItem)
      .its('length')
      .should('eql', numberofResults)
  }

  verifyProductSearchResults() {
    cy.get(this.productResultsList)
      .find(this.productResultListItem)
      .each($ProductResult => {
        cy.get($ProductResult)
          .find(this.productResultListItemName)
          .invoke('text')
          .should('not.be.empty')

        cy.get($ProductResult)
          .find(this.productResultListItemPrice)
          .invoke('text')
          .then(text => {
            cy.wrap(parseInt(text.replace(/\D/g, '')))
          })
          .should('be.gt', 0)
      })
  }

  enterDesktopSearchTerm(term) {
    cy.intercept('POST', '/1/indexes/*/queries*', req => {
      let body = JSON.parse(req.body)
      if (body.requests[0] && body.requests[0].query == term) {
        req.alias = 'fetchProductResults'
      }
    })
    cy.get(this.searchInput).click().type(term, { delay: 2 })
    cy.wait('@fetchProductResults').then(fetchProductResults => {
      let productResults = fetchProductResults.response.body.results.pop()
      cy.wrap(productResults.nbHits).as('hits')
    })
  }

  selectFirstResult() {
    cy.get(this.productResultListItemLink).first().click()
  }

  submitSearchForm() {
    cy.get(searchAutoComplete.searchInput).click().type('{enter}')
  }

  clickViewAllButton() {
    cy.get(searchAutoComplete.productResultsViewAll).click()
  }

  clickSearchIcon() {
    cy.get(this.searchIcon).click()
  }

  verifySearchResultsPage(term, hits) {
    cy.url().should('include', `?search=${term}`)
    cy.get(pop.productTile).should('have.length.gte', 1)
    cy.get(hits).then(hits => {
      cy.get(pop.productCount).invoke('text').should('include', hits)
    })
  }

  captureFirstProductData(nameAlias, priceAlias) {
    cy.get(this.productResultListItemName).first().invoke('text').as(nameAlias)

    cy.get(this.productResultListItemPrice)
      .first()
      .invoke('text')
      .as(priceAlias)
  }

  verifyPdpData(name, price) {
    cy.get(name).then(name => {
      cy.get(pdp.pdpHeader).find('h1').invoke('text').should('eql', name)
    })
    cy.get(price).then(price => {
      cy.get(pdp.pdpSinglePrice).invoke('text').should('include', price)
    })
  }
}

export const searchAutoComplete = new SearchAutoComplete()
