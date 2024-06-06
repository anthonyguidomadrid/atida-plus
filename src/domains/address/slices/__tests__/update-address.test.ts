import { updateAddressSlice } from '../update-address'
import { address } from '~domains/address/__mocks__/addresses'

describe(updateAddressSlice.name, () => {
  describe(updateAddressSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        updateAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          updateAddressSlice.actions.trigger(address)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(updateAddressSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        updateAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          updateAddressSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(updateAddressSlice.actions.success.toString(), () => {
    it('sets wasSuccess and show notification to true', () => {
      expect(
        updateAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          updateAddressSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(updateAddressSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        updateAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          updateAddressSlice.actions.failure({
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

  describe(updateAddressSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        updateAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          updateAddressSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(updateAddressSlice.actions.clearSuccess.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        updateAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false
          },
          updateAddressSlice.actions.clearSuccess()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
