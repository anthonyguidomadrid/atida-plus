import {
  recommendationsCollection,
  normalizedRecommendationsCollection
} from '~domains/exponea/__mocks__/recommendation'
import { fetchAllRecommendationsSlice } from '../fetch-all-recommendations'
import { clearStateErrors } from '~domains/redux/actions'

describe(fetchAllRecommendationsSlice.name, () => {
  describe(fetchAllRecommendationsSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        fetchAllRecommendationsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          fetchAllRecommendationsSlice.actions.trigger({ type: 'PDP1' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(fetchAllRecommendationsSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        fetchAllRecommendationsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          fetchAllRecommendationsSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(fetchAllRecommendationsSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        fetchAllRecommendationsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          fetchAllRecommendationsSlice.actions.success(
            recommendationsCollection
          )
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        content: normalizedRecommendationsCollection
      })
    })
  })

  describe(fetchAllRecommendationsSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        fetchAllRecommendationsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          fetchAllRecommendationsSlice.actions.failure({
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

  describe(fetchAllRecommendationsSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        fetchAllRecommendationsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          fetchAllRecommendationsSlice.actions.fulfill()
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
        fetchAllRecommendationsSlice.reducer(
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
