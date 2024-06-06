/**
 * @jest-environment node
 */
import axios from 'axios'
import {
  createAdyenPaymentData,
  createAdyenPaymentResponseData
} from '../../__mocks__/create-adyen-payment'
import { createClient } from '~helpers'
import { createMultiplePayments } from '../create-multiple-payments'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { customerData } from '~domains/checkout/__mocks__/checkout'
import { createBizumPaymentData } from '../../__mocks__/create-bizum-payment'
import { atidaPaymentLoyaltyData } from '~domains/checkout/__mocks__/create-adyen-payment'

describe(createMultiplePayments, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: createAdyenPaymentResponseData
    })
  })

  it('creates the client and passes the locale', async () => {
    await createMultiplePayments(
      'es-es',
      {
        [PAYMENT_OPTIONS.ADYEN]: {
          ...createAdyenPaymentData,
          origin_payment_ref: 'ref'
        },
        [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
      },
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
      '/create-multiple-payments',
      {
        [PAYMENT_OPTIONS.ADYEN]: {
          ...createAdyenPaymentData,
          origin_payment_ref: 'ref',
          origin: 'somehost.com/es-es',
          returnUrl: 'somehost.com/es-es/checkout/adyen-status?orderId=PT-1234'
        },
        [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
      },
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })

  it('returns the response', async () => {
    const response = await createMultiplePayments(
      'es-es',
      {
        [PAYMENT_OPTIONS.ADYEN]: {
          ...createAdyenPaymentData,
          origin_payment_ref: 'ref'
        },
        [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
      },
      'some-user-token'
    )
    expect(response).toEqual(createAdyenPaymentResponseData)
  })

  it('creates the client and passes the locale and adds additional keys when the payment is bizum', async () => {
    await createMultiplePayments(
      'es-es',
      {
        [PAYMENT_OPTIONS.REDSYS_BIZUM]: {
          ...createBizumPaymentData,
          origin_payment_ref: 'ref'
        },
        [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
      },
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
      '/create-multiple-payments',
      {
        [PAYMENT_OPTIONS.REDSYS_BIZUM]: {
          amount: 2129,
          customer: customerData,
          invoice_ref: 'ES--9003',
          success_url: `somehost.com/es-es/confirmation/ES--9003`,
          failure_url: `somehost.com/es-es/unsuccessful/ES--9003`,
          origin_payment_ref: 'ref'
        },
        [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
      },
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })
})
