/**
 * @jest-environment node
 */
import axios from 'axios'
import {
  createMBWayPaymentResponseData,
  createMBWayPaymentData
} from '../../__mocks__/create-mbway-payment'
import { createClient } from '~helpers'
import { createMBWayPayment } from '../create-mbway-payment'
import { customerData } from '~domains/checkout/__mocks__/checkout'

describe(createMBWayPayment, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: createMBWayPaymentResponseData
    })
  })

  it('creates the client and passes the locale', async () => {
    await createMBWayPayment('en-gb', createMBWayPaymentData, 'some-user-token')

    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      addAnonymousCustomerUniqueId: false,
      options: {
        baseURL: 'payment-plus'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(
      '/create-mbway-payment',
      {
        amount: 1000,
        invoice_ref: 'PT-1234',
        customer: {
          ...customerData,
          phone: '351#969770085'
        }
      },
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })

  it('returns the normalized response', async () => {
    const response = await createMBWayPayment(
      'en-gb',
      createMBWayPaymentData,
      'some-user-token'
    )
    expect(response).toEqual(createMBWayPaymentResponseData)
  })
})
