/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { adyenPaymentDetails } from '../adyen-payment-details'
import {
  adyenPaymentDetailsPayload,
  adyenPaymentDetailsResponseData
} from '~domains/checkout/__mocks__/adyen-payment-details'

describe(adyenPaymentDetails, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: adyenPaymentDetailsResponseData
    })
  })

  it('creates the client and passes the locale', async () => {
    await adyenPaymentDetails(
      'pt-pt',
      adyenPaymentDetailsPayload,
      'some-user-token'
    )

    expect(createClient).toHaveBeenCalledWith({
      locale: 'pt-pt',
      addAnonymousCustomerUniqueId: false,
      options: {
        baseURL: 'payment-plus'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(
      '/adyen-payment-details',
      adyenPaymentDetailsPayload,
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })

  it('returns the response', async () => {
    const response = await adyenPaymentDetails(
      'en-gb',
      adyenPaymentDetailsPayload,
      'some-user-tokens'
    )
    expect(response).toEqual(adyenPaymentDetailsResponseData)
  })
})
