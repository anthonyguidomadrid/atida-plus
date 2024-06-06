import { searchAutoComplete } from '../../support/page-objects/components/searchAutocomplete'
import { SuiteTag } from '../../support/enums/suiteTag'

const broadSearchTerm = 'shampoo'
const narrowSearchTerm = 'bioderma'
const sku = '846502351931'
const sizes = ['macbook-16', 'iphone-xr']

sizes.forEach(size => {
  describe(
    [SuiteTag.SMOKE],
    `Autocomplete search panel - ${size}`,
    { retries: { openMode: 1, runMode: 1 } },
    () => {
      beforeEach(() => {
        cy.viewport(size)
        cy.visit('/')
        //eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
        //eslint-disable-next-line cypress/no-force
        cy.get(searchAutoComplete.autoCompleteButton).click({ force: true })
      })

      it(
        [SuiteTag.REGRESSION],
        '#307 displays 5 trending products when search field is focused',
        () => {
          searchAutoComplete.openSearchAutocompletePanel()
          searchAutoComplete.verifyProductSearchResultsAmount(5)
          searchAutoComplete.verifyProductSearchResults()

          cy.get(searchAutoComplete.trendingText)
            .invoke('text')
            .should('not.be.empty')
        }
      )

      it('#389 displays 5 results when broad search term is entered', () => {
        searchAutoComplete.enterDesktopSearchTerm(broadSearchTerm)
        searchAutoComplete.verifyProductSearchResultsAmount(5)
        searchAutoComplete.verifyProductSearchResults()

        cy.get('@hits').then(hits => {
          cy.get(searchAutoComplete.productResultsViewAll)
            .invoke('text')
            .should('include', hits)
        })
      })

      it('#388 displays 1 result when valid SKU is used as the search term', () => {
        searchAutoComplete.enterDesktopSearchTerm(sku)
        searchAutoComplete.verifyProductSearchResultsAmount(1)
        searchAutoComplete.verifyProductSearchResults()

        cy.get(searchAutoComplete.productResultsViewAll)
          .invoke('text')
          .then(text => {
            cy.wrap(parseInt(text.replace(/\D/g, '')))
          })
          .should('eql', 1)
      })

      it('#389 redirects to PDP when first product is selected from autocomplete results', () => {
        searchAutoComplete.enterDesktopSearchTerm(narrowSearchTerm)
        searchAutoComplete.captureFirstProductData(
          'productName',
          'productPrice'
        )
        searchAutoComplete.selectFirstResult()
        searchAutoComplete.verifyPdpData('@productName', '@productPrice')
      })

      it('#389 redirects to search results page when the search form is submitted', () => {
        searchAutoComplete.enterDesktopSearchTerm(broadSearchTerm)
        searchAutoComplete.submitSearchForm()
        searchAutoComplete.verifySearchResultsPage(broadSearchTerm, '@hits')
      })

      it('#388 redirects to search results page when view all products button is clicked', () => {
        searchAutoComplete.enterDesktopSearchTerm(sku)
        searchAutoComplete.clickViewAllButton()
        searchAutoComplete.verifySearchResultsPage(sku, '@hits')
      })

      it('#389 redirects to search results page when the search icon is clicked', () => {
        searchAutoComplete.enterDesktopSearchTerm(narrowSearchTerm)
        searchAutoComplete.clickSearchIcon()
        searchAutoComplete.verifySearchResultsPage(narrowSearchTerm, '@hits')
      })
    }
  )
})
