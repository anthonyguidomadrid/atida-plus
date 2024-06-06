import { setNewPasswordSlice } from '../set-new-password'

describe(setNewPasswordSlice.name, () => {
  describe(setNewPasswordSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        setNewPasswordSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          setNewPasswordSlice.actions.trigger({
            restorePasswordKey: '',
            password: '',
            confirmPassword: ''
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(setNewPasswordSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        setNewPasswordSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          setNewPasswordSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(setNewPasswordSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        setNewPasswordSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          setNewPasswordSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(setNewPasswordSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        setNewPasswordSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          setNewPasswordSlice.actions.failure({
            message: 'An error has occurred!'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error has occurred!'
      })
    })
  })

  describe(setNewPasswordSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        setNewPasswordSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          setNewPasswordSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })
  describe(setNewPasswordSlice.actions.clearState.toString(), () => {
    it('clears the state', () => {
      expect(
        setNewPasswordSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true
          },
          setNewPasswordSlice.actions.clearState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
