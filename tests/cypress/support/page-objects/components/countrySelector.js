export class CountrySelector {
  constructor() {
    this.countrySelector = '[data-testid="countrySelectorHeader"]'
    this.countrySelectorButton = '[data-testid="countrySelectorButton"]'
    this.countrySelectorDropDown = '[data-testid="countrySelector"]'
    this.countrySelectorOption = '[data-testid="countrySelectorOptions"]'
  }

  assertCountrySelectorIsDisplayed() {
    cy.get(this.countrySelector).should('be.visible')
    cy.get(this.countrySelectorButton).should('be.visible')
    cy.get(this.countrySelectorDropDown).should('be.visible')
  }

  clickContinueButton() {
    cy.get(this.countrySelectorButton).click()
  }

  selectCountry(country) {
    cy.get(this.countrySelectorDropDown).select(country)
  }

  assertCountrySelectorIsNotDisplayed() {
    cy.get(this.countrySelector).should('not.exist')
  }
}

export const countrySelector = new CountrySelector()
