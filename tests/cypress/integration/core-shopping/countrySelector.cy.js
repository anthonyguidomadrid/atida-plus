import { FeatureFlag } from '../../../../src/config/constants/feature-flags'
import { SuiteTag } from '../../support/enums/suiteTag'
import { countrySelector } from '../../support/page-objects/components/countrySelector'

Cypress.Cookies.defaults({
  preserve: [
    'OptanonAlertBoxClosed',
    'AWSELBAuthSessionCookie-0',
    'AWSELBAuthSessionCookie-1'
  ]
})

describe('Country selector tests', () => {
  beforeEach(() => {
    cy.checkFlag(FeatureFlag.COUNTRY_SELECTOR_HEADER).then(
      countrySelectorFF => {
        cy.onlyOn(countrySelectorFF === true)
      }
    )
    cy.clearCookie('countrySelectorHeaderData')
  })
  it(
    [SuiteTag.SMOKE],
    '#653 should see country selector when visits the site for first time',
    () => {
      cy.visit('/')
      countrySelector.assertCountrySelectorIsDisplayed()
      countrySelector.clickContinueButton()
      countrySelector.assertCountrySelectorIsNotDisplayed()
      cy.reload()
      countrySelector.assertCountrySelectorIsNotDisplayed()
    }
  )
})
