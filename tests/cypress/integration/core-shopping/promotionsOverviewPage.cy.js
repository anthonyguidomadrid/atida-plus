const { SuiteTag } = require('../../support/enums/suiteTag')
const {
  promoDetailsPage
} = require('../../support/page-objects/pages/promoDetailsPage')
const {
  promotionsOverviewPage
} = require('../../support/page-objects/pages/promotionsOverviewPage')

const promotionsOverviewPageSlug =
  Cypress.env('locale') == 'es' ? 'promociones' : 'promocoes'
const promoSlug = 'page-for-automation-promo'
const promotionTitle = 'Test Auto Promo, Dont touch'

describe('Promotions Overview Page', () => {
  beforeEach(() => {
    cy.visit(promotionsOverviewPageSlug)
  })

  it(
    [SuiteTag.SMOKE],
    '#764 User is redirected to Promo Detail page by clicking on a promo teaser in Promotions Overview page',
    () => {
      promotionsOverviewPage.openFirstPromotionDetailPage()
      cy.url().should('include', promoSlug)
      promoDetailsPage.assertPromotionTitleIsCorrect(promotionTitle)
      promoDetailsPage.assertNumberOfPromoProductsIsCorrect(1)
    }
  )

  it(
    [SuiteTag.SMOKE],
    '#679 Promotions Overview Page is styled as expected and has all main elements displayed',
    () => {
      promotionsOverviewPage.assertPageMainComponentsAreDisplayed()
    }
  )
})
