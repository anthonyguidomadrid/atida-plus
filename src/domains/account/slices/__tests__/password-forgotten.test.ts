import { passwordForgottenSlice } from '../password-forgotten'

describe(passwordForgottenSlice.name, () => {
  describe(passwordForgottenSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        passwordForgottenSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          passwordForgottenSlice.actions.trigger({ email: '' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(passwordForgottenSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        passwordForgottenSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          passwordForgottenSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(passwordForgottenSlice.actions.success.toString(), () => {
    expect(
      passwordForgottenSlice.reducer(
        {
          isLoading: true,
          wasSuccess: false,
          wasError: false
        },
        passwordForgottenSlice.actions.success({ email: 'some@email.com' })
      )
    ).toEqual({
      isLoading: true,
      wasSuccess: true,
      wasError: false
    })
  })

  describe(passwordForgottenSlice.actions.failure.toString(), () => {
    expect(
      passwordForgottenSlice.reducer(
        {
          isLoading: true,
          wasSuccess: false,
          wasError: false
        },
        passwordForgottenSlice.actions.failure({
          message: 'An error has occured!'
        })
      )
    ).toEqual({
      isLoading: true,
      wasSuccess: false,
      wasError: true,
      error: 'An error has occured!'
    })
  })

  describe(passwordForgottenSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        passwordForgottenSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          passwordForgottenSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(passwordForgottenSlice.actions.resetState.toString(), () => {
    it('resets the state', () => {
      expect(
        passwordForgottenSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true,
            error: 'Some error'
          },
          passwordForgottenSlice.actions.resetState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
