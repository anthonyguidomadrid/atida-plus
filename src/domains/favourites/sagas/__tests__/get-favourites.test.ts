import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getFavouritesTrigger,
  getFavouritesRequest,
  getFavouritesSuccess,
  getFavouritesFailure,
  getFavouritesFulfill
} from '~domains/favourites'
import { RootState } from '~domains/redux'
import { getFavouritesSaga } from '../get-favourites'

describe('favourites/get-favourites saga', () => {
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
                items: ['some-sku-1']
              }
            },
            add: {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              items: [
                {
                  sku: 'some-sku-1',
                  isLoading: false,
                  isSaved: false,
                  wasSuccess: true,
                  wasError: false
                }
              ]
            },
            remove: {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              items: [
                {
                  sku: 'some-sku-2',
                  isLoading: false,
                  isSaved: false,
                  wasSuccess: true,
                  wasError: false
                }
              ]
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
    saga.start(getFavouritesSaga)

    return saga
  }

  describe('when getFavourites is triggered', () => {
    describe('and succeeds', () => {
      it('updates the redux item state, calls the api, dispatches success, updates again the item state and fulfill the actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          data: {
            id: 'some-id',
            items: ['some-sku-1']
          }
        })
        const saga = setup()
        saga.dispatch(getFavouritesTrigger())
        await saga.waitFor(getFavouritesFulfill().type)

        expect(axios.get).toHaveBeenCalledWith('/api/favourites/get-favourites')

        expect(saga.getCalledActions()).toContainEqual(getFavouritesRequest())
        expect(saga.getCalledActions()).toContainEqual(
          getFavouritesSuccess({
            id: 'some-id',
            items: ['some-sku-1']
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getFavouritesFulfill())
      })
    })

    describe('and request fails', () => {
      it('updates the redux item state, calls the api, dispatches failure, updates again the item state and fulfill the actions', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(getFavouritesTrigger())
        await saga.waitFor(getFavouritesFulfill().type)
        expect(saga.getCalledActions()).toContainEqual(getFavouritesRequest())
        expect(saga.getCalledActions()).toContainEqual(
          getFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getFavouritesFulfill())
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
        saga.dispatch(getFavouritesTrigger())
        await saga.waitFor(getFavouritesFulfill().type)
        expect(saga.getCalledActions()).toContainEqual(getFavouritesRequest())
        expect(saga.getCalledActions()).toContainEqual(
          getFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getFavouritesFulfill())
      })
    })
  })
})
