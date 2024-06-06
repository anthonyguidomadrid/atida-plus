import {
  staticRecommendationNormalizedDataResponse,
  staticRecommendationPayload
} from '../../__mocks__/staticRecommendation'
import { fetchStaticRecommendationSlice } from '../static-recommendation'
import { clearStateErrors } from '~domains/redux/actions'
import { FetchStaticRecommendation } from '~domains/static-recommendation/types'
import { Product } from '~domains/product'

describe(fetchStaticRecommendationSlice.name, () => {
  describe(fetchStaticRecommendationSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        fetchStaticRecommendationSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          fetchStaticRecommendationSlice.actions.trigger({
            list: [
              {
                key: staticRecommendationNormalizedDataResponse[0].key,
                products: staticRecommendationNormalizedDataResponse[0]
                  .products as Partial<Product>[]
              }
            ],
            sessionChannel: { channel: 'amazon', sku: 'some-sku' }
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(fetchStaticRecommendationSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        fetchStaticRecommendationSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          fetchStaticRecommendationSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(fetchStaticRecommendationSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        fetchStaticRecommendationSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          fetchStaticRecommendationSlice.actions.success(
            staticRecommendationPayload.list as FetchStaticRecommendation[]
          )
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        details: staticRecommendationPayload.list
      })
    })
  })

  describe(fetchStaticRecommendationSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        fetchStaticRecommendationSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          fetchStaticRecommendationSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened'
      })
    })
  })

  describe(fetchStaticRecommendationSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        fetchStaticRecommendationSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          fetchStaticRecommendationSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears all errors in the state', async () => {
      expect(
        fetchStaticRecommendationSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'Some error'
          },
          clearStateErrors()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
