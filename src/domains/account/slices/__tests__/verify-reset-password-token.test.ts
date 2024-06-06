import { verifyResetPasswordTokenSlice } from '../verify-reset-password-token'

describe(verifyResetPasswordTokenSlice.name, () => {
  describe(verifyResetPasswordTokenSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        verifyResetPasswordTokenSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            user: {
              firstName: 'some name',
              lastName: 'some last name',
              email: 'someEmail@test.com'
            }
          },
          verifyResetPasswordTokenSlice.actions.trigger({
            resetPasswordToken: 'some token'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        user: {
          firstName: 'some name',
          lastName: 'some last name',
          email: 'someEmail@test.com'
        }
      })
    })
  })

  describe(verifyResetPasswordTokenSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        verifyResetPasswordTokenSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            user: {
              firstName: 'some name',
              lastName: 'some last name',
              email: 'someEmail@test.com'
            }
          },
          verifyResetPasswordTokenSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        user: {
          firstName: 'some name',
          lastName: 'some last name',
          email: 'someEmail@test.com'
        }
      })
    })
  })

  describe(verifyResetPasswordTokenSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        verifyResetPasswordTokenSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            user: {
              firstName: 'some name',
              lastName: 'some last name',
              email: 'someEmail@test.com'
            }
          },
          verifyResetPasswordTokenSlice.actions.success({
            data: {
              type: 'customer-verify-token',
              id: 'some token',
              attributes: {
                firstName: 'some name',
                lastName: 'some last name',
                email: 'someEmail@test.com',
                gender: null,
                dateOfBirth: null,
                salutation: 'test salutation',
                createdAt: 'test created date',
                updatedAt: 'test updated date',
                emailNotification: false
              }
            }
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        user: {
          firstName: 'some name',
          lastName: 'some last name',
          email: 'someEmail@test.com'
        }
      })
    })
  })

  describe(verifyResetPasswordTokenSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        verifyResetPasswordTokenSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            user: {
              firstName: 'some name',
              lastName: 'some last name',
              email: 'someEmail@test.com'
            }
          },
          verifyResetPasswordTokenSlice.actions.failure({
            message: 'An error has occurred',
            status: 500
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: {
          message: 'An error has occurred',
          status: 500
        },
        user: {
          firstName: 'some name',
          lastName: 'some last name',
          email: 'someEmail@test.com'
        }
      })
    })
  })

  describe(verifyResetPasswordTokenSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        verifyResetPasswordTokenSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false,
            user: {
              firstName: 'some name',
              lastName: 'some last name',
              email: 'someEmail@test.com'
            }
          },
          verifyResetPasswordTokenSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        user: {
          firstName: 'some name',
          lastName: 'some last name',
          email: 'someEmail@test.com'
        }
      })
    })
  })
})
