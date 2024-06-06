export const adyenPaymentDetailsPayload = {
  details: {
    redirectResult: 'Ab02b4c0!BQABAgBqYNHM/549oKe/2MLKe0Ph'
  },
  customer: {
    customer_reference: 'PT--1234',
    email: 'atida@atida.com',
    name: 'Atida Mifarma',
    is_guest: false
  }
}

export const adyenPaymentDetailsResponseData = {
  additionalData: {
    paymentMethod: 'paywithgoogle'
  },
  amount: {
    currency: 'EUR',
    value: 1000
  },
  merchantReference: '3b32711f-a6c8-442d-94f8-2a943c10a9c7',
  pspReference: 'QV7XMK8G9QRXGN82',
  resultCode: 'Authorised'
}
