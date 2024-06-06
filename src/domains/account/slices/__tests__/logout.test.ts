import { logoutSlice } from '../logout'

describe(logoutSlice.name, () => {
  describe(logoutSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        logoutSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          logoutSlice.actions.trigger()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(logoutSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        logoutSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          logoutSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(logoutSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        logoutSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          logoutSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(logoutSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        logoutSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          logoutSlice.actions.failure({
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

  describe(logoutSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        logoutSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          logoutSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })
})
