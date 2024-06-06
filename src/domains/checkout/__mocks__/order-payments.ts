export const orderPaymentsResponse = {
  paymentIdentifier: 'PMT-PT-some-unique-id'
} as const

export const orderPaymentsData = {
  data: {
    type: 'order-payments',
    attributes: {
      paymentIdentifier: 'PMT-PT-some-unique-id',
      dataPayload: {
        payment_token: 'its-friday-theeeeen',
        method_code: 'braintree_card'
      }
    }
  }
} as const

export const sprykerOrderPaymentsData = {
  data: {
    type: 'order-payments',
    id: 'some-id',
    attributes: {
      paymentIdentifier: 'PMT-PT-some-unique-id',
      dataPayload: [
        {
          type: '',
          hash: ''
        }
      ]
    },
    links: {
      self: 'some-link'
    }
  },
  links: {
    self: 'some-link'
  }
} as const
