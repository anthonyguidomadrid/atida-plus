import { reOrderPayload } from '~domains/checkout/__mocks__/re-order'
import { clearStateErrors } from '~domains/redux'
import { reOrderSlice } from '../re-order'

describe(reOrderSlice.name, () => {
  describe(reOrderSlice.actions.trigger.toString(), () => {
    it('does the trigger', () => {
      expect(
        reOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          reOrderSlice.actions.trigger(reOrderPayload)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(reOrderSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        reOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          reOrderSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(reOrderSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and update the state', () => {
      expect(
        reOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          reOrderSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(reOrderSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        reOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          reOrderSlice.actions.failure({
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

  describe(reOrderSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        reOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          reOrderSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears the errors in the state', async () => {
      expect(
        reOrderSlice.reducer(
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
