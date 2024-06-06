import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  bizumPaymentTrigger,
  bizumPaymentFailure,
  bizumPaymentSuccess,
  bizumPaymentFulfill
} from '~domains/checkout'
import {
  createBizumPaymentData,
  createBizumPaymentResponseData
} from '~domains/checkout/__mocks__/create-bizum-payment'
import { RootState } from '~domains/redux'
import { createBizumPaymentSaga } from '../create-bizum-payment'

describe('checkout/create-bizum-payment saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: { ...initialState },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(createBizumPaymentSaga)

    return saga
  }

  describe('when createBizumPayment is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: createBizumPaymentResponseData
        })

        const saga = setup()
        saga.dispatch(bizumPaymentTrigger(createBizumPaymentData))
        await saga.waitFor(bizumPaymentFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/create-bizum-payment',
          createBizumPaymentData
        )

        expect(saga.getCalledActions()).toContainEqual(
          bizumPaymentSuccess(createBizumPaymentResponseData)
        )
        expect(saga.getCalledActions()).toContainEqual(bizumPaymentFulfill())
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
        saga.dispatch(bizumPaymentTrigger(createBizumPaymentData))
        await saga.waitFor(bizumPaymentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          bizumPaymentFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(bizumPaymentFulfill())
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
        saga.dispatch(bizumPaymentTrigger(createBizumPaymentData))
        await saga.waitFor(bizumPaymentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          bizumPaymentFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(bizumPaymentFulfill())
      })
    })
  })
})
