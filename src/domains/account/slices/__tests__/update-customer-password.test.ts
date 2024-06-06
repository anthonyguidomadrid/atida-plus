import { updateCustomerPasswordSlice } from '../update-customer-password'

describe(updateCustomerPasswordSlice.name, () => {
  describe(updateCustomerPasswordSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        updateCustomerPasswordSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          updateCustomerPasswordSlice.actions.trigger({
            password: '',
            newPassword: '',
            confirmNewPassword: ''
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        showNotification: false
      })
    })
  })

  describe(updateCustomerPasswordSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        updateCustomerPasswordSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          updateCustomerPasswordSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        showNotification: false
      })
    })
  })

  describe(updateCustomerPasswordSlice.actions.success.toString(), () => {
    it('sets wasSuccess and show notification to true', () => {
      expect(
        updateCustomerPasswordSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          updateCustomerPasswordSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        showNotification: true
      })
    })
  })

  describe(updateCustomerPasswordSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        updateCustomerPasswordSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          updateCustomerPasswordSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        showNotification: false,
        error: 'An error happened'
      })
    })
  })

  describe(updateCustomerPasswordSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        updateCustomerPasswordSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false,
            showNotification: false
          },
          updateCustomerPasswordSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        showNotification: false
      })
    })
  })

  describe(
    updateCustomerPasswordSlice.actions.hideNotificationTrigger.toString(),
    () => {
      it('does nothing on trigger', () => {
        expect(
          updateCustomerPasswordSlice.reducer(
            {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              showNotification: false
            },
            updateCustomerPasswordSlice.actions.hideNotificationTrigger()
          )
        ).toEqual({
          isLoading: false,
          wasSuccess: false,
          wasError: false,
          showNotification: false
        })
      })
    }
  )

  describe(
    updateCustomerPasswordSlice.actions.hideNotification.toString(),
    () => {
      it('sets showNotification to false', () => {
        expect(
          updateCustomerPasswordSlice.reducer(
            {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              showNotification: true
            },
            updateCustomerPasswordSlice.actions.hideNotification()
          )
        ).toEqual({
          isLoading: false,
          wasSuccess: false,
          wasError: false,
          showNotification: false
        })
      })
    }
  )
})
