const { SuiteTag } = require('../../support/enums/suiteTag')
const {
  brandsOverviewPage
} = require('../../support/page-objects/pages/brandsOverviewPage')

const brandOverviewPageSlug = 'marcas'
describe('Brands Overview Page', () => {
  beforeEach(() => {
    cy.visit(brandOverviewPageSlug)
  })

  it(
    [SuiteTag.SMOKE],
    '#665 User sees Brands Overview Page styled and all elements displayed as expected',
    () => {
      brandsOverviewPage.assertPageMainComponentsAreDisplayed()
    }
  )
})
