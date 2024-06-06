import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  createPaymentMethodFailure,
  createPaymentMethodFulfill,
  createPaymentMethodSuccess,
  createPaymentMethodTrigger
} from '~domains/checkout'
import {
  createPaymentMethodData,
  paymentMethodTriggerData
} from '~domains/checkout/__mocks__/create-payment-method'
import { RootState } from '~domains/redux'
import { createPaymentMethodSaga } from '../create-payment-method'

describe('checkout/create-payment-method saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: { ...initialState },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(createPaymentMethodSaga)

    return saga
  }

  describe('when setCreatePaymentMethod is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: createPaymentMethodData
        })

        const saga = setup()
        saga.dispatch(createPaymentMethodTrigger(paymentMethodTriggerData))
        await saga.waitFor(createPaymentMethodFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/create-payment-method',
          paymentMethodTriggerData
        )

        expect(saga.getCalledActions()).toContainEqual(
          createPaymentMethodSuccess(createPaymentMethodData)
        )
        expect(saga.getCalledActions()).toContainEqual(
          createPaymentMethodFulfill()
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
        saga.dispatch(createPaymentMethodTrigger(paymentMethodTriggerData))
        await saga.waitFor(createPaymentMethodFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createPaymentMethodFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          createPaymentMethodFulfill()
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
        saga.dispatch(createPaymentMethodTrigger(paymentMethodTriggerData))
        await saga.waitFor(createPaymentMethodFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createPaymentMethodFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          createPaymentMethodFulfill()
        )
      })
    })
  })
})
