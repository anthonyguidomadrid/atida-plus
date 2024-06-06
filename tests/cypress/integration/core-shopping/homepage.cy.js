import { SuiteTag } from '../../support/enums/suiteTag'
import { header } from '../../support/page-objects/components/header'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import { homepage } from '../../support/page-objects/pages/homepage'
import { skipOn } from '@cypress/skip-test'

describe([SuiteTag.SMOKE], 'Responsive homepage tests', () => {
  const resolutions = [
    'samsung-s10-plus',
    'iphone-se',
    'ipad-pro',
    'ms-surface',
    'full-hd',
    'imac'
  ]

  beforeEach(() => {
    cy.visit('/')
  })

  it('#681 displays hero block', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      homepage.getHeroBlock()
    })
  })

  it('#373 displays contact block', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      homepage.getContactBlock()
    })
  })

  it('#373 displays category block', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      homepage.getCategoryBlock(7)
    })
  })

  it('#373 displays usp block', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      homepage.getUspBlock()
    })
  })
})

describe(
  'Exponea recommendations',
  { retries: { openMode: 1, runMode: 2 } },
  () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/recommendations/fetch').as(
        'getRecommendedProducts'
      )
      cy.viewport('iphone-xr')
      cy.visit('/')

      cy.wait('@getRecommendedProducts')
        .its('response.statusCode')
        .should('eql', 200)
      cy.checkFlag(addToBasket.basketNotificationFF).as('basketNotificationFF')
    })

    it(
      [SuiteTag.SMOKE],
      '#909 User can add to basket from Exponea Recommendations block',
      () => {
        homepage.getRecommendationBlock()
        addToBasket.addFirstActiveProductToTheBasket()
        addToBasket.verifyModalSuccess()
        cy.get('@basketNotificationFF').then(basketNotificationFF => {
          skipOn(basketNotificationFF === true, () => {
            addToBasket.assertProductQuantityIsCorrect(1)
            addToBasket.closeMinicart()
          })
        })
        header.checkItemsCount(1)
      }
    )
  }
)
