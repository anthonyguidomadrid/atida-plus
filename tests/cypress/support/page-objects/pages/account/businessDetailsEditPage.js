export class BusinessDetailsEditPage {
  constructor() {
    this.companyNameField =
      '[data-testid="UpdateBusinessDetailsFormCompanyNameField"]'
    this.taxReferenceField =
      '[data-testid="UpdateBusinessDetailsFormTaxReference"]'
    this.saveButton = '[data-testid="UpdateBusinessDetailsFormButtonk"]'
    this.cancelButton = '[data-testid="cancelUpdateAccountFormButton"]'
  }

  enterCompanyName(companyName) {
    cy.fillInTextField(this.companyNameField, companyName)
  }

  enterTaxReference(taxReference) {
    cy.fillInTextField(this.taxReferenceField, taxReference)
  }

  clickSaveBusinsessDetailsButton() {
    cy.get(this.saveButton).click()
  }

  clickCancelButton() {
    cy.get(this.cancelButton).click()
  }
}

export const businessDetailsEditPage = new BusinessDetailsEditPage()
