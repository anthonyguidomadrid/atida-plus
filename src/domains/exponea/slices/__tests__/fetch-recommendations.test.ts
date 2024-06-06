import { recommendedProducts } from '~domains/exponea/__mocks__/recommendation'
import { fetchRecommendationsSlice } from '../fetch-recommendations'
import { clearStateErrors } from '~domains/redux/actions'

describe(fetchRecommendationsSlice.name, () => {
  describe(fetchRecommendationsSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        fetchRecommendationsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          fetchRecommendationsSlice.actions.trigger({
            recommendationId: 'someRecommendationId'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(fetchRecommendationsSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        fetchRecommendationsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          fetchRecommendationsSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(fetchRecommendationsSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        fetchRecommendationsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          fetchRecommendationsSlice.actions.success(recommendedProducts)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: [recommendedProducts]
      })
    })
  })

  describe(fetchRecommendationsSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        fetchRecommendationsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          fetchRecommendationsSlice.actions.failure({
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

  describe(fetchRecommendationsSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        fetchRecommendationsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          fetchRecommendationsSlice.actions.fulfill()
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
        fetchRecommendationsSlice.reducer(
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
