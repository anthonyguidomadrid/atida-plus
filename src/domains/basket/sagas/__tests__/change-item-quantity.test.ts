import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  changeItemQuantityFailure,
  changeItemQuantityFulfill,
  changeItemQuantitySuccess,
  changeItemQuantityTrigger,
  getBasketSuccess
} from '~domains/basket/slices'
import { RootState } from '~domains/redux'
import {
  triggerReportProductAdded,
  triggerReportProductRemoved
} from '~domains/analytics'
import { changeItemQuantitySaga } from '../change-item-quantity'
import { product } from '~domains/product/__mocks__/product'
import {
  basket,
  basketWithProductsAndPromotionalItemResponse,
  basketWithProductsResponse
} from '~domains/basket/__mocks__/basket'

describe('basket/change-item-quantity saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: {
        ...initialState,
        client: {
          basket: {
            content: {
              data: {
                id: '123123',
                items: [
                  {
                    ...basket.items[0],
                    product: {
                      ...product,
                      name: 'Test Product 1',
                      sku: undefined,
                      price: undefined
                    }
                  },
                  {
                    ...basket.items[1],
                    product: {
                      ...product,
                      name: 'Test Product 2',
                      sku: undefined,
                      price: undefined
                    }
                  },
                  {
                    ...basket.items[2],
                    product: {
                      ...product,
                      name: 'Test Product 3',
                      sku: undefined,
                      price: undefined
                    }
                  }
                ],
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
    saga.start(changeItemQuantitySaga)

    return saga
  }

  describe('when changeItemQuantity is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions when a product is added', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({
          data: basketWithProductsResponse
        })
        const itemData = {
          quantity: 3,
          sku: '100000001',
          id: 'some-id'
        }
        const saga = setup()
        saga.dispatch(changeItemQuantityTrigger(itemData))
        await saga.waitFor(changeItemQuantityFulfill(itemData).type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/basket/change-item-quantity',
          {
            quantity: 3,
            sku: '100000001',
            basketId: '123123',
            id: 'some-id'
          }
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportProductAdded({
            sku: '100000001',
            quantity: 3,
            quantity_difference: 2,
            data: basketWithProductsResponse
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          changeItemQuantitySuccess({
            quantity: 3,
            sku: '100000001',
            id: 'some-id',
            data: basketWithProductsResponse
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          changeItemQuantityFulfill({
            quantity: 3,
            id: 'some-id',
            sku: '100000001'
          })
        )
      })
      it('calls the api then dispatches success and fulfill actions when a product is removed', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({
          data: basketWithProductsResponse
        })
        const itemData = {
          quantity: 4,
          sku: '100000002'
        }
        const saga = setup()
        saga.dispatch(changeItemQuantityTrigger(itemData))
        await saga.waitFor(changeItemQuantityFulfill(itemData).type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/basket/change-item-quantity',
          {
            quantity: 4,
            sku: '100000002',
            basketId: '123123'
          }
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportProductRemoved({
            sku: '100000002',
            quantity: 4,
            quantity_difference: 3
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          changeItemQuantitySuccess({
            quantity: 4,
            sku: '100000002',
            data: basketWithProductsResponse
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          changeItemQuantityFulfill({
            quantity: 4,
            sku: '100000002'
          })
        )
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.patch as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })
        const itemData = {
          quantity: 6,
          sku: '874319296357'
        }

        const saga = setup()
        saga.dispatch(changeItemQuantityTrigger(itemData))
        await saga.waitFor(changeItemQuantityFulfill(itemData).type)

        expect(saga.getCalledActions()).toContainEqual(
          changeItemQuantityFailure({
            quantity: 6,
            sku: '874319296357',
            message: 'Some unknown error',
            details: {
              error: 'Some unknown error',
              not_available_items: undefined
            }
          })
        )
      })
    })

    describe('and request fails with multpile error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.patch as jest.Mock).mockRejectedValue({
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
          quantity: 1,
          sku: 'some-sku'
        }

        const saga = setup()
        saga.dispatch(changeItemQuantityTrigger(itemData))
        await saga.waitFor(changeItemQuantityFulfill(itemData).type)

        expect(saga.getCalledActions()).toContainEqual(
          changeItemQuantityFailure({
            quantity: 1,
            sku: 'some-sku',
            message: 'Some unknown error',
            details: {
              error: [
                'Some unknown error',
                'Some other unknown error',
                'And some unknown error'
              ],
              not_available_items: undefined
            }
          })
        )
      })
    })

    describe('if a promotional item is added to the basket', () => {
      it('updates the basket in Redux', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({
          data: basketWithProductsAndPromotionalItemResponse
        })
        const itemData = {
          quantity: 3,
          sku: '100000001'
        }
        const saga = setup()
        saga.dispatch(changeItemQuantityTrigger(itemData))
        await saga.waitFor(changeItemQuantityFulfill(itemData).type)
        expect(saga.getCalledActions()).toContainEqual(
          getBasketSuccess(basketWithProductsAndPromotionalItemResponse)
        )
      })
    })
  })
})
