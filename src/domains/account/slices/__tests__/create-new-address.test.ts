import { createNewAddressSlice } from '../create-new-address'
import { createNewAddress } from '~domains/account/__mocks__/create-new-address'

describe(createNewAddressSlice.name, () => {
  describe(createNewAddressSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createNewAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createNewAddressSlice.actions.trigger(createNewAddress)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createNewAddressSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createNewAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createNewAddressSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createNewAddressSlice.actions.success.toString(), () => {
    it('sets wasSuccess and show notification to true', () => {
      expect(
        createNewAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createNewAddressSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(createNewAddressSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createNewAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createNewAddressSlice.actions.failure({
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

  describe(createNewAddressSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createNewAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createNewAddressSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })
})
