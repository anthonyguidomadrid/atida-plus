/**
 * @jest-environment node
 */
import axios from 'axios'
import {
  createAdyenPaymentData,
  createAdyenPaymentResponseData
} from '../../__mocks__/create-adyen-payment'
import { createClient } from '~helpers'
import { createAdyenPayment } from '../create-adyen-payment'

describe(createAdyenPayment, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: createAdyenPaymentResponseData
    })
  })

  it('creates the client and passes the locale', async () => {
    await createAdyenPayment('es-es', createAdyenPaymentData, 'some-user-token')

    expect(createClient).toHaveBeenCalledWith({
      locale: 'es-es',
      addAnonymousCustomerUniqueId: false,
      options: {
        baseURL: 'payment-plus'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(
      '/create-adyen-payment',
      {
        ...createAdyenPaymentData,
        origin: 'somehost.com/es-es',
        returnUrl: 'somehost.com/es-es/checkout/adyen-status?orderId=PT-1234'
      },
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })

  it('returns the response', async () => {
    const response = await createAdyenPayment(
      'es-es',
      createAdyenPaymentData,
      'some-user-token'
    )
    expect(response).toEqual(createAdyenPaymentResponseData)
  })
})
