/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { adyenPaymentMethods } from '../adyen-payment-methods'
import {
  adyenPaymentMethodsResponse,
  adyenPaymentMethodsPayload,
  adyenPaymentMethodsResponseData
} from '~domains/checkout/__mocks__/adyen-payment-methods'

describe(adyenPaymentMethods, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: adyenPaymentMethodsResponseData
    })
  })

  it('creates the client and passes the locale', async () => {
    await adyenPaymentMethods(
      'es-es',
      adyenPaymentMethodsPayload,
      'some-user-token'
    )

    expect(createClient).toHaveBeenCalledWith({
      locale: 'es-es',
      addAnonymousCustomerUniqueId: false,
      options: {
        baseURL: 'payment-plus'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(
      '/adyen-payment-methods',
      adyenPaymentMethodsPayload,
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })

  it('returns the response', async () => {
    const response = await adyenPaymentMethods(
      'en-gb',
      adyenPaymentMethodsPayload,
      'some-user-tokens'
    )
    expect(response).toEqual(adyenPaymentMethodsResponse)
  })
})

describe(adyenPaymentMethods, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: {
        paymentMethods: [
          {
            ...adyenPaymentMethodsResponseData.paymentMethods[0],
            type: 'Some type'
          }
        ]
      }
    })
  })
  it('returns nothing as default', async () => {
    const response = await adyenPaymentMethods(
      'en-gb',
      adyenPaymentMethodsPayload,
      'some-user-tokens'
    )
    expect(response).toEqual({
      allowedPaymentMethods: [],
      data: {
        paymentMethods: [
          {
            ...adyenPaymentMethodsResponseData.paymentMethods[0],
            type: 'Some type'
          }
        ]
      }
    })
  })
})
