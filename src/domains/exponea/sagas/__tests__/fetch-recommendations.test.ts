import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  fetchRecommendationsFailure,
  fetchRecommendationsFulfill,
  fetchRecommendationsSuccess,
  fetchRecommendationsTrigger,
  fetchRecommendationsRequest
} from '~domains/exponea'
import { RootState } from '~domains/redux'
import { createClient } from '~helpers'
import { fetchRecommendationsSaga } from '../fetch-recommendations'
import { recommendedProducts } from '../../__mocks__/recommendation'

describe('fetchRecommendations saga', () => {
  const setup = (
    initialState = {},
    userId?: string,
    customerEmail?: string
  ): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState,
        client: {
          account: {
            customer: {
              reference: userId ? userId : undefined,
              details: {
                email: customerEmail ? customerEmail : undefined
              }
            }
          },
          exponea: {
            recommendations: {
              details: [recommendedProducts]
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
    saga.start(fetchRecommendationsSaga)

    return saga
  }

  describe('when fetchRecommendations is triggered', () => {
    describe('and the request succeeds', () => {
      describe('and the user details are on redux', () => {
        it('calls the api then dispatches success and fulfill actions', async () => {
          ;(axios.post as jest.Mock).mockResolvedValue({
            data: recommendedProducts
          })

          const saga = setup({}, 'someCustomerId', 'someCustomerId@email.com')
          saga.dispatch(
            fetchRecommendationsTrigger({
              recommendationId: 'someRecommendationId'
            })
          )
          await saga.waitFor(fetchRecommendationsFulfill().type)

          expect(saga.getCalledActions()).toContainEqual(
            fetchRecommendationsRequest()
          )

          expect(createClient).toHaveBeenCalledWith({
            locale: 'cimode'
          })
          expect(axios.post).toHaveBeenCalledWith(
            '/api/recommendations/fetch',
            {
              email: 'someCustomerId@email.com',
              recommendationId: 'someRecommendationId'
            }
          )

          expect(saga.getCalledActions()).toContainEqual(
            fetchRecommendationsSuccess(recommendedProducts)
          )
          expect(saga.getCalledActions()).toContainEqual(
            fetchRecommendationsFulfill()
          )
        })
      })
      describe('and the user details are not on redux', () => {
        it('requests the customer details if possible and calls the api then dispatches success and fulfill actions', async () => {
          ;(axios.post as jest.Mock).mockResolvedValue({
            data: recommendedProducts
          })

          const saga = setup({}, 'someCustomerId')
          saga.dispatch(
            fetchRecommendationsTrigger({
              recommendationId: 'someRecommendationId'
            })
          )
          await saga.waitFor(fetchRecommendationsFulfill().type)

          expect(saga.getCalledActions()).toContainEqual(
            fetchRecommendationsRequest()
          )

          expect(createClient).toHaveBeenCalledWith({
            locale: 'cimode'
          })
          expect(axios.post).toHaveBeenCalledWith(
            '/api/recommendations/fetch',
            {
              recommendationId: 'someRecommendationId'
            }
          )

          expect(saga.getCalledActions()).toContainEqual(
            fetchRecommendationsSuccess(recommendedProducts)
          )
          expect(saga.getCalledActions()).toContainEqual(
            fetchRecommendationsFulfill()
          )
        })
      })

      describe('and the user is not logged in', () => {
        it('calls the api then dispatches success and fulfill actions', async () => {
          ;(axios.post as jest.Mock).mockResolvedValue({
            data: recommendedProducts
          })

          const saga = setup({})
          saga.dispatch(
            fetchRecommendationsTrigger({
              recommendationId: 'someRecommendationId'
            })
          )
          await saga.waitFor(fetchRecommendationsFulfill().type)

          expect(saga.getCalledActions()).toContainEqual(
            fetchRecommendationsRequest()
          )

          expect(createClient).toHaveBeenCalledWith({
            locale: 'cimode'
          })
          expect(axios.post).toHaveBeenCalledWith(
            '/api/recommendations/fetch',
            {
              recommendationId: 'someRecommendationId'
            }
          )

          expect(saga.getCalledActions()).toContainEqual(
            fetchRecommendationsSuccess(recommendedProducts)
          )
          expect(saga.getCalledActions()).toContainEqual(
            fetchRecommendationsFulfill()
          )
        })
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
          fetchRecommendationsTrigger({
            recommendationId: 'someRecommendationId'
          })
        )
        await saga.waitFor(fetchRecommendationsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          fetchRecommendationsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          fetchRecommendationsFulfill()
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
          fetchRecommendationsTrigger({
            recommendationId: 'someRecommendationId'
          })
        )
        await saga.waitFor(fetchRecommendationsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          fetchRecommendationsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          fetchRecommendationsFulfill()
        )
      })
    })
  })
})
