import { FeatureFlag } from '../../../../../src/config/constants/feature-flags'
import { capitalizeFirstLetter } from '../../helper'
const logger = require('pino')()

export class CheckoutPage {
  constructor() {
    this.checkoutPageTitleId = 'main h1#delivery-step-title'
    this.checkoutStepper = '[data-testid="CheckoutStepper"]'
    this.checkoutStandardDeliveryBlockId =
      '[data-testid="checkoutDeliveryMethod-3"]'
    this.checkoutSpainStandardDeliveryBlockId =
      '[data-testid="checkoutDeliveryMethod-4"]'
    this.checkoutExpressDeliveryBlockId =
      '[data-testid="checkoutDeliveryMethod-8"]'
    this.checkoutDeliveryFieldsetId = '[data-testid="checkoutDeliveryMethods"]'
    this.checkoutRadioButtonId = 'input[type=radio]'
    this.checkoutDescriptionId = '.border-ui-grey-lightest'
    this.toPaymentButtonId = '[data-testid="toPaymentButton"]'
    this.checkoutPaymentHeaderId = 'h1#payment-step-title'
    this.checkoutPaymentMethodMultibanco =
      '[data-testid="checkoutPaymentMethod-multibanco"]'
    this.checkoutPaymentMethodBraintree =
      '[data-testid="checkoutPaymentMethod-braintree"]'
    this.checkoutPaymentMethodBraintreeCard =
      '[data-testid="checkoutPaymentMethod-braintree_card"]'
    this.checkoutPaymentMethodBraintreePayPal =
      '[data-testid="checkoutPaymentMethod-braintree_paypal"]'
    this.termsConditionsCheckboxId =
      '[data-testid="termsAndConditionsCheckBox"]'
    this.braintreeMethodId = '[data-testid="braintreeMethod-visa-master"]'
    this.braintreePayNowButton = '#unique-sticky-pay-now-button'
    this.availableMethodsId = '[data-braintree-id="methods-container"]'
    this.newCardToggle = '[data-braintree-id="toggle"]'
    this.braintreeCreditCardNumberId = '#braintree-hosted-field-number'
    this.braintreeExpirationDateId = '#braintree-hosted-field-expirationDate'
    this.braintreeCvvNumberId = '#braintree-hosted-field-cvv'
    this.creditCardNumberId = '#credit-card-number'
    this.expirationDateId = '#expiration'
    this.cvvId = '#cvv'
    this.otpFieldId = 'input.input-field'
    this.paymentTabId = '[role="payment"]'
    this.erroredBraintreeNumberId = '[data-braintree-id="number-field-error"]'
    this.erroredBraintreeDateId =
      '[data-braintree-id="expiration-date-field-error"]'
    this.erroredBraintreeCvvId = '[data-braintree-id="cvv-field-error"]'
    this.braintreeCreditCardContainerId = '[data-braintree-id="card"]'
    this.confirmationPageTitleId = '[data-testid="orderMessage"]'
    this.braintreeMethodPaypalButtonId =
      '[data-testid="braintreeMethod-paypal"]'
    this.paypalIframeId = '.zoid-component-frame'
    this.otpIframeID = '#Cardinal-CCA-IFrame'
    this.paypalCheckoutButtonId = '[data-funding-source="paypal"]'
    this.mbWayPhoneInput = 'div.adyen-checkout-phone-number input'
    this.mbWayButton = '#unique-pay-now-button'
    this.mbWayError = '#number_error'
    this.multiBancoAdyenMethodId =
      '[data-testid="checkoutPaymentMethod-adyen_multibanco"]'
    this.mbWayAdyenMethodId =
      '[data-testid="checkoutPaymentMethod-adyen_mbway"]'
    this.multibancoAdyenPaymentButtonId = '#unique-sticky-pay-now-button'
    this.confirmationBlockMultibancoSibs =
      '[data-testid="action-sibs-multibanco"]'
    this.orderSummary = '[data-testid="orderSummary"]'
    this.editCartButton = '[data-testid="orderSummaryProductList"] a'
    this.basketSummaryOrderButton = '[data-testid="basketSummaryOrderButton"]'
    this.productQuantityOnCheckout = '[data-testid="basket-link-holder"]'
    this.orderSummaryProductList = '[data-testid="orderSummaryProductList"]'
    this.checkoutSpainDeliveryBlockId =
      '[data-testid="checkoutDeliveryMethod-4"]'
    this.bizumPaymentMethod =
      '[data-testid="paymentMethodCheckBox-redsys_bizum"]'
    this.bizumPaymentButtonId = '#unique-sticky-pay-now-button'
    this.bizumTelephoneId = '#iPhBizInit'
    this.bizumContinueButtonId = '#bBizInit'
    this.bizumCompleteOrderButtonId = 'input.btn-continue'
    this.bizumErrorMessage = '#mensaje-error-no-disp'
    this.notificationBox = '[data-testid="notification"]'
    this.paypalPaymentButton = '#unique-sticky-pay-now-button'
    this.notificationModal = '[data-testid="notificationModalLayout"]'
    this.taxExemptPopupButton =
      '[data-testid="notificationModalLayoutConfirmButton"]'
    this.deliveryBlockShippingPrice = '[data-testid="delivery"]'
    this.totalPrice = '[data-testid="total-products"]'
    this.orderPageDiscountId = '[data-testid="rrpDiscount"]'
    this.orderDetailsDivId = '[data-testid="yourOrderDiv"]'
    this.basketCartRuleOrderSummaryId = '[data-testid="rrpDiscount"]'
    this.multiBancoStripeMethodId =
      '[data-testid="checkoutPaymentMethod-stripe_multibanco"]'
    this.multibancoStripePaymentButtonId =
      '[data-testid="stripe-multibanco-payment-button"]'
    this.guestCheckoutForm = '[data-testid="guestCheckoutForm"]'
    this.guestCheckoutFormFname =
      '[data-testid="guestCheckoutFormFirstNameField"]'
    this.guestCheckoutZipCode =
      '[data-testid="ShippingAddressFormZipCodeField"]'
    this.guestCheckoutFormButton = '[data-testid="guestCheckoutFormButton"]'
  }

