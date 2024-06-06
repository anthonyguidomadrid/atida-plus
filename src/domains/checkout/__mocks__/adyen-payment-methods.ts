export const adyenPaymentMethodsPayload = {
  allowedPaymentMethods: [
    'paywithgoogle',
    'applepay',
    'klarna_account',
    'mbway',
    'multibanco',
    'card'
  ],
  amount: 2199,
  countryCode: 'ES',
  currency: 'EUR',
  shopperLocale: 'es_ES',
  shopperReference: 'some-ref'
}

export const adyenPaymentMethodsResponseData = {
  paymentMethods: [
    {
      configuration: {
        gatewayMerchantId: 'AtidaCompanyECOM',
        merchantId: '50'
      },
      details: [{ key: 'paywithgoogle.token', type: 'payWithGoogleToken' }],
      name: 'Google Pay',
      type: 'paywithgoogle'
    },
    {
      configuration: {
        merchantId: '000000000203419',
        merchantName: 'AtidaCompanyECOM_DEV'
      },
      details: [{ key: 'applepay.token', type: 'applePayToken' }],
      name: 'Apple Pay',
      type: 'applepay'
    },
    { name: 'Conta Klarna', type: 'klarna_account' },
    {
      name: 'MB WAY',
      type: 'mbway'
    },
    {
      name: 'Multibanco',
      type: 'multibanco'
    },
    {
      brands: ['visa', 'mc'],
      details: [
        {
          key: 'encryptedCardNumber',
          type: 'cardToken'
        },
        {
          key: 'encryptedSecurityCode',
          type: 'cardToken'
        },
        {
          key: 'encryptedExpiryMonth',
          type: 'cardToken'
        },
        {
          key: 'encryptedExpiryYear',
          type: 'cardToken'
        },
        {
          key: 'holderName',
          optional: true,
          type: 'text'
        }
      ],
      name: 'Cartão de crédito',
      type: 'scheme'
    }
  ]
}

export const adyenPaymentMethodsResponse = {
  data: adyenPaymentMethodsResponseData,
  allowedPaymentMethods: [
    'adyen_googlepay',
    'adyen_applepay',
    'adyen_klarna_payovertime',
    'adyen_mbway',
    'adyen_multibanco',
    'adyen_card'
  ]
}
