import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  addCouponSuccess,
  addCouponFailure,
  addCouponTrigger,
  addCouponFulfill
} from '../../slices'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { RootState } from '~domains/redux'
import { addCouponSaga } from '../add-coupon'

describe('coupon/add-coupon saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: {
        ...initialState,
        client: {
          basket: {
            content: {
              data: {
                ...basketWithProducts
              }
            }
          }
        }
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(addCouponSaga)

    return saga
  }

  describe('when addCoupon is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: basketWithProducts
        })

        const saga = setup()
        saga.dispatch(addCouponTrigger('total-20-percent-off'))
        await saga.waitFor(addCouponFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/basket/add-coupon', {
          cartId: 'f0849e9c-6712-54b9-8db5-440438d03387',
          coupon: 'total-20-percent-off'
        })

        expect(saga.getCalledActions()).toContainEqual(
          addCouponSuccess(basketWithProducts)
        )
        expect(saga.getCalledActions()).toContainEqual(addCouponFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(addCouponTrigger('total-20-percent-off'))
        await saga.waitFor(addCouponFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          addCouponFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(addCouponFulfill())
      })
    })

    describe('and request fails with multpile error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
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
        saga.dispatch(addCouponTrigger('total-20-percent-off'))
        await saga.waitFor(addCouponFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          addCouponFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(addCouponFulfill())
      })
    })
  })
})
