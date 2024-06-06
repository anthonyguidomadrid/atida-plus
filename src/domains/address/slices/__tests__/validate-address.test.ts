import { validateAddressSlice } from '../validate-address'
import {
  qualifiedQuery,
  validatedAddress
} from '~domains/address/__mocks__/addresses'

describe(validateAddressSlice.name, () => {
  describe(validateAddressSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        validateAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          validateAddressSlice.actions.trigger(qualifiedQuery)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(validateAddressSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        validateAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          validateAddressSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(validateAddressSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and stores the valid address', () => {
      expect(
        validateAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          validateAddressSlice.actions.success(validatedAddress)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        'valid-addresses': validatedAddress
      })
    })
  })

  describe(validateAddressSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        validateAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          validateAddressSlice.actions.failure({
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

  describe(validateAddressSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        validateAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          validateAddressSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(validateAddressSlice.actions.reset.toString(), () => {
    it('clears the stored valid addresses by setting it to undefined', () => {
      expect(
        validateAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false,
            'valid-addresses': validatedAddress
          },
          validateAddressSlice.actions.reset()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        'valid-addresses': undefined
      })
    })
  })
})