  clickOnTaxExemptButtonId() {
    cy.get(this.toPaymentButtonId)
      .should('be.visible')
      .then(() => {
        cy.get('body').then($body => {
          if ($body.find(this.notificationModal).length > 0) {
            cy.get(this.taxExemptPopupButton).should('be.visible').click()
          } else {
            return
          }
        })
      })
  }

  checkDeliveryMethodInformation(shippingPrice, minDays) {
    cy.get(this.totalPrice)
      .find('span')
      .eq(1)
      .then($element => {
        const price = parseInt($element.text()) > 49 ? 'Gratis' : shippingPrice
        cy.get(this.deliveryBlockShippingPrice).last().should('contain', price)
      })

    cy.get(this.checkoutDeliveryFieldsetId).contains(
      `${minDays}-${minDays + 2}`
    )
  }

  selectDeliveryMethod() {
    cy.get(this.toPaymentButtonId).should('be.enabled').click()
  }

  selectPaymentMethod(paymentMethod) {
    cy.get(paymentMethod).click()
  }

  editCart() {
    cy.get(this.orderDetailsDivId).find('button').click()
    cy.get(this.editCartButton).should('be.visible').click()
  }

  verifyNewQuantityOnCheckout(newQuantity) {
    cy.get(this.orderDetailsDivId).find('button').click()

    cy.get(this.orderSummaryProductList)
      .find('span')
      .first()
      .invoke('text')
      .then(text => {
        cy.wrap(parseInt(text.replace(/\D/g, '')))
      })
      .should('eql', newQuantity)
  }

  selectBraintreePaymentMethod(paymentBlockMethodId) {
    cy.get(paymentBlockMethodId)
      .find('input')
      .then($element => {
        if ($element.is(':not(:checked)')) {
          cy.get(paymentBlockMethodId).should('be.visible').click()
        }
      })
  }

