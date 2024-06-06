/**
 * @jest-environment node
 */
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import type { DeepPartial } from '@reduxjs/toolkit'
import SagaTester from 'redux-saga-tester'
import {
  fetchStaticRecommendationTrigger,
  fetchStaticRecommendationSuccess,
  fetchStaticRecommendationFulfill
} from '~domains/static-recommendation/slices'

import { RootState } from '~domains/redux'
import { fetchStaticRecommendationSaga } from '../static-recommendation'
import {
  elasticSearchResponseMock,
  staticRecommendationPayload,
  staticRecommendationNormalizedDataResponse
} from '~domains/static-recommendation/__mocks__/staticRecommendation'
import {
  FetchStaticRecommendation,
  FetchStaticRecommendationTriggerPayload
} from '~domains/static-recommendation/types'

describe('fetchStaticRecommendations saga', () => {
  const setup = (
    initialState: DeepPartial<RootState> = {}
  ): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState
      },
      options: {
        context: {
          locale: 'pt-pt'
        }
      }
    })
    saga.start(fetchStaticRecommendationSaga)

    return saga
  }

  describe('and request succeeds', () => {
    it('calls the api then dispatches success and fulfill actions', async () => {
      mget.mockResolvedValue(elasticSearchResponseMock)
      const saga = setup()
      saga.dispatch(
        fetchStaticRecommendationTrigger(
          staticRecommendationPayload as FetchStaticRecommendationTriggerPayload
        )
      )
      await saga.waitFor(fetchStaticRecommendationFulfill().type)

      expect(mget).toHaveBeenCalledWith({
        body: {
          ids: staticRecommendationPayload.list[0].products
        },
        index: 'index-pt-pt'
      })

      expect(saga.getCalledActions()).toContainEqual(
        fetchStaticRecommendationSuccess(
          staticRecommendationNormalizedDataResponse as FetchStaticRecommendation[]
        )
      )
      expect(saga.getCalledActions()).toContainEqual(
        fetchStaticRecommendationFulfill()
      )
    })
  })
})
