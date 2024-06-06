import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  adyenPaymentTrigger,
  adyenPaymentFailure,
  adyenPaymentSuccess,
  adyenPaymentFulfill
} from '~domains/checkout'
import {
  createAdyenPaymentData,
  createAdyenPaymentResponseData
} from '~domains/checkout/__mocks__/create-adyen-payment'
import { RootState } from '~domains/redux'
import { createAdyenPaymentSaga } from '../create-adyen-payment'

describe('checkout/create-adyen-payment saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: { ...initialState },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(createAdyenPaymentSaga)

    return saga
  }

  describe('when createAdyenPayment is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: createAdyenPaymentResponseData
        })

        const saga = setup()
        saga.dispatch(adyenPaymentTrigger(createAdyenPaymentData))
        await saga.waitFor(adyenPaymentFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/create-adyen-payment',
          createAdyenPaymentData
        )

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentSuccess(createAdyenPaymentResponseData)
        )
        expect(saga.getCalledActions()).toContainEqual(adyenPaymentFulfill())
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
        saga.dispatch(adyenPaymentTrigger(createAdyenPaymentData))
        await saga.waitFor(adyenPaymentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(adyenPaymentFulfill())
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
        saga.dispatch(adyenPaymentTrigger(createAdyenPaymentData))
        await saga.waitFor(adyenPaymentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(adyenPaymentFulfill())
      })
    })
  })
})
