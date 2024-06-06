import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  createMultiplePaymentsTrigger,
  createMultiplePaymentsFailure,
  createMultiplePaymentsSuccess,
  createMultiplePaymentsFulfill
} from '~domains/checkout'
import {
  createAdyenPaymentData,
  createAdyenPaymentResponseData,
  atidaPaymentLoyaltyData
} from '~domains/checkout/__mocks__/create-adyen-payment'
import { RootState } from '~domains/redux'
import { createMultiplePaymentsSaga } from '../create-multiple-payments'
import { PAYMENT_OPTIONS } from '~config/constants/payments'

describe('checkout/create-multiple-payments saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: { ...initialState },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(createMultiplePaymentsSaga)

    return saga
  }

  describe('when createMultiplePayments is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: {
            [PAYMENT_OPTIONS.ADYEN]: createAdyenPaymentResponseData,
            [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
          }
        })

        const saga = setup()
        saga.dispatch(
          createMultiplePaymentsTrigger({
            [PAYMENT_OPTIONS.ADYEN]: {
              ...createAdyenPaymentData,
              origin_payment_ref: 'ref'
            },
            [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
          })
        )
        await saga.waitFor(createMultiplePaymentsFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/create-multiple-payments',
          {
            [PAYMENT_OPTIONS.ADYEN]: {
              ...createAdyenPaymentData,
              origin_payment_ref: 'ref'
            },
            [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          createMultiplePaymentsSuccess({
            [PAYMENT_OPTIONS.ADYEN]: createAdyenPaymentResponseData,
            [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          createMultiplePaymentsFulfill()
        )
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(
          createMultiplePaymentsTrigger({
            [PAYMENT_OPTIONS.ADYEN]: {
              ...createAdyenPaymentData,
              origin_payment_ref: 'ref'
            },
            [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
          })
        )
        await saga.waitFor(createMultiplePaymentsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createMultiplePaymentsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          createMultiplePaymentsFulfill()
        )
      })
    })

    describe('and request fails with multiple error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: [
                'Some unknown error',
                'Some other unknown error',
                'And some unknown error'
              ]
            }
          }
        })

        const saga = setup()
        saga.dispatch(
          createMultiplePaymentsTrigger({
            [PAYMENT_OPTIONS.ADYEN]: {
              ...createAdyenPaymentData,
              origin_payment_ref: 'ref'
            },
            [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
          })
        )
        await saga.waitFor(createMultiplePaymentsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createMultiplePaymentsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          createMultiplePaymentsFulfill()
        )
      })
    })
  })
})
