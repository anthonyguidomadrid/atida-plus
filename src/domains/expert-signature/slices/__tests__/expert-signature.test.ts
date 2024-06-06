import {
  expertSignature,
  expertSignatureContentfulResponse
} from '../../__mocks__/expert-signature'
import { expertSignatureSlice } from '../expert-signature'
import { clearStateErrors } from '~domains/redux/actions'

describe(expertSignatureSlice.name, () => {
  describe(expertSignatureSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        expertSignatureSlice.reducer(
          {
            experts: [],
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          expertSignatureSlice.actions.trigger({
            categoryId: 'beauty'
          })
        )
      ).toEqual({
        experts: [],
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
  describe(expertSignatureSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        expertSignatureSlice.reducer(
          {
            experts: [],
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          expertSignatureSlice.actions.request()
        )
      ).toEqual({
        experts: [],
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })
  describe(expertSignatureSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        expertSignatureSlice.reducer(
          {
            experts: [],
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          expertSignatureSlice.actions.success(
            expertSignatureContentfulResponse.data.data
              .expertSignatureCollection
          )
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        ...expertSignature
      })
    })
  })
  describe(expertSignatureSlice.actions.failure.toString(), () => {
    it('sets wasError to true', () => {
      expect(
        expertSignatureSlice.reducer(
          {
            experts: [],
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          expertSignatureSlice.actions.failure({
            message: 'error'
          })
        )
      ).toEqual({
        experts: [],
        isLoading: false,
        wasSuccess: false,
        wasError: true,
        error: 'error'
      })
    })
  })
  describe(expertSignatureSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        expertSignatureSlice.reducer(
          {
            experts: [],
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          expertSignatureSlice.actions.fulfill()
        )
      ).toEqual({
        experts: [],
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })
  describe(clearStateErrors.toString(), () => {
    it('clears state errors', () => {
      expect(
        expertSignatureSlice.reducer(
          {
            experts: [],
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'error'
          },
          clearStateErrors()
        )
      ).toEqual({
        experts: [],
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
