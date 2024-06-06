import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  sibsMultibancoPaymentFailure,
  sibsMultibancoPaymentFulfill,
  sibsMultibancoPaymentSuccess,
  sibsMultibancoPaymentTrigger
} from '~domains/checkout'
import {
  createSIBSMultibancoPaymentData,
  createSIBSMultibancoPaymentResponseData
} from '~domains/checkout/__mocks__/create-sibs-multibanco-payment'
import { RootState } from '~domains/redux'
import { createsibsMultibancoPaymentSaga } from '../create-sibs-multibanco-payment'

describe('checkout/create-sibs-multibanco-payment saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: { ...initialState },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(createsibsMultibancoPaymentSaga)

    return saga
  }

  describe('when createSibsMultibancoPayment is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: createSIBSMultibancoPaymentResponseData
        })

        const saga = setup()
        saga.dispatch(
          sibsMultibancoPaymentTrigger(createSIBSMultibancoPaymentData)
        )
        await saga.waitFor(sibsMultibancoPaymentFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/create-sibs-multibanco-payment',
          createSIBSMultibancoPaymentData
        )

        expect(saga.getCalledActions()).toContainEqual(
          sibsMultibancoPaymentSuccess(createSIBSMultibancoPaymentResponseData)
        )
        expect(saga.getCalledActions()).toContainEqual(
          sibsMultibancoPaymentFulfill()
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
          sibsMultibancoPaymentTrigger(createSIBSMultibancoPaymentData)
        )
        await saga.waitFor(sibsMultibancoPaymentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          sibsMultibancoPaymentFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          sibsMultibancoPaymentFulfill()
        )
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
        saga.dispatch(
          sibsMultibancoPaymentTrigger(createSIBSMultibancoPaymentData)
        )
        await saga.waitFor(sibsMultibancoPaymentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          sibsMultibancoPaymentFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          sibsMultibancoPaymentFulfill()
        )
      })
    })
  })
})
