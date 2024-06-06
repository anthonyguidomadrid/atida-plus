import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  addFavouritesSave,
  addFavouritesFailure,
  addFavouritesFulfill,
  addItemWasError,
  forceRefreshTrigger,
  addItemWasSuccess,
  addItemIsLoading,
  addItemIsSaved,
  addFavouritesSuccess
} from '~domains/favourites'
import { RootState } from '~domains/redux'
import { addFavouritesSaveSaga } from '../add-favourites-save'

describe('favourites/add-favourites-save saga', () => {
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
    saga.start(addFavouritesSaveSaga)

    return saga
  }

  describe('when addFavouritesSave is triggered', () => {
    describe('and succeeds', () => {
      it('updates the redux item state, calls the api, dispatches success, updates again the item state and fulfill the actions', async () => {
        const saga = setup(
          {},
          {
            id: 'some-id',
            items: ['some-sku-1']
          }
        )
        saga.dispatch(addFavouritesSave({ sku: 'some-sku-3' }))
        await saga.waitFor(addFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          addItemWasSuccess({ sku: 'some-sku-3', wasSuccess: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemWasError({ sku: 'some-sku-3', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsLoading({ sku: 'some-sku-3', isLoading: true })
        )
        expect(axios.post).toHaveBeenCalledWith(
          '/api/favourites/add-favourites-save',
          {
            sku: 'some-sku-3'
          }
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesSuccess())
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsLoading({ sku: 'some-sku-3', isLoading: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemIsSaved({ sku: 'some-sku-3', isSaved: true })
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
        saga.dispatch(addFavouritesSave({ sku: 'some-sku-3' }))
        await saga.waitFor(addFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          addFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemWasError({ sku: 'some-sku-3', wasError: true })
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesFulfill())
      })
    })

    describe('and request fails with multpile error messages', () => {
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
        saga.dispatch(addFavouritesSave({ sku: 'some-sku-3' }))
        await saga.waitFor(addFavouritesFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          addFavouritesFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addItemWasError({ sku: 'some-sku-3', wasError: true })
        )
        expect(saga.getCalledActions()).toContainEqual(addFavouritesFulfill())
      })
    })
  })
})
