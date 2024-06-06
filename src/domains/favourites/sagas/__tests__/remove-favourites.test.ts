import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getFavouritesTrigger,
  removeFavouritesTrigger,
  removeFavouritesRequest,
  removeFavouritesSuccess,
  removeFavouritesFailure,
  removeFavouritesFulfill,
  removeItemWasSuccess,
  removeItemWasError,
  removeItemIsLoading,
  getFavouritesRemoveItem,
  removeItemIsSaved
} from '~domains/favourites'
import { triggerReportProductFavouritesFailed } from '~domains/analytics'
import { RootState } from '~domains/redux'
import { removeFavouritesSaga } from '../remove-favourites'

describe('favourites/remove-favourites saga', () => {
  const setup = (
    initialState = {},
    favouritesList: {
      id?: string
      items: string[]
    }
  ): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: {
        ...initialState,
        client: {
          favourites: {
            get: {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              favouritesList
            },
            remove: {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              items: [
                {
                  sku: 'some-sku-3',
                  isLoading: false,
                  isSaved: false,
                  wasSuccess: true,
                  wasError: false
                }
              ]
            },
            add: {
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
    saga.start(removeFavouritesSaga)

    return saga
  }

  describe('when removeFavourites is triggered', () => {
    describe('and succeeds', () => {
      it('updates the redux item state, calls the api, dispatches success, updates again the item state and fulfill the actions', async () => {
        const saga = setup(
          {},
          {
            id: 'some-id',
            items: ['some-sku-3']
          }
        )
        saga.dispatch(removeFavouritesTrigger({ sku: 'some-sku-3' }))
        await saga.waitFor(removeFavouritesFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/favourites/remove-favourites',
          {
            favouritesListId: 'some-id',
            sku: 'some-sku-3'
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesRequest()
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesSuccess()
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasSuccess({ sku: 'some-sku-3', wasSuccess: true })
        )
        expect(saga.getCalledActions()).toContainEqual(
          getFavouritesRemoveItem({ sku: 'some-sku-3' })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesFulfill()
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsSaved({ sku: 'some-sku-3', isSaved: false })
        )
      })
    })

    describe('and there is no favouritesListId on redux state', () => {
      it('dispatches the get-favourites saga', async () => {
        const saga = setup({}, { items: [] })
        saga.dispatch(removeFavouritesTrigger({ sku: 'some-sku-3' }))
        await saga.waitFor(removeFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(getFavouritesTrigger())
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

        const saga = setup(
          {},
          {
            id: 'some-id',
            items: ['some-sku-3']
          }
        )
        saga.dispatch(removeFavouritesTrigger({ sku: 'some-sku-3' }))
        await saga.waitFor(removeFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesRequest()
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasError({ sku: 'some-sku-3', wasError: true })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesFulfill()
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportProductFavouritesFailed({
            event: 'Product Removed from Favourites Failed',
            error_key: 'UnknownError',
            error_message: 'Some unknown error'
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

        const saga = setup(
          {},
          {
            id: 'some-id',
            items: ['some-sku-3']
          }
        )
        saga.dispatch(removeFavouritesTrigger({ sku: 'some-sku-3' }))
        await saga.waitFor(removeFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesRequest()
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasError({ sku: 'some-sku-3', wasError: true })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesFulfill()
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportProductFavouritesFailed({
            event: 'Product Removed from Favourites Failed',
            error_key: 'UnknownError',
            error_message: 'Some unknown error'
          })
        )
      })
    })
  })
})
