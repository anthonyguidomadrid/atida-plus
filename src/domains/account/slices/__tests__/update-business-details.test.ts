import { updateBusinessDetailsSlice } from '../update-business-details'

describe(updateBusinessDetailsSlice.name, () => {
  describe(updateBusinessDetailsSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        updateBusinessDetailsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          updateBusinessDetailsSlice.actions.trigger({
            companyName: 'Some company name',
            taxReference: '123456789',
            equivalenceSurcharge: false,
            reference: 'some-reference'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(updateBusinessDetailsSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        updateBusinessDetailsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          updateBusinessDetailsSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(updateBusinessDetailsSlice.actions.success.toString(), () => {
    it('sets wasSuccess and show notification to true', () => {
      expect(
        updateBusinessDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          updateBusinessDetailsSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(updateBusinessDetailsSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        updateBusinessDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          updateBusinessDetailsSlice.actions.failure({
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

  describe(updateBusinessDetailsSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        updateBusinessDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          updateBusinessDetailsSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })
})
