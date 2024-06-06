export class Footer {
  constructor() {
    this.importantLinksId = '[data-testid="importantLinks"]'
    this.serviceLinksId = '[data-testid="serviceContactLinks"]'
    this.contactInfoContentId = '[data-testid="contactInformationContent"]'
    this.providerBlocksId = '[data-testid="providerBlocks"]'
    this.newsLetterBlockId = '[data-testid="newsletterBlock"]'
    this.newsLetterInputId = '#newsletter-email'
    this.newsLetterButtonId = '[data-testid="newsletterFormButton"]'
    this.termsConditionLinksId = '[data-testid="termsConditionsLinks"]'
    this.countrySelector = '[data-testid="localeSwitchersBlock"] select'
  }

  getFooterMenuLinks() {
    cy.get(this.importantLinksId)
      .find('ul li')
      .then(footerLinks => {
        cy.wrap(footerLinks)
          .should('be.visible')
          .its('length')
          .should('be.at.least', 6)
      })
  }

  getFooterServiceLinksLS() {
    cy.get(this.serviceLinksId)
      .should('be.visible')
      .invoke('text')
      .should('not.be.empty')

    cy.get(this.contactInfoContentId)
      .find('a')
      .then(serviceLinks => {
        cy.wrap(serviceLinks)
          .should('be.visible')
          .its('length')
          .should('eql', 2)
      })
  }

  getFooterServiceLinksXS() {
    cy.get(this.serviceLinksId).find('details').invoke('removeAttr', 'open')

    cy.get(this.serviceLinksId)
      .should('be.visible')
      .invoke('text')
      .should('not.be.empty')
    cy.get(this.serviceLinksId).click()
    cy.get(this.contactInfoContentId)
      .find('a')
      .then(serviceLinks => {
        cy.wrap(serviceLinks)
          .should('be.visible')
          .its('length')
          .should('eql', 2)
      })
  }

  getFooterProviderBlocks() {
    cy.get(this.providerBlocksId).should('be.visible')
  }

  getFooterNewsletterBlock() {
    cy.get(this.newsLetterBlockId)
      .find(this.newsLetterInputId)
      .should('be.visible')

    cy.get(this.newsLetterBlockId)
      .find(this.newsLetterButtonId)
      .should('be.visible')
  }

  getFooterTermConditionLinks() {
    cy.get(this.termsConditionLinksId)
      .should('be.visible')
      .find('ul li')
      .then(termLinks => {
        cy.wrap(termLinks).its('length').should('be.at.least', 2)
      })
  }

  selectCountry(country) {
    cy.get(this.countrySelector).select(country)
  }
}

export const footer = new Footer()
