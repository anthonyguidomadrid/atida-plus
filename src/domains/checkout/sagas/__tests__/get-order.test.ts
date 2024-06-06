import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import {
  getOrderFailure,
  getOrderFulfill,
  getOrderSuccess,
  getOrderTrigger
} from '~domains/checkout'
import { SprykerOrderResponseData } from '~domains/checkout/types'
import { sprykerOrderData } from '~domains/checkout/__mocks__/checkout-data'
import { RootState } from '~domains/redux'
import { getOrderSaga } from '../get-order'

describe('checkout/get-order saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(getOrderSaga)

    return saga
  }
  const payload = {
    orderId: 'PT--279',
    itemsData: basketWithProducts,
    couponsData: []
  }

  describe('when getOrder is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: sprykerOrderData
        })

        const saga = setup()
        saga.dispatch(getOrderTrigger(payload))
        await saga.waitFor(getOrderFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/get-order',
          payload
        )

        expect(saga.getCalledActions()).toContainEqual(
          getOrderSuccess(
            (sprykerOrderData as unknown) as Partial<SprykerOrderResponseData>
          )
        )
        expect(saga.getCalledActions()).toContainEqual(getOrderFulfill())
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
        saga.dispatch(getOrderTrigger(payload))
        await saga.waitFor(getOrderFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getOrderFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getOrderFulfill())
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
        saga.dispatch(getOrderTrigger(payload))
        await saga.waitFor(getOrderFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getOrderFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getOrderFulfill())
      })
    })
  })
})
