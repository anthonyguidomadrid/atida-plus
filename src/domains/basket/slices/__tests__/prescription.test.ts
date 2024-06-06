import { prescriptionSlice } from '../prescription'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'

describe('prescriptionSlice', () => {
  describe('addPrescriptionToBasketTrigger', () => {
    it('does nothing on add prescription trigger', () => {
      expect(
        prescriptionSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            token: ''
          },
          prescriptionSlice.actions.addPrescriptionToBasketTrigger('')
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        token: ''
      })
    })
  })

  describe('addPrescriptionToBasketRequest', () => {
    it('sets isLoading to true', () => {
      expect(
        prescriptionSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            token: 'test-token'
          },
          prescriptionSlice.actions.addPrescriptionToBasketRequest()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        token: 'test-token'
      })
    })
  })

  describe('addPrescriptionToBasketSuccess', () => {
    it('sets wasSuccess to true', () => {
      expect(
        prescriptionSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            token: ''
          },
          prescriptionSlice.actions.addPrescriptionToBasketSuccess(
            basketWithProducts
          )
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        token: '',
        data: basketWithProducts
      })
    })
  })

  describe('addPrescriptionToBasketFailure', () => {
    it('sets wasError to true', () => {
      expect(
        prescriptionSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            token: ''
          },
          prescriptionSlice.actions.addPrescriptionToBasketFailure({
            message: 'error'
          })
        )
      ).toEqual({
        isLoading: true,
        error: 'error',
        token: '',
        wasSuccess: false,
        wasError: true
      })
    })
  })

  describe('addPrescriptionToBasketFulfill', () => {
    it('sets isLoading to false', () => {
      expect(
        prescriptionSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            token: 'test-token'
          },
          prescriptionSlice.actions.addPrescriptionToBasketFulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        token: 'test-token'
      })
    })
  })
})
