import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  fetchAllRecommendationsTrigger,
  fetchAllRecommendationsRequest,
  fetchAllRecommendationsSuccess,
  fetchAllRecommendationsFailure,
  fetchAllRecommendationsFulfill
} from '~domains/exponea'
import { RootState } from '~domains/redux'
import { createClient } from '~helpers'
import { recommendationsCollection } from '../../__mocks__/recommendation'
import { fetchAllRecommendationsSaga } from '../fetch-all-recommendations'

describe('fetchAllRecommendations saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(fetchAllRecommendationsSaga)

    return saga
  }

  describe('when fetchAllRecommendations is triggered', () => {
    describe('and the request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: recommendationsCollection
        })

        const saga = setup()
        saga.dispatch(
          fetchAllRecommendationsTrigger({
            type: 'PDP'
          })
        )
        await saga.waitFor(fetchAllRecommendationsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          fetchAllRecommendationsRequest()
        )

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: false,
          locale: 'cimode'
        })
        expect(axios.post).toHaveBeenCalledWith(
          '/api/recommendations/fetch-all',
          {
            type: 'PDP'
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          fetchAllRecommendationsSuccess(recommendationsCollection)
        )
        expect(saga.getCalledActions()).toContainEqual(
          fetchAllRecommendationsFulfill()
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

        const saga = setup()
        saga.dispatch(
          fetchAllRecommendationsTrigger({
            type: 'PDP'
          })
        )
        await saga.waitFor(fetchAllRecommendationsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          fetchAllRecommendationsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          fetchAllRecommendationsFulfill()
        )
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
        saga.dispatch(
          fetchAllRecommendationsTrigger({
            type: 'PDP'
          })
        )
        await saga.waitFor(fetchAllRecommendationsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          fetchAllRecommendationsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          fetchAllRecommendationsFulfill()
        )
      })
    })
  })
})
