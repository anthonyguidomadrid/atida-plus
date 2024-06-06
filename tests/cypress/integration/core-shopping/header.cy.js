import { header } from '../../support/page-objects/components/header'
import { DbHelper } from '../../support/db.helper'
import { promotionsOverviewPage } from '../../support/page-objects/pages/promotionsOverviewPage'
import { brandsOverviewPage } from '../../support/page-objects/pages/brandsOverviewPage'
import { SuiteTag } from '../../support/enums/suiteTag'
const dbhelper = new DbHelper()
const locale = Cypress.env('locale')
const productId = locale == 'es' ? 77 : 167
const popUrl =
  locale == 'es'
    ? '/vitaminas-suplementos/vitaminas-bebes-ninos'
    : '/vitaminas-suplementos/minerais'

Cypress.on('uncaught:exception', (err, runnable) => {
  // temporary hack due to type error post-checkout
  return false
})

describe([SuiteTag.SMOKE], 'Responsive header tests', () => {
  const resolutions = ['samsung-s10-plus', 'iphone-se', 'ipad-pro', 'full-hd']

  beforeEach(() => {
    dbhelper.buildAndGetProdUrlSlugByIds(19756, productId).then(data => {
      cy.visit(`${data.rows[0].url_slug}`)
    })
  })

  it('#780 displays top header', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      header.getTopHeaderItems('usp1')

      if (resolution !== 'samsung-s10-plus' && resolution !== 'iphone-se') {
        header.getTopHeaderItems('usp2')
        header.getTopHeaderItems('usp3')
      }
    })
  })

  it('#780 displays sub header', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      header.getSubHeaderLogo()
      header.getSubHeaderActionLinks()
      header.getSubHeaderSearchBar()
    })
  })
})

describe('Mobile header is rendered on multiple pages', () => {
  const pageUrls = [{ POP: popUrl }, { Homepage: '/' }, { Basket: '/basket' }]

  pageUrls.forEach(object => {
    const pageName = Object.keys(object)[0]
    const pageUri = object[Object.keys(object)[0]]

    describe(`Page: ${pageName}`, () => {
      beforeEach(() => {
        cy.viewportPreset('iphone-se')
        cy.visit(`${pageUri}`)
      })

      it('displays top header', () => {
        header.getTopHeaderItems('usp1')
      })

      it('displays sub header', () => {
        header.getSubHeaderLogo()
        header.getSubHeaderActionLinks()
        header.getSubHeaderSearchBar()
      })
    })
  })
})

describe('Navigation header links ', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.viewport('macbook-13')
  })

  it(
    [SuiteTag.SMOKE],
    '#873 Navigation header links should be available - promotions',
    () => {
      header.openPromotionsPage()
      cy.url().should(
        'contain',
        Cypress.env('locale') === 'es' ? 'promociones' : 'promocoes'
      )
      promotionsOverviewPage.assertPageMainComponentsAreDisplayed()
    }
  )

  it(
    [SuiteTag.SMOKE],
    '#873 Navigation header links should be available - brands',
    () => {
      header.openBrandsPage()
      cy.url().should('contain', 'marcas')
      brandsOverviewPage.assertPageMainComponentsAreDisplayed()
    }
  )
})
