/**
 * @jest-environment node
 */
import axios from 'axios'
import {
  createSIBSMultibancoPaymentData,
  createSIBSMultibancoPaymentResponseData
} from '../../__mocks__/create-sibs-multibanco-payment'
import { createClient } from '~helpers'
import { createSIBSMultibancoPayment } from '../create-sibs-multibanco-payment'
import { customerData } from '~domains/checkout/__mocks__/checkout'

describe(createSIBSMultibancoPayment, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: createSIBSMultibancoPaymentResponseData
    })
  })

  it('creates the client and passes the locale', async () => {
    await createSIBSMultibancoPayment(
      'en-gb',
      createSIBSMultibancoPaymentData,
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
      '/create-sibs-multibanco-payment',
      {
        amount: 1000,
        invoice_ref: 'PT-1234',
        customer: customerData
      },
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })

  it('returns the normalized response', async () => {
    const response = await createSIBSMultibancoPayment(
      'en-gb',
      createSIBSMultibancoPaymentData,
      'some-user-token'
    )
    expect(response).toEqual(createSIBSMultibancoPaymentResponseData)
  })
})
