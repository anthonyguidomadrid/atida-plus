import { error404 } from '../../support/page-objects/pages/error404'
const homePageURL = Cypress.config('baseUrl').slice(0, -1)
const error404PageURL = '404'

describe('Functional 404 tests', () => {
  const resolutions = ['samsung-s10-plus', 'iphone-se', 'ipad-pro', 'full-hd']
  beforeEach(() => {
    error404.visitError404Page(error404PageURL)
  })

  it('displays 404 page elements', () => {
    resolutions.forEach(resolution => {
      cy.viewportPreset(resolution)
      error404.getPageHeading()
      error404.getPageIcon()
      error404.getBackToHomeButton()
    })
  })

  it('redirects to home page', () => {
    error404.clickBackToHomeButton()
    error404.verifyRedirectToHomepage(homePageURL)
  })
})
