import { createAddressSlice } from '../create-address'
import { address } from '~domains/address/__mocks__/addresses'

describe(createAddressSlice.name, () => {
  describe(createAddressSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createAddressSlice.actions.trigger(address)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createAddressSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createAddressSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createAddressSlice.actions.success.toString(), () => {
    it('sets wasSuccess and show notification to true', () => {
      expect(
        createAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createAddressSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(createAddressSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createAddressSlice.actions.failure({
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

  describe(createAddressSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createAddressSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(createAddressSlice.actions.clearSuccess.toString(), () => {
    it('clears success state', () => {
      expect(
        createAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false
          },
          createAddressSlice.actions.clearSuccess()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
