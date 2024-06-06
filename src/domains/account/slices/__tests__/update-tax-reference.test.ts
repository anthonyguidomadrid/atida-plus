import { updateTaxReferenceSlice } from '../update-tax-reference'

describe(updateTaxReferenceSlice.name, () => {
  describe(updateTaxReferenceSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        updateTaxReferenceSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          updateTaxReferenceSlice.actions.trigger({
            customerReference: 'some-customer-reference',
            taxReference: 'some-tax-reference'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(updateTaxReferenceSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        updateTaxReferenceSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          updateTaxReferenceSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(updateTaxReferenceSlice.actions.success.toString(), () => {
    it('sets wasSuccess and show notification to true', () => {
      expect(
        updateTaxReferenceSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          updateTaxReferenceSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(updateTaxReferenceSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        updateTaxReferenceSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          updateTaxReferenceSlice.actions.failure({
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

  describe(updateTaxReferenceSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        updateTaxReferenceSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          updateTaxReferenceSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })
})
