import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  reOrderFailure,
  reOrderFulfill,
  reOrderSuccess,
  reOrderTrigger
} from '~domains/checkout/slices'
import { reOrderPayload } from '~domains/checkout/__mocks__/re-order'
import { RootState } from '~domains/redux'
import { reOrderSaga } from '../re-order'

describe('checkout/re-order-saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: { ...initialState },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(reOrderSaga)

    return saga
  }

  describe('when reOrder is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        const saga = setup()
        saga.dispatch(reOrderTrigger(reOrderPayload))
        await saga.waitFor(reOrderFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/re-order',
          reOrderPayload
        )

        expect(saga.getCalledActions()).toContainEqual(reOrderSuccess())
        expect(saga.getCalledActions()).toContainEqual(reOrderFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: [
                'Some unknown error',
                'Some other unknown error',
                'And some unknow error'
              ]
            }
          }
        })

        const saga = setup()
        saga.dispatch(reOrderTrigger(reOrderPayload))
        await saga.waitFor(reOrderFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          reOrderFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(reOrderFulfill())
      })
    })
  })
})
