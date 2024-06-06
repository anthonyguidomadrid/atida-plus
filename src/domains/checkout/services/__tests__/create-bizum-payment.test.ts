/**
 * @jest-environment node
 */
import axios from 'axios'
import {
  createBizumPaymentData,
  createBizumPaymentResponseData
} from '../../__mocks__/create-bizum-payment'
import { createClient } from '~helpers'
import { createBizumPayment } from '../create-bizum-payment'
import { customerData } from '~domains/checkout/__mocks__/checkout'

describe(createBizumPayment, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: createBizumPaymentResponseData
    })
  })

  it('creates the client and passes the locale', async () => {
    await createBizumPayment('es-es', createBizumPaymentData, 'some-user-token')

    expect(createClient).toHaveBeenCalledWith({
      locale: 'es-es',
      addAnonymousCustomerUniqueId: false,
      options: {
        baseURL: 'payment-plus'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(
      '/create-bizum-payment',
      {
        amount: 2129,
        customer: customerData,
        invoice_ref: 'ES--9003',
        success_url: `somehost.com/es-es/confirmation/ES--9003`,
        failure_url: `somehost.com/es-es/unsuccessful/ES--9003`
      },
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })

  it('returns the normalized response', async () => {
    const response = await createBizumPayment(
      'es-es',
      {
        amount: 2129,
        invoice_ref: 'ES--9003',
        customer: customerData
      },
      'some-user-token'
    )
    expect(response).toEqual(createBizumPaymentResponseData)
  })
})
