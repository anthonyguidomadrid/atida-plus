import { createCustomerSlice } from '../create-customer'

describe(createCustomerSlice.name, () => {
  describe(createCustomerSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createCustomerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createCustomerSlice.actions.trigger({
            salutation: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            addresses: { addresses: [] },
            emailNotification: false,
            acceptedTerms: false,
            company: null,
            surcharge: null
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createCustomerSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createCustomerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createCustomerSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createCustomerSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        createCustomerSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createCustomerSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(createCustomerSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createCustomerSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createCustomerSlice.actions.failure({
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

  describe(createCustomerSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createCustomerSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createCustomerSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(createCustomerSlice.actions.fulfill.toString(), () => {
    it('clears the state', () => {
      expect(
        createCustomerSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'Some error message'
          },
          createCustomerSlice.actions.clear()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
