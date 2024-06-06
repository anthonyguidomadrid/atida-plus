import { loginSlice } from '../login'

describe(loginSlice.name, () => {
  describe(loginSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: false,
            notification: '',
            wasSuccess: false,
            wasError: false
          },
          loginSlice.actions.trigger({ email: '', password: '' })
        )
      ).toEqual({
        isLoading: false,
        notification: '',
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(loginSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: false,
            notification: '',
            wasSuccess: false,
            wasError: false
          },
          loginSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        notification: '',
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(loginSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: true,
            notification: '',
            wasSuccess: false,
            wasError: false
          },
          loginSlice.actions.success([{}])
        )
      ).toEqual({
        isLoading: true,
        notification: '',
        wasSuccess: true,
        wasError: false,
        messages: [{}]
      })
    })
  })

  describe(loginSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: true,
            notification: '',
            wasSuccess: false,
            wasError: false
          },
          loginSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        notification: '',
        wasSuccess: false,
        wasError: true,
        error: 'An error happened'
      })
    })
  })

  describe(loginSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: true,
            notification: '',
            wasSuccess: true,
            wasError: false
          },
          loginSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        notification: '',
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(loginSlice.actions.triggerNotification.toString().toString(), () => {
    it('triggers notification', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: false,
            notification: '',
            wasSuccess: true,
            wasError: false
          },
          loginSlice.actions.triggerNotification({ type: 'test' })
        )
      ).toEqual({
        isLoading: false,
        notification: 'test',
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(loginSlice.actions.clearNotification.toString(), () => {
    it('clears notification', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: false,
            notification: 'test',
            wasSuccess: true,
            wasError: false
          },
          loginSlice.actions.clearNotification()
        )
      ).toEqual({
        isLoading: false,
        notification: '',
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(loginSlice.actions.clearError.toString(), () => {
    it('clears error', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: false,
            notification: '',
            wasSuccess: true,
            wasError: true,
            error: 'some error'
          },
          loginSlice.actions.clearError()
        )
      ).toEqual({
        isLoading: false,
        notification: '',
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(loginSlice.actions.setEmail.toString(), () => {
    it('saves the email when fired', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: false,
            notification: '',
            wasSuccess: false,
            wasError: false
          },
          loginSlice.actions.setEmail({ email: 'someEmail' })
        )
      ).toEqual({
        isLoading: false,
        email: 'someEmail',
        notification: '',
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(loginSlice.actions.clearMessages.toString(), () => {
    it('clears the messages', () => {
      expect(
        loginSlice.reducer(
          {
            isLoading: false,
            notification: '',
            wasSuccess: false,
            wasError: false,
            messages: [
              {
                type: 'some-type',
                value: 'some value',
                parameters: [],
                message: 'some message'
              }
            ]
          },
          loginSlice.actions.clearMessages()
        )
      ).toEqual({
        isLoading: false,
        notification: '',
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
