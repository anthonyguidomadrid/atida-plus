import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getBrainTreeTokenFailure,
  getBrainTreeTokenFulfill,
  getBrainTreeTokenSuccess,
  getBrainTreeTokenTrigger
} from '~domains/checkout'
import { braintreeData } from '~domains/checkout/__mocks__/braintree-data'
import { customerData } from '~domains/checkout/__mocks__/checkout'
import { RootState } from '~domains/redux'
import { getBrainTreeTokenSaga } from '../get-braintree-token'

describe('checkout/get-braintree-token saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(getBrainTreeTokenSaga)

    return saga
  }

  describe('when getBrainTreeToken is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: braintreeData
        })

        const saga = setup()
        saga.dispatch(getBrainTreeTokenTrigger({ customer: customerData }))

        await saga.waitFor(getBrainTreeTokenFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/braintree-data',
          {
            customer: customerData
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          getBrainTreeTokenSuccess(braintreeData)
        )
        expect(saga.getCalledActions()).toContainEqual(
          getBrainTreeTokenFulfill()
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
        saga.dispatch(getBrainTreeTokenTrigger({ customer: customerData }))
        await saga.waitFor(getBrainTreeTokenFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getBrainTreeTokenFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          getBrainTreeTokenFulfill()
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
        saga.dispatch(getBrainTreeTokenTrigger({ customer: customerData }))
        await saga.waitFor(getBrainTreeTokenFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getBrainTreeTokenFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          getBrainTreeTokenFulfill()
        )
      })
    })
  })
})
