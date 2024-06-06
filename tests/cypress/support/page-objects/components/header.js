export class Header {
  constructor() {
    this.searchBar = '[data-testid="autoComplete"]'
    this.topheaderId = '[data-testid="topHeader"]'
    this.subHeaderId = '[data-testid="subHeader"]'
    this.headerNavigation = '[data-testid="headerNavigation"]'
    this.subHeaderActionLinks = '[data-testid="headerActions"]'
    this.subHeaderLoginId = '[data-testid="menuItemsLogin"] a'
    this.subHeaderBasketId = '[data-testid="headerActionsBasket"]'
    this.subHeaderAccountButton = '[data-testid=accountMenuButton]'
    this.accountMenuHeader = '[data-testid="drawerHeader"]'
    this.accountMenuDetailsLinkId = 'header [data-testid="menuItemDetails"]'
    this.accountMenuAddressBookLinkId =
      'header [data-testid="menuItemAddressBook"]'
    this.accountMenuOverviewLinkId = 'header [data-testid="menuItemOverview"]'
    this.accountMenuHistoryLinkId = 'header [data-testid="menuItemHistory"]'
    this.headerSearchBarPlaceholder = '.aa-DetachedSearchButtonPlaceholder'
    this.headerActionsFavouritesId = '[data-testid="favouritesIcon"]'
    this.headerFavouritesBadgeId = '[data-testid="favouritesBadge"]'
    this.basketItemsId = '[data-testid="basketItems"]'
    this.atidaLogo = '.icon-logo-mifarma'
    this.addressBookId = '[data-testid="menuItemAddressBook"]'
    this.navLinkId = '[data-testid="navLink"]'
  }

  assertNameIsDisplayedInMenuButton(customerName) {
    cy.get(this.subHeaderAccountButton)
      .find('p')
      .invoke('text')
      .should('contain', customerName)
  }

  assertNameIsNotDisplayedInMenuButton(customerName) {
    cy.get(this.subHeaderAccountButton)
      .find('p')
      .invoke('text')
      .should('not.contain', customerName)
  }

  openPromotionsPage() {
    //eslint-disable-next-line cypress/no-force
    cy.get(this.headerNavigation)
      .find(this.navLinkId)
      .eq(0)
      .click({ force: true })
  }

  openBrandsPage() {
    //eslint-disable-next-line cypress/no-force
    cy.get(this.headerNavigation)
      .find('a[href*="marcas"]')
      .click({ force: true })
  }

  clickHeaderAtidaLogo() {
    cy.get(this.atidaLogo).first().click()
  }

  getTopHeaderItems(value) {
    cy.get(this.topheaderId)
      .find(`[data-testid="${value}"]`)
      .should('be.visible')
      .invoke('text')
      .should('not.be.empty')
  }

  getSubHeaderLogo() {
    cy.get(this.subHeaderId).find('.icon-logo-mifarma').should('be.visible')
  }

  getSubHeaderSearchBar() {
    cy.get(header.searchBar)
      .find(header.headerSearchBarPlaceholder)
      .invoke('text')
      .should('not.be.empty')
  }

  getSubHeaderActionLinks() {
    cy.get(this.subHeaderActionLinks).children().should('have.length.gte', 3)
  }

  clickLinkFromAccounMenu(submenuItem) {
    cy.get(this.subHeaderAccountButton).focus()
    cy.get(submenuItem).should('be.visible').find('a').click()
  }

  clickFavouritesPinIcon(intercept = false) {
    if (intercept) {
      cy.intercept('GET', '/api/favourites/get-favourites', req => {
        delete req.headers['if-none-match']
      }).as('getFavourites')
      cy.get(this.headerActionsFavouritesId).click()
      cy.wait('@getFavourites').its('response.statusCode').should('eql', 200)
    } else {
      cy.get(this.headerActionsFavouritesId).click()
    }
  }

  clickBasketButton() {
    cy.get(this.subHeaderBasketId).click()
    cy.url().should('include', '/basket')
  }

  openAccountMenu() {
    cy.get(this.subHeaderAccountButton).focus()
  }

  openAddressBook(intercept = true) {
    this.openAccountMenu()
    cy.get(this.accountMenuAddressBookLinkId).should('be.visible').click()
  }

  openAccountDetails(intercept = true) {
    this.openAccountMenu()
    cy.get(this.accountMenuDetailsLinkId).should('be.visible').click()
  }

  clickLogoutButton() {
    cy.intercept('POST', ' /api/account/logout').as('logout')
    this.openAccountMenu()
    cy.get(this.subHeaderLoginId).should('be.visible').click()
    cy.wait('@logout').its('response.statusCode').should('eql', 204)
  }

  checkItemsCount(count, assertion = 'eql') {
    cy.get(this.subHeaderId)
      .find(this.basketItemsId)
      .should('be.visible')
      .invoke('text')
      .then(itemCount => {
        cy.wrap(parseInt(itemCount)).should(assertion, count)
      })
  }
}

export const header = new Header()
