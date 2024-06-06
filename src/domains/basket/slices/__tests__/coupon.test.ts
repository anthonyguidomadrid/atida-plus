import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { couponSlice } from '../coupon'
import { clearStateErrors } from '~domains/redux/actions'

describe(couponSlice.name, () => {
  describe(couponSlice.actions.addCouponTrigger.toString(), () => {
    it('does nothing on add coupon trigger', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.addCouponTrigger('')
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(couponSlice.actions.addCouponRequest.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.addCouponRequest()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(couponSlice.actions.addCouponSuccess.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.addCouponSuccess(basketWithProducts)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(couponSlice.actions.addCouponFailure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.addCouponFailure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        coupon: [],
        error: 'An error happened'
      })
    })
  })

  describe(couponSlice.actions.addCouponFulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.addCouponFulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(couponSlice.actions.reset.toString(), () => {
    it('reset coupons', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true,
            coupon: []
          },
          couponSlice.actions.reset()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears all errors in the state', async () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'Some error',
            coupon: []
          },
          clearStateErrors()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        coupon: []
      })
    })
  })
  describe(couponSlice.actions.removeCouponTrigger.toString(), () => {
    it('does nothing on remove coupon trigger', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.removeCouponTrigger('')
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(couponSlice.actions.removeCouponRequest.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.removeCouponRequest()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(couponSlice.actions.removeCouponSuccess.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.removeCouponSuccess(basketWithProducts)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(couponSlice.actions.removeCouponFailure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.removeCouponFailure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        coupon: [],
        error: 'An error happened'
      })
    })
  })

  describe(couponSlice.actions.removeCouponFulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false,
            coupon: []
          },
          couponSlice.actions.removeCouponFulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(couponSlice.actions.reset.toString(), () => {
    it('reset coupons', () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true,
            coupon: []
          },
          couponSlice.actions.reset()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        coupon: []
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears all errors in the state', async () => {
      expect(
        couponSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'Some error',
            coupon: []
          },
          clearStateErrors()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        coupon: []
      })
    })
  })
})
