export class BusinessDetailsPage {
  constructor() {
    this.companyName = '[data-testid="businessDetailsCompanyName"] p'
    this.taxReference = '[data-testid="businessDetailsTaxReference"]'
    this.editBusinessDetailsLink = '[data-testid="preference-panel-link"]'
  }

  assertCompanyNameIsCorrect(companyName) {
    cy.get(this.companyName).should('have.text', companyName)
  }

  assertTaxReferenceIsCorrect(taxReference) {
    cy.get(this.taxReference)
      .find('span')
      .eq(1)
      .should('have.text', taxReference)
  }

  clickEditBusinsessDetailsLink() {
    cy.get(this.editBusinessDetailsLink).click()
  }
}

export const businessDetailsPage = new BusinessDetailsPage()
