import { socialLoginGooglePayload } from '~domains/social/__mocks__/social-login'
import { socialLoginSlice } from '../login'

describe(socialLoginSlice.name, () => {
  describe(socialLoginSlice.actions.trigger.toString(), () => {
    it('saves the first instance of the item', () => {
      expect(
        socialLoginSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          socialLoginSlice.actions.trigger(socialLoginGooglePayload)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(socialLoginSlice.actions.trigger.toString(), () => {
    it('does not duplicate the item if it already exists', () => {
      expect(
        socialLoginSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          socialLoginSlice.actions.trigger(socialLoginGooglePayload)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(socialLoginSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        socialLoginSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          socialLoginSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(socialLoginSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true - Verified account', () => {
      expect(
        socialLoginSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          socialLoginSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })

    it('sets wasSuccess to true - Non verified account', () => {
      expect(
        socialLoginSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          socialLoginSlice.actions.success({
            accessToken: 'socialAccessToken',
            refreshToken: 'some-refresh-token',
            expiresIn: 423423,
            social: {
              isNew: false,
              needsVerification: true,
              email: 'someEmail@email.com',
              firstName: 'name'
            },
            redirectUri: 'somehost.com/SomeRedirectUri',
            serviceType: 'Google'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: {
          accessToken: 'socialAccessToken',
          refreshToken: 'some-refresh-token',
          expiresIn: 423423,
          isNew: false,
          needsVerification: true,
          email: 'someEmail@email.com',
          firstName: 'name',
          redirectUri: 'somehost.com/SomeRedirectUri',
          serviceType: 'Google'
        }
      })
    })
  })

  describe(socialLoginSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        socialLoginSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          socialLoginSlice.actions.failure({
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

  describe(socialLoginSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        socialLoginSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          socialLoginSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(socialLoginSlice.actions.resetDetails.toString(), () => {
    it('resets the state', () => {
      expect(
        socialLoginSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false,
            details: {
              accessToken: 'socialAccessToken',
              refreshToken: 'some-refresh-token',
              expiresIn: 423423,
              isNew: false,
              needsVerification: true,
              email: 'someEmail@email.com',
              firstName: 'name',
              redirectUri: 'somehost.com/SomeRedirectUri',
              serviceType: 'Google'
            }
          },
          socialLoginSlice.actions.resetDetails()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(socialLoginSlice.actions.resetErrors.toString(), () => {
    it('resets the state', () => {
      expect(
        socialLoginSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true,
            error: 'Some error content'
          },
          socialLoginSlice.actions.resetErrors()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
