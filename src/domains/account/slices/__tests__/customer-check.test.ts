import { customerCheckSlice } from '../customer-check'

describe(customerCheckSlice.name, () => {
  describe(customerCheckSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', async () => {
      expect(
        customerCheckSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          customerCheckSlice.actions.trigger({ email: 'someEmail@test.com' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(customerCheckSlice.actions.request.toString(), () => {
    it('sets isLoading to true', async () => {
      expect(
        customerCheckSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          customerCheckSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(customerCheckSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        customerCheckSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          customerCheckSlice.actions.success({
            email: 'someEmail@test.com',
            exists: false
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: { email: 'someEmail@test.com', exists: false }
      })
    })
  })

  describe(customerCheckSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        customerCheckSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          customerCheckSlice.actions.failure({
            message: 'An error has occurred'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error has occurred'
      })
    })
  })

  describe(customerCheckSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        customerCheckSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          customerCheckSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(customerCheckSlice.actions.clear.toString(), () => {
    it('clears the state', () => {
      expect(
        customerCheckSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          customerCheckSlice.actions.clear()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
