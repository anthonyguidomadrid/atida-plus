import { SuiteTag } from '../../support/enums/suiteTag'
import { footer } from '../../support/page-objects/components/footer'

describe([SuiteTag.SMOKE], '#779 Responsive footer tests', () => {
  const resolutions = ['samsung-s10-plus', 'iphone-se', 'ipad-pro', 'full-hd']
  beforeEach(() => {
    cy.visit('/')
  })

  it('#779 displays footer menu links', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      footer.getFooterMenuLinks()
    })
  })

  it('#779 displays footer service links', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      if (resolution !== 'samsung-s10-plus' && resolution !== 'iphone-se') {
        footer.getFooterServiceLinksLS()
      } else {
        footer.getFooterServiceLinksXS()
      }
    })
  })

  it('#779 displays footer provider blocks', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      footer.getFooterProviderBlocks()
    })
  })

  it('#779 displays footer newsletter block', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      footer.getFooterNewsletterBlock()
    })
  })

  it('#779 displays footer terms and conditions links', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      footer.getFooterTermConditionLinks()
    })
  })
})

describe('Footer is rendered on other pages', () => {
  const pageUrls = [{ Brand_POP: '/marca/nivea' }, { Basket: '/basket' }]

  pageUrls.forEach(object => {
    const pageName = Object.keys(object)[0]
    const pageUri = object[Object.keys(object)[0]]

    describe(`Footer tests on page ${pageName}`, () => {
      beforeEach(() => {
        cy.viewportPreset('samsung-s10-plus')
        cy.visit(`${pageUri}`)
      })

      it('displays footer menu links', () => {
        footer.getFooterMenuLinks()
      })

      it('displays footer service links', () => {
        footer.getFooterServiceLinksXS()
      })

      it('displays footer provider blocks', () => {
        footer.getFooterProviderBlocks()
      })

      it('displays footer newsletter block', () => {
        footer.getFooterNewsletterBlock()
      })

      it('displays footer terms and conditions links', () => {
        footer.getFooterTermConditionLinks()
      })
    })
  })
})

describe('Footer country selector', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it(
    [SuiteTag.SMOKE],
    '#654 User can switch countries using country selector',
    () => {
      let newLocale = Cypress.env('locale') == 'es' ? 'pt-pt' : 'es-es'
      footer.selectCountry(newLocale)
      cy.url().should('contain', newLocale)
    }
  )
})
