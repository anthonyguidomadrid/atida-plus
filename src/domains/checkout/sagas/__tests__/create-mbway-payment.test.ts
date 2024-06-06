import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  mbWayPaymentFailure,
  mbWayPaymentFulfill,
  mbWayPaymentSuccess,
  mbWayPaymentTrigger
} from '~domains/checkout'
import {
  createMBWayPaymentData,
  createMBWayPaymentResponseData
} from '~domains/checkout/__mocks__/create-mbway-payment'
import { RootState } from '~domains/redux'
import { createMBWayPaymentSaga } from '../create-mbway-payment'

describe('checkout/create-mbway-payment saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: { ...initialState },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(createMBWayPaymentSaga)

    return saga
  }

  describe('when createMBWayPayment is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: createMBWayPaymentResponseData
        })

        const saga = setup()
        saga.dispatch(mbWayPaymentTrigger(createMBWayPaymentData))
        await saga.waitFor(mbWayPaymentFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/create-mbway-payment',
          createMBWayPaymentData
        )

        expect(saga.getCalledActions()).toContainEqual(
          mbWayPaymentSuccess(createMBWayPaymentResponseData)
        )
        expect(saga.getCalledActions()).toContainEqual(mbWayPaymentFulfill())
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
        saga.dispatch(mbWayPaymentTrigger(createMBWayPaymentData))
        await saga.waitFor(mbWayPaymentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          mbWayPaymentFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(mbWayPaymentFulfill())
      })
    })

    describe('and request fails with multpile error messages', () => {
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
        saga.dispatch(mbWayPaymentTrigger(createMBWayPaymentData))
        await saga.waitFor(mbWayPaymentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          mbWayPaymentFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(mbWayPaymentFulfill())
      })
    })
  })
})
