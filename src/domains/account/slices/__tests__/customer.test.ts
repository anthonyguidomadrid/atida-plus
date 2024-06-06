import { customerSlice } from '../customer'

describe(customerSlice.name, () => {
  describe(customerSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          customerSlice.actions.trigger({
            customerReference: 'some ref'
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

  describe(customerSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          customerSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        showNotification: false
      })
    })
  })

  describe(customerSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          customerSlice.actions.success({
            firstName: 'John',
            addresses: ['address1', 'address2']
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        showNotification: false,
        details: { firstName: 'John' },
        addresses: ['address1', 'address2']
      })
    })
  })

  describe(customerSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          customerSlice.actions.failure({
            message: 'An error has occurred'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        showNotification: false,
        error: 'An error has occurred'
      })
    })
  })

  describe(customerSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false,
            showNotification: false
          },
          customerSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        showNotification: false
      })
    })
  })

  describe(customerSlice.actions.triggerReadCustomer.toString(), () => {
    it('does nothing on trigger Read Customer', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          customerSlice.actions.trigger({})
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        showNotification: false
      })
    })
  })

  describe(customerSlice.actions.readCustomer.toString(), () => {
    it('sets the correct state for Read Customer if the details undefined', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          customerSlice.actions.readCustomer({
            hasPreviousSuccessfulOrder: false,
            reference: 'some-ref'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        showNotification: false,
        reference: 'some-ref',
        details: { hasPreviousSuccessfulOrder: false }
      })
    })

    it('sets the correct state for Read Customer if the details defined', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: false,
            details: {}
          },
          customerSlice.actions.readCustomer({
            hasPreviousSuccessfulOrder: false,
            reference: 'some-ref'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        showNotification: false,
        reference: 'some-ref',
        details: { hasPreviousSuccessfulOrder: false }
      })
    })
  })

  describe(customerSlice.actions.triggerShowNotification.toString(), () => {
    it('triggers the show notification', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: false
          },
          customerSlice.actions.triggerShowNotification()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        showNotification: true
      })
    })
  })

  describe(customerSlice.actions.triggerHideNotification.toString(), () => {
    it('triggers the hide notification', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: true
          },
          customerSlice.actions.triggerHideNotification()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        showNotification: false
      })
    })
  })

  describe(customerSlice.actions.clearData.toString(), () => {
    it('clears all data in the state', () => {
      expect(
        customerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            showNotification: false,
            reference: 'some-ref',
            details: { firstName: 'John', hasPreviousSuccessfulOrder: false }
          },
          customerSlice.actions.clearData()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        showNotification: false
      })
    })
  })
})
