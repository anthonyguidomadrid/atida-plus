import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import { adyenPaymentMethodsResponse } from '~domains/checkout/__mocks__/adyen-payment-methods'
import {
  adyenPaymentMethodsTrigger,
  adyenPaymentMethodsSuccess,
  adyenPaymentMethodsFailure,
  adyenPaymentMethodsFulfill
} from '~domains/checkout'
import { RootState } from '~domains/redux'
import { adyenPaymentMethodsSaga } from '../adyen-payment-methods'

describe('checkout/adyen-payment-methods saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState,
        client: {
          account: {
            customer: {
              reference: 'some-ref'
            }
          }
        }
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(adyenPaymentMethodsSaga)

    return saga
  }

  describe('when adyenPaymentMethods is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: adyenPaymentMethodsResponse
        })

        const saga = setup()
        saga.dispatch(adyenPaymentMethodsTrigger())
        await saga.waitFor(adyenPaymentMethodsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentMethodsSuccess(adyenPaymentMethodsResponse)
        )
        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentMethodsFulfill()
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
        saga.dispatch(adyenPaymentMethodsTrigger())
        await saga.waitFor(adyenPaymentMethodsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentMethodsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentMethodsFulfill()
        )
      })

      it('calls the api then dispatches failure action and sets the correct message when error?.response?.data?.message is undefined', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          message: 'Some unknown error'
        })

        const saga = setup()
        saga.dispatch(adyenPaymentMethodsTrigger())
        await saga.waitFor(adyenPaymentMethodsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentMethodsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentMethodsFulfill()
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
        saga.dispatch(adyenPaymentMethodsTrigger())
        await saga.waitFor(adyenPaymentMethodsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentMethodsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentMethodsFulfill()
        )
      })
    })
  })
})
