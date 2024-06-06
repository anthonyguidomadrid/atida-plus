import { customerData } from './checkout'

export const createAdyenPaymentData = {
  amount: 1000,
  currency: 'EUR',
  reference: 'PT-1234',
  paymentMethod: {
    type: 'googlepay',
    googlePayToken: 'google-pay-token',
    googlePayCardNetwork: '1234'
  },
  browserInfo: {
    acceptHeader: '1234',
    colorDepth: 1,
    language: 'EN',
    javaEnabled: false,
    screenHeight: 1080,
    screenWidth: 1920,
    userAgent: 'Mozila',
    timeZoneOffset: 123
  },
  billingAddress: {
    country: 'Spain',
    street: 'Avenida',
    houseNumberOrName: '5',
    postalCode: '28000',
    city: 'Madrid',
    stateOrProvince: 'MADRID'
  },
  riskData: {
    clientData: '1234'
  },
  clientStateDataIndicator: true,
  shopperEmail: 'atida@atida.com',
  customer: customerData,
  countryCode: 'ES',
  telephoneNumber: '123456789',
  items: [
    {
      name:
        'Recargas Contentor Fraldas Sangenic Twist&click Tommee Tippee 12uds',
      sku: '617019392313',
      sumPrice: 6371,
      quantity: 1,
      unitGrossPrice: 6371,
      sumGrossPrice: 6371,
      taxRate: '23.00',
      unitNetPrice: 0,
      sumNetPrice: 0,
      unitPrice: 6371,
      unitTaxAmountFullAggregation: 1191,
      sumTaxAmountFullAggregation: 1191,
      refundableAmount: 6371,
      canceledAmount: 0,
      sumSubtotalAggregation: 6371,
      unitSubtotalAggregation: 6371,
      unitProductOptionPriceAggregation: null,
      sumProductOptionPriceAggregation: null,
      unitExpensePriceAggregation: 0,
      sumExpensePriceAggregation: 0,
      unitDiscountAmountAggregation: 0,
      sumDiscountAmountAggregation: 0,
      unitDiscountAmountFullAggregation: 0,
      sumDiscountAmountFullAggregation: 0,
      unitPriceToPayAggregation: 6371,
      sumPriceToPayAggregation: 6371,
      taxRateAverageAggregation: null,
      taxAmountAfterCancellation: null,
      orderReference: null,
      uuid: '71fe797a-b02b-5ab3-ab1d-5b815093e5ca',
      isReturnable: false,
      idShipment: null,
      urlSlug:
        'recargas-contentor-fraldas-sangenic-twist-click-tommee-tippee-12uds',
      brand: 'tommee_tippee',
      brandCode: '',
      categoryList:
        'baby_kids,baby_kids_diapers_changing,diapers_changing_diaper_disposal_refill',
      isPromo: false,
      isFullyDiscounted: false,
      rewardAmount: 510,
      metadata: {
        superAttributes: [],
        image:
          'https://sandbox-atida.bynder.com/m/bc01f26b3fd33c44/webimage-Recambios-Contenedor-Panales-Sangenic-Twist-Click-Tommee-Tippee-12Uds.png'
      },
      calculatedDiscounts: [],
      productOptions: []
    }
  ],
  expenses: [
    {
      type: 'SHIPMENT_EXPENSE_TYPE',
      name: 'delivery-method.standard-delivery',
      sumPrice: 299,
      unitGrossPrice: 299,
      sumGrossPrice: 299,
      taxRate: '23.00',
      unitNetPrice: 0,
      sumNetPrice: 0,
      canceledAmount: null,
      unitDiscountAmountAggregation: null,
      sumDiscountAmountAggregation: null,
      unitTaxAmount: 0,
      sumTaxAmount: 0,
      unitPriceToPayAggregation: 0,
      sumPriceToPayAggregation: 0,
      taxAmountAfterCancellation: null,
      idShipment: null,
      idSalesExpense: 50532
    }
  ],
  additionalData: {
    allow3DS2: 'true',
    RequestedTestAcquirerResponseCode: '1'
  }
}

export const createAdyenPaymentResponseData = {
  action: {
    data: {
      MD: '123',
      PaReq: '456',
      TermUrl: 'atida.com/terms'
    },
    totalAmount: {
      value: 123,
      currency: 'EU'
    },
    reference: '12345',
    entity: '123',
    expiresAt: '2022-08-29T08:40:55',
    method: 'googlepay',
    paymentMethodType: 'Card',
    type: 'Redirect',
    url: 'atida.com/checkout/adyen-status'
  },
  resultCode: 'Authorised'
}

export const atidaPaymentLoyaltyData = {
  amount: 100,
  invoice_ref: 'PT--54746',
  origin_payment_ref: 'PMT-PT-9bc50dff-1acb-4b99-b271-d9c2bd5ccac4',
  customer: customerData
}

export const adyenCardStoredPaymentMethod = [
  {
    brand: 'visa',
    expiryMonth: '03',
    expiryYear: '2030',
    holderName: 'Checkout Shopper PlaceHolder',
    id: 'DHTLNC3R33M84H82',
    lastFour: '4305',
    name: 'VISA',
    supportedShopperInteractions: ['Ecommerce', 'ContAuth'],
    type: 'scheme'
  }
]
