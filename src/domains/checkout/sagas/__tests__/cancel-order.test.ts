import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import {
  cancelOrderFailure,
  cancelOrderFulfill,
  cancelOrderSuccess,
  cancelOrderTrigger
} from '~domains/checkout'
import { sprykerOrderData } from '~domains/checkout/__mocks__/checkout-data'
import { RootState } from '~domains/redux'
import { cancelOrderSaga } from '../cancel-order'

describe('checkout/cancel-order saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(cancelOrderSaga)

    return saga
  }
  const payload = {
    orderId: 'PT--279',
    itemsData: basketWithProducts,
    couponsData: []
  }

  describe('when cancelOrder is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.delete as jest.Mock).mockResolvedValue({
          data: sprykerOrderData
        })

        const saga = setup()
        saga.dispatch(cancelOrderTrigger(payload))
        await saga.waitFor(cancelOrderFulfill().type)

        expect(axios.delete).toHaveBeenCalledWith(
          '/api/checkout/cancel-order',
          {
            data: { ...payload }
          }
        )

        expect(saga.getCalledActions()).toContainEqual(cancelOrderSuccess())
        expect(saga.getCalledActions()).toContainEqual(cancelOrderFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.delete as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(cancelOrderTrigger(payload))
        await saga.waitFor(cancelOrderFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          cancelOrderFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(cancelOrderFulfill())
      })

      it('calls the api then dispatches failure action and sets the correct message when error?.response?.data?.message is undefined', async () => {
        ;(axios.delete as jest.Mock).mockRejectedValue({
          message: 'Some unknown error'
        })

        const saga = setup()
        saga.dispatch(cancelOrderTrigger(payload))
        await saga.waitFor(cancelOrderFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          cancelOrderFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(cancelOrderFulfill())
      })
    })

    describe('and request fails with multpile error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.delete as jest.Mock).mockRejectedValue({
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
        saga.dispatch(cancelOrderTrigger(payload))
        await saga.waitFor(cancelOrderFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          cancelOrderFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(cancelOrderFulfill())
      })
    })
  })
})
