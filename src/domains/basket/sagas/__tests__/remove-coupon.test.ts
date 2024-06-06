import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  removeCouponTrigger,
  removeCouponFulfill,
  removeCouponFailure,
  removeCouponSuccess
} from '~domains/basket/slices'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { RootState } from '~domains/redux'
import { removeCouponSaga } from '../remove-coupon'

describe('coupon/remove-coupon saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(removeCouponSaga)

    return saga
  }
  describe('when removeCoupon is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.delete as jest.Mock).mockResolvedValue({
          data: basketWithProducts
        })

        const saga = setup()
        saga.dispatch(removeCouponTrigger('total-20-percent-off'))
        await saga.waitFor(removeCouponFulfill().type)

        expect(axios.delete).toHaveBeenCalledWith('/api/basket/remove-coupon', {
          data: {
            cartId: undefined,
            coupon: 'total-20-percent-off'
          }
        })

        expect(saga.getCalledActions()).toContainEqual(
          removeCouponSuccess(basketWithProducts)
        )
        expect(saga.getCalledActions()).toContainEqual(removeCouponFulfill())
      })
    })
  })
  describe('and request fails', () => {
    it('calls the api then dispatches failure action', async () => {
      ;(axios.delete as jest.Mock).mockRejectedValue({
        response: {
          status: 500,
          data: {
            name: 'UnknownError',
            message: 'Some unknown error'
          }
        }
      })

      const saga = setup()
      saga.dispatch(removeCouponTrigger('total-20-percent-off'))
      await saga.waitFor(removeCouponFulfill().type)

      expect(saga.getCalledActions()).toContainEqual(
        removeCouponFailure({
          message: 'Some unknown error'
        })
      )
      expect(saga.getCalledActions()).toContainEqual(removeCouponFulfill())
    })
  })

  describe('and request fails with multpile error messages', () => {
    it('calls the api then dispatches failure action', async () => {
      ;(axios.delete as jest.Mock).mockRejectedValue({
        response: {
          status: 500,
          data: {
            name: 'UnknownError',
            message: [
              'Some unknown error',
              'Some other unknown error',
              'And some unknown error'
            ]
          }
        }
      })

      const saga = setup()
      saga.dispatch(removeCouponTrigger('total-20-percent-off'))
      await saga.waitFor(removeCouponFulfill().type)

      expect(saga.getCalledActions()).toContainEqual(
        removeCouponFailure({
          message: 'Some unknown error'
        })
      )
      expect(saga.getCalledActions()).toContainEqual(removeCouponFulfill())
    })
  })
})
