import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  removeFavouritesSave,
  removeFavouritesFailure,
  removeFavouritesSuccess,
  removeFavouritesFulfill,
  removeItemWasSuccess,
  removeItemWasError,
  removeItemIsLoading,
  removeItemIsSaved,
  forceRefreshTrigger
} from '~domains/favourites'
import { RootState } from '~domains/redux'
import { removeFavouritesSaveSaga } from '../remove-favourites-save'

describe('favourites/remove-favourites-save saga', () => {
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
    saga.start(removeFavouritesSaveSaga)

    return saga
  }

  describe('when removeFavouritesSave is triggered', () => {
    describe('and succeeds', () => {
      it('updates the redux item state, calls the api, dispatches success, updates again the item state and fulfill the actions', async () => {
        const saga = setup(
          {},
          {
            id: 'some-id',
            items: ['some-sku-1']
          }
        )
        saga.dispatch(removeFavouritesSave({ sku: 'some-sku-3' }))
        await saga.waitFor(removeFavouritesFulfill().type)
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: true })
        )
        expect(axios.post).toHaveBeenCalledWith(
          '/api/favourites/remove-favourites-save',
          {
            sku: 'some-sku-3'
          }
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesSuccess()
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsSaved({ sku: 'some-sku-3', isSaved: true })
        )
        expect(saga.getCalledActions()).toContainEqual(forceRefreshTrigger())
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
        saga.dispatch(removeFavouritesSave({ sku: 'some-sku-3' }))
        await saga.waitFor(removeFavouritesFulfill().type)
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: true })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesFulfill()
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
        saga.dispatch(removeFavouritesSave({ sku: 'some-sku-3' }))
        await saga.waitFor(removeFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeItemIsLoading({ sku: 'some-sku-3', isLoading: true })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          removeFavouritesFulfill()
        )
      })
    })
  })
})
