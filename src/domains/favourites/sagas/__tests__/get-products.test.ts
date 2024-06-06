import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getFavouritesProductsTrigger,
  getFavouritesProductsSuccess,
  getFavouritesFulfill,
  getFavouritesProductsFailure
} from '~domains/favourites'
import { RootState } from '~domains/redux'
import { getProductsSaga } from '../get-products'
import { productSkusMock, productsMock } from '../../__mocks__/get-products'

describe('favourites/get-products saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: {
        ...initialState,
        client: {
          favourites: {
            get: {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              favouritesList: {
                id: 'some-id',
                items: productSkusMock,
                products: productsMock
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
    saga.start(getProductsSaga)

    return saga
  }

  describe('when getProducts is triggered', () => {
    describe('and succeeds', () => {
      it('updates the redux item state, calls the api, dispatches success, updates again the item state and fulfill the actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({ data: productsMock })
        const saga = setup()
        saga.dispatch(getFavouritesProductsTrigger({ skus: productSkusMock }))
        await saga.waitFor(getFavouritesProductsSuccess().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/favourites/get-products',
          { skus: productSkusMock }
        )

        expect(saga.getCalledActions()).toContainEqual(
          getFavouritesProductsSuccess(productsMock)
        )
        expect(saga.getCalledActions()).toContainEqual(getFavouritesFulfill())
      })
    })

    describe('and request fails', () => {
      it('updates the redux item state, calls the api, dispatches failure, updates again the item state and fulfill the actions', async () => {
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
        saga.dispatch(getFavouritesProductsTrigger({ skus: productSkusMock }))
        await saga.waitFor(getFavouritesFulfill().type)
        expect(saga.getCalledActions()).toContainEqual(
          getFavouritesProductsFailure({
            message: 'Some unknown error'
          })
        )
      })
    })

    describe('and request fails with multiple error messages', () => {
      it('updates the redux item state, calls the api, dispatches failure, updates again the item state and fulfill the actions', async () => {
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
        saga.dispatch(getFavouritesProductsTrigger({ skus: productSkusMock }))
        await saga.waitFor(
          getFavouritesProductsFailure({
            message: 'Some unknown error'
          }).type
        )
        expect(saga.getCalledActions()).toContainEqual(
          getFavouritesProductsFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
