import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  addFavouritesTrigger,
  addFavouritesRequest,
  addFavouritesSuccess,
  addFavouritesFailure,
  addFavouritesFulfill,
  addItemWasSuccess,
  addItemWasError,
  addItemIsLoading,
  getFavouritesAddItem,
  getFavouritesTrigger,
  addItemIsSaved
} from '~domains/favourites'
import { triggerReportProductFavouritesFailed } from '~domains/analytics'
import { RootState } from '~domains/redux'
import { addFavouritesSaga } from '../add-favourites'

describe('favourites/add-favourites saga', () => {
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
                },
                {
                  sku: 'some-sku-5',
                  isLoading: true,
                  isSaved: false,
                  wasSuccess: false,
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
    saga.start(addFavouritesSaga)

    return saga
  }

  describe('when addFavourites is triggered', () => {
    describe('and succeeds', () => {
      it('updates the redux item state, calls the api, dispatches success, updates again the item state and fulfill the actions', async () => {
        const saga = setup(
          {},
          {
            id: 'some-id',
            items: ['some-sku-1']
          }
        )
        saga.dispatch(addFavouritesTrigger({ sku: 'some-sku-3' }))
        await saga.waitFor(addFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          addItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesRequest())
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsLoading({ sku: 'some-sku-3', isLoading: true })
        )
        expect(axios.post).toHaveBeenCalledWith(
          '/api/favourites/add-favourites',
          {
            sku: 'some-sku-3'
          }
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesSuccess())
        expect(saga.getCalledActions()).toContainEqual(
          addItemWasSuccess({ sku: 'some-sku-3', wasSuccess: true })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsSaved({ sku: 'some-sku-3', isSaved: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          getFavouritesAddItem({ sku: 'some-sku-3' })
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesFulfill())
      })
    })

    describe('and there is no favouritesListId on redux state', () => {
      it('dispatches the getFavourites saga', async () => {
        const saga = setup({}, { items: [] })
        saga.dispatch(addFavouritesTrigger({ sku: 'some-sku-3' }))
        await saga.waitFor(addFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(getFavouritesTrigger())
      })
    })

    describe('and the item is already loading', () => {
      it('does not trigger any more actions', async () => {
        const saga = setup(
          {},
          {
            id: 'some-id',
            items: ['some-sku-3']
          }
        )
        saga.dispatch(addFavouritesTrigger({ sku: 'some-sku-5' }))
        await saga.waitFor(addFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(addFavouritesFulfill())
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
            items: ['some-sku-1']
          }
        )
        saga.dispatch(addFavouritesTrigger({ sku: 'some-sku-3' }))
        await saga.waitFor(addFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          addItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesRequest())
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemWasError({ sku: 'some-sku-3', wasError: true })
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesFulfill())
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportProductFavouritesFailed({
            event: 'Product Added to Favourites Failed',
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
            items: ['some-sku-1']
          }
        )
        saga.dispatch(addFavouritesTrigger({ sku: 'some-sku-3' }))
        await saga.waitFor(addFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          addItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesRequest())
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemWasError({ sku: 'some-sku-3', wasError: true })
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesFulfill())
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportProductFavouritesFailed({
            event: 'Product Added to Favourites Failed',
            error_key: 'UnknownError',
            error_message: 'Some unknown error'
          })
        )
      })
    })
  })
})