  selectMultibancoPaymentMethod(paymentBlockMethodId, paymentButtonId) {
    this.selectPaymentMethod(paymentBlockMethodId)
    cy.get(paymentButtonId).click()
  }

  selectBizumPaymentMethod(paymentBlockMethodId, paymentButtonId) {
    this.selectPaymentMethod(paymentBlockMethodId)
    cy.get(paymentButtonId).click()
  }

  checkAvailableMethod() {
    cy.get(this.availableMethodsId)
      .find('.braintree-method--active')
      .should('be.visible')
  }

  fillInCheckoutCardField(iframeId, fieldId, fieldValue) {
    cy.get(iframeId)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(body => {
        cy.wrap(body).find(fieldId).type(fieldValue)
      })
  }

  fillInOtpField(iframeId, fieldId, fieldValue) {
    cy.intercept(
      'POST',
      'https://centinelapistag.cardinalcommerce.com/V1/Order/JWT/Continue'
    ).as('3dSecureJwt')

    cy.wait('@3dSecureJwt')

    cy.wait(1000) // eslint-disable-line cypress/no-unnecessary-waiting

    cy.get(iframeId)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(body => {
        cy.wrap(body).find(fieldId).type(`${fieldValue}{enter}`)
      })
  }

  clickOnPaypalCheckoutButton() {
    cy.get(this.paypalPaymentButton).should('be.visible').click()
  }

  fillInMbwayPaymentPhone(phoneNumber) {
    cy.fillInTextField(this.mbWayPhoneInput, phoneNumber)
    cy.get(this.mbWayButton).click()
  }

  getOrderConfirmationHeader() {
    cy.checkElementTextIsNotEmpty(this.confirmationPageTitleId)
    cy.get(this.confirmationPageTitleId).should('be.visible')
  }

  getDiscountOnOrderPage() {
    cy.get(this.orderDetailsDivId).should('be.visible').click()
    cy.get(this.orderPageDiscountId).should('be.visible').and('not.be.empty')
  }

  fillInBizumPaymentPhone(phoneNumber) {
    cy.get(this.bizumTelephoneId).type(phoneNumber)
    cy.get(this.bizumContinueButtonId).click()
  }

  selectCompleteOrderBizum() {
    cy.get(this.bizumCompleteOrderButtonId).click()
  }

  verifyBizumError() {
    cy.get(this.bizumErrorMessage).invoke('text').should('not.be.empty')
    cy.get(this.bizumContinueButtonId).should('be.disabled')
  }

  clickOnBraintreePaymentButton() {
    cy.get(this.braintreePayNowButton).should('be.visible').click()
  }

  fillInNewBraintreeForm(creditCard, expiredDate, cvvNumber) {
    this.fillInCheckoutCardField(
      this.braintreeCreditCardNumberId,
      this.creditCardNumberId,
      creditCard
    )
    this.fillInCheckoutCardField(
      this.braintreeExpirationDateId,
      this.expirationDateId,
      expiredDate
    )
    this.fillInCheckoutCardField(
      this.braintreeCvvNumberId,
      this.cvvId,
      cvvNumber
    )
  }

  fillInBraintreeSecureCode(secureCode) {
    this.fillInOtpField(this.otpIframeID, this.otpFieldId, secureCode)
  }

  verifyWarningZipcodeBoxIsVisible(deliveryBlock) {
    cy.checkElementTextIsNotEmpty(this.notificationBox)
    cy.get(deliveryBlock).should('not.exist')
  }

  verifyCartRule() {
    cy.get(this.basketCartRuleOrderSummaryId)
      .should('be.visible')
      .find('span')
      .invoke('text')
      .should('not.be.empty')
  }

  checkForPaypalCheckoutButton(iframeId, buttonId) {
    cy.get(iframeId)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(body => {
        cy.wrap(body).find(buttonId).should('be.visible')
      })
  }
}

export const checkoutPage = new CheckoutPage()
