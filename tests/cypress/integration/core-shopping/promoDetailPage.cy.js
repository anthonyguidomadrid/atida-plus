import { SuiteTag } from '../../support/enums/suiteTag'
import { header } from '../../support/page-objects/components/header'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import { promoDetailsPage } from '../../support/page-objects/pages/promoDetailsPage'
import { skipOn } from '@cypress/skip-test'

const promoDetailPageSlug = 'page-for-automation-promo'
describe('Promotion Detail Page', () => {
  beforeEach(() => {
    cy.visit(promoDetailPageSlug)
    cy.checkFlag(addToBasket.basketNotificationFF).as('basketNotificationFF')
  })
  it(
    [SuiteTag.SMOKE],
    '#671 User can add to basket from the listing in Promo Detail Page',
    () => {
      addToBasket.addFirstActiveProductToTheBasket()
      addToBasket.verifyModalSuccess()
      cy.get('@basketNotificationFF').then(basketNotificationFF => {
        skipOn(basketNotificationFF === true, () => {
          addToBasket.assertProductQuantityIsCorrect(1)
          addToBasket.closeMinicart()
        })
      })
      addToBasket.verifyAddToBasketProductCount(1)
      header.checkItemsCount(1, 'be.at.least')
    }
  )

  it(
    [SuiteTag.SMOKE],
    '#669 User is redirected to a Product Page by clicking on product tile in Promo Detail Page listing',
    () => {
      promoDetailsPage.clickProductTile()
      promoDetailsPage.assertPdpIsLoaded()
    }
  )

  it(
    [SuiteTag.SMOKE],
    '#673 Promo Detail Page is styled as expected and has all main elements displayed',
    () => {
      promoDetailsPage.assertMainComponentsAreDisplayed()
    }
  )
})
