import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  adyenPaymentDetailsFailure,
  adyenPaymentDetailsFulfill,
  adyenPaymentDetailsSuccess,
  adyenPaymentDetailsTrigger
} from '~domains/checkout'
import {
  adyenPaymentDetailsPayload,
  adyenPaymentDetailsResponseData
} from '~domains/checkout/__mocks__/adyen-payment-details'
import { RootState } from '~domains/redux'
import { adyenPaymentDetailsSaga } from '../adyen-payment-details'

describe('checkout/adyen-payment-details saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(adyenPaymentDetailsSaga)

    return saga
  }

  describe('when adyenPaymentDetails is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: adyenPaymentDetailsResponseData
        })

        const saga = setup()
        saga.dispatch(adyenPaymentDetailsTrigger(adyenPaymentDetailsPayload))
        await saga.waitFor(adyenPaymentDetailsFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/adyen-payment-details',
          adyenPaymentDetailsPayload
        )

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentDetailsSuccess(adyenPaymentDetailsResponseData)
        )
        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentDetailsFulfill()
        )
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
        saga.dispatch(adyenPaymentDetailsTrigger(adyenPaymentDetailsPayload))
        await saga.waitFor(adyenPaymentDetailsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentDetailsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentDetailsFulfill()
        )
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
        saga.dispatch(adyenPaymentDetailsTrigger(adyenPaymentDetailsPayload))
        await saga.waitFor(adyenPaymentDetailsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentDetailsFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          adyenPaymentDetailsFulfill()
        )
      })
    })
  })
})
