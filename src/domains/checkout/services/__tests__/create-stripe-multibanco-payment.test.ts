/**
 * @jest-environment node
 */
import axios from 'axios'
import { multibancoData } from '../../__mocks__/multibanco-data'
import { createClient } from '~helpers'
import { createStripeMultibancoPayment } from '../create-stripe-multibanco-payment'
import { customerData } from '~domains/checkout/__mocks__/checkout'

describe(createStripeMultibancoPayment, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: multibancoData })
  })

  it('creates the client and passes the locale', async () => {
    await createStripeMultibancoPayment(
      'en-gb',
      multibancoData,
      'some-user-token'
    )

    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      addAnonymousCustomerUniqueId: false,
      options: {
        baseURL: 'payment-plus'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(
      '/create-multibanco-payment',
      {
        amount: 1000,
        invoice_ref: 'PT-1234',
        return_url: 'http://example.com/success',
        customer: customerData
      },
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })
})
