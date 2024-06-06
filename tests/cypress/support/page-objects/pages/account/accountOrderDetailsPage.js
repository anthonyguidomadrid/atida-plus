export class AccountOrdersDetailsPage {
  constructor() {
    this.orderDetailSectionId = '.bg-secondary-champagne-pink'
    this.orderDetailsItem = '[data-testid="orderDetailsItem"]'
    this.orderDetailsItemImageId = '[data-testid="orderDetailsItemImage"]'
    this.orderDetailsItemNameLinkId = '[data-testid="orderDetailsItemNameLink"]'
    this.deliveryAddressSectionId = '[data-testid="deliveryAddressSectionId"] p'
    this.billingAddessSectionId = '[data-testid="billingAddressSectionId"] p'
    this.productPriceId = '[data-testid="productsAndPriceId"] p.font-semibold'
    this.shippingCostId = '[data-testid="shippingCostId"]'
    this.totalPriceId = '[data-testid="totalPriceId"]'
    this.taxExamptId = '[data-testid="taxExemptId"]'
    this.productNameId = '[data-testid="orderDetailsItemNameLink"]'
    this.costsSectionId = '[data-testid="costsSectionId"]'
    this.subtotalPriceId = '[data-testid="subtotalPriceId"]'
  }

  assertPriceIsCorrect(price) {
    cy.get(this.productPriceId).should('have.text', price)
  }

  assertShippingCostIsCorrect(shippingCost) {
    cy.get(this.shippingCostId).should('have.text', shippingCost)
  }

  assertTotalPriceIsCorrect(totalPrice) {
    cy.get(this.totalPriceId).should('contain.text', totalPrice)
  }

  assertTaxExampt(taxExampt) {
    cy.get(this.taxExamptId).should('have.text', taxExampt)
  }

  assertProductNameIsCorrect(productName) {
    cy.get(this.productNameId).should('have.text', productName)
  }

  assertCostsSectionProductPriceIsCorrect(productPrice) {
    cy.get(this.costsSectionId)
      .find('div')
      .eq(0)
      .find('div')
      .eq(1)
      .should('have.text', productPrice)
  }

  assertCostsSectionShippingCostIsCorrect(shippingCosts) {
    cy.get(this.costsSectionId)
      .find('>div')
      .eq(1)
      .find('div')
      .eq(1)
      .should('have.text', shippingCosts)
  }

  assertCostsSectionTotalPriceIsCorrect(totalPrice) {
    cy.get(this.subtotalPriceId)
      .find('div')
      .eq(1)
      .should('have.text', totalPrice)
  }

  getOrderData(orderData) {
    cy.get('header p').should('contain', orderData.date)
    cy.get(this.orderDetailSectionId).first().find('h5').should('contain', 1)
    cy.get(this.orderDetailSectionId)
      .last()
      .find('h4')
      .last()
      .should('contain', orderData.price)
    cy.get('main h5').should('contain', orderData.number)
    cy.get(this.orderDetailsItem)
      .should('be.visible')
      .its('length')
      .should('be.eql', 1)
    cy.get(this.orderDetailsItem)
      .find(this.orderDetailsItemImageId)
      .should('be.visible')
    cy.get(this.orderDetailsItem).should('contain', orderData.productName)
  }

  assertDeliveryAddress(address) {
    cy.get(this.deliveryAddressSectionId).should(
      'have.text',
      `${address.firstName} ${address.lastName}${address.address1} ${
        address.houseNumber
      }${address.addition}${address.zipCode} ${address.city}${
        Cypress.env('locale') == 'es' ? address.province : address.district
      }, ${
        Cypress.env('locale') == 'es'
          ? 'España' + address.province + ', España'
          : 'Portugal' + address.district + ', Portugal'
      }`
    )
  }

  assertBillingAddress(address) {
    cy.get(this.billingAddessSectionId).should(
      'have.text',
      `${address.firstName} ${address.lastName}${address.address1} ${
        address.houseNumber
      }${address.addition}${address.zipCode} ${address.city}${
        Cypress.env('locale') == 'es' ? address.province : address.district
      }, ${
        Cypress.env('locale') == 'es'
          ? 'España' + address.province + ', España'
          : 'Portugal' + address.district + ', Portugal'
      }`
    )
  }
}
export const accountOrdersDetailsPage = new AccountOrdersDetailsPage()
