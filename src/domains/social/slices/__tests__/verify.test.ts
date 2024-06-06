import { socialVerifyGooglePayload } from '~domains/social/__mocks__/social-verify'
import { socialVerifySlice } from '../verify'

describe(socialVerifySlice.name, () => {
  describe(socialVerifySlice.actions.trigger.toString(), () => {
    it('saves the first instance of the item', () => {
      expect(
        socialVerifySlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          socialVerifySlice.actions.trigger(socialVerifyGooglePayload)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(socialVerifySlice.actions.trigger.toString(), () => {
    it('does not duplicate the item if it already exists', () => {
      expect(
        socialVerifySlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          socialVerifySlice.actions.trigger(socialVerifyGooglePayload)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(socialVerifySlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        socialVerifySlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          socialVerifySlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(socialVerifySlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        socialVerifySlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          socialVerifySlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(socialVerifySlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        socialVerifySlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          socialVerifySlice.actions.failure({
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

  describe(socialVerifySlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        socialVerifySlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          socialVerifySlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(socialVerifySlice.actions.resetErrors.toString(), () => {
    it('resets the state', () => {
      expect(
        socialVerifySlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true,
            error: 'Some error content'
          },
          socialVerifySlice.actions.resetErrors()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
