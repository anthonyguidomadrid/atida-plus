import { SuiteTag } from '../../support/enums/suiteTag'
import { header } from '../../support/page-objects/components/header'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import { bdp } from '../../support/page-objects/pages/bdp'
import { skipOn } from '@cypress/skip-test'
const acorelleBDP = 'marca/acorelle'

describe('Brand details page tests', () => {
  beforeEach(() => {
    cy.visit(acorelleBDP)
    cy.viewport('macbook-13')
    cy.checkFlag(addToBasket.basketNotificationFF).as('basketNotificationFF')
  })
  it(
    [SuiteTag.SMOKE],
    '#662 User can add to basket from Brand Detail Page',
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
    '#664 Brand Detail Page is styled as expected and has all main elements displayed',
    () => {
      bdp.assertMainComponentsAreDisplayed()
    }
  )
})
