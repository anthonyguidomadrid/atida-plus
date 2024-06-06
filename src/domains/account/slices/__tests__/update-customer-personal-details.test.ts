import { updateCustomerPersonalDetailsSlice } from '../update-customer-personal-details'

describe(updateCustomerPersonalDetailsSlice.name, () => {
  describe(
    updateCustomerPersonalDetailsSlice.actions.trigger.toString(),
    () => {
      it('does nothing on trigger', () => {
        expect(
          updateCustomerPersonalDetailsSlice.reducer(
            {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              showNotification: false
            },
            updateCustomerPersonalDetailsSlice.actions.trigger({
              iso2Code: 'GB'
            })
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
    updateCustomerPersonalDetailsSlice.actions.request.toString(),
    () => {
      it('sets isLoading to true', () => {
        expect(
          updateCustomerPersonalDetailsSlice.reducer(
            {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              showNotification: false
            },
            updateCustomerPersonalDetailsSlice.actions.request()
          )
        ).toEqual({
          isLoading: true,
          wasSuccess: false,
          wasError: false,
          showNotification: false
        })
      })
    }
  )

  describe(
    updateCustomerPersonalDetailsSlice.actions.success.toString(),
    () => {
      it('sets wasSuccess and show notification to true', () => {
        expect(
          updateCustomerPersonalDetailsSlice.reducer(
            {
              isLoading: true,
              wasSuccess: false,
              wasError: false,
              showNotification: false
            },
            updateCustomerPersonalDetailsSlice.actions.success()
          )
        ).toEqual({
          isLoading: true,
          wasSuccess: true,
          wasError: false,
          showNotification: true
        })
      })
    }
  )

  describe(
    updateCustomerPersonalDetailsSlice.actions.failure.toString(),
    () => {
      it('sets wasError to true and adds error message', () => {
        expect(
          updateCustomerPersonalDetailsSlice.reducer(
            {
              isLoading: true,
              wasSuccess: false,
              wasError: false,
              showNotification: false
            },
            updateCustomerPersonalDetailsSlice.actions.failure({
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
    }
  )

  describe(
    updateCustomerPersonalDetailsSlice.actions.fulfill.toString(),
    () => {
      it('sets isLoading to false', () => {
        expect(
          updateCustomerPersonalDetailsSlice.reducer(
            {
              isLoading: true,
              wasSuccess: true,
              wasError: false,
              showNotification: false
            },
            updateCustomerPersonalDetailsSlice.actions.fulfill()
          )
        ).toEqual({
          isLoading: false,
          wasSuccess: true,
          wasError: false,
          showNotification: false
        })
      })
    }
  )

  describe(
    updateCustomerPersonalDetailsSlice.actions.hideNotificationTrigger.toString(),
    () => {
      it('does nothing on trigger', () => {
        expect(
          updateCustomerPersonalDetailsSlice.reducer(
            {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              showNotification: false
            },
            updateCustomerPersonalDetailsSlice.actions.hideNotificationTrigger()
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
    updateCustomerPersonalDetailsSlice.actions.hideNotification.toString(),
    () => {
      it('sets showNotification to false', () => {
        expect(
          updateCustomerPersonalDetailsSlice.reducer(
            {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              showNotification: true
            },
            updateCustomerPersonalDetailsSlice.actions.hideNotification()
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
