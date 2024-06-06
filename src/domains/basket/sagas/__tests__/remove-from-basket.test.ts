import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  removeFromBasketFailure,
  removeFromBasketFulfill,
  removeFromBasketSuccess,
  removeFromBasketTrigger
} from '~domains/basket/slices'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { RootState } from '~domains/redux'
import { removeFromBasketSaga } from '../remove-from-basket'

describe('basket/remove-from-basket saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: {
        ...initialState,
        client: {
          basket: {
            content: {
              data: {
                id: '123123',
                items: [],
                coupons: [],
                discounts: []
              }
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
    saga.start(removeFromBasketSaga)

    return saga
  }

  describe('when removeFromBasket is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: basketWithProducts
        })
        const itemData = {
          sku: 'some-sku'
        }
        const saga = setup()
        saga.dispatch(removeFromBasketTrigger(itemData))
        await saga.waitFor(removeFromBasketFulfill(itemData).type)

        expect(axios.post).toHaveBeenCalledWith('/api/basket/remove', {
          sku: 'some-sku',
          basketId: '123123'
        })

        expect(saga.getCalledActions()).toContainEqual(
          removeFromBasketSuccess({
            sku: 'some-sku',
            data: basketWithProducts
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFromBasketFulfill({
            sku: 'some-sku'
          })
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
        const itemData = {
          sku: 'some-sku'
        }

        const saga = setup()
        saga.dispatch(removeFromBasketTrigger(itemData))
        await saga.waitFor(removeFromBasketFulfill(itemData).type)

        expect(saga.getCalledActions()).toContainEqual(
          removeFromBasketFailure({
            sku: 'some-sku',
            message: 'Some unknown error'
          })
        )
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
        const itemData = {
          sku: 'some-sku'
        }

        const saga = setup()
        saga.dispatch(removeFromBasketTrigger(itemData))
        await saga.waitFor(removeFromBasketFulfill(itemData).type)

        expect(saga.getCalledActions()).toContainEqual(
          removeFromBasketFailure({
            sku: 'some-sku',
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
