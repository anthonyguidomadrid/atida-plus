import { cancelOrderSlice } from '../cancel-order'
import { clearStateErrors } from '~domains/redux/actions'

describe(cancelOrderSlice.name, () => {
  describe(cancelOrderSlice.actions.trigger.toString(), () => {
    it('does the trigger', () => {
      expect(
        cancelOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          cancelOrderSlice.actions.trigger({
            orderId: 'PT--279'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(cancelOrderSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        cancelOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          cancelOrderSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(cancelOrderSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and updates the state', () => {
      expect(
        cancelOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          cancelOrderSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(cancelOrderSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        cancelOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          cancelOrderSlice.actions.failure({
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

  describe(cancelOrderSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        cancelOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          cancelOrderSlice.actions.fulfill()
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
        cancelOrderSlice.reducer(
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

  describe(cancelOrderSlice.actions.resetState.toString(), () => {
    it('resets the state', () => {
      expect(
        cancelOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true,
            error: 'An error has occurred'
          },
          cancelOrderSlice.actions.resetState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
