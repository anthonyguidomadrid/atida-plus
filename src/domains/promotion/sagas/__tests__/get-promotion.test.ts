import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getPromotionFailure,
  getPromotionFulfill,
  getPromotionTrigger
} from '~domains/promotion/slices'
import { RootState } from '~domains/redux'
import { createClient } from '~helpers'
import { getPromotionSaga } from '../get-promotion'
import { promotions } from '~components/molecules/Promotions/Promotions.mock'
import type { DeepPartial } from '@reduxjs/toolkit'

describe('promotion/get-promotion saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(getPromotionSaga)

    return saga
  }

  describe('when getPromotion is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          data: promotions.items
        })

        const saga = setup()
        saga.dispatch(getPromotionTrigger())
        await saga.waitFor(getPromotionFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: false,
          locale: 'cimode'
        })
        expect(axios.get).toHaveBeenCalledWith('/api/promotion/get', {
          params: { skip: undefined }
        })

        expect(saga.getCalledActions()).toContainEqual(getPromotionFulfill())
      })
    })

    describe('and promotions has already been fetched', () => {
      it('dispatches fulfill actions', async () => {
        const saga = setup({
          server: {
            promotion: {
              content: {
                wasSuccess: true
              }
            }
          }
        })
        saga.dispatch(getPromotionTrigger())
        await saga.waitFor(getPromotionFulfill().type)

        expect(createClient).toHaveBeenCalled()
        expect(axios.get).toHaveBeenCalled()

        expect(saga.getCalledActions()).toContainEqual(getPromotionFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(getPromotionTrigger())
        await saga.waitFor(getPromotionFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getPromotionFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getPromotionFulfill())
      })
    })

    describe('and request fails with multpile error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
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
        saga.dispatch(getPromotionTrigger())
        await saga.waitFor(getPromotionFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getPromotionFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getPromotionFulfill())
      })
    })
  })
})
