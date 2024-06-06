import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  setDataFailure,
  setDataFulfill,
  setDataSuccess,
  setDataTrigger
} from '~domains/checkout'
import { checkoutData } from '~domains/checkout/__mocks__/checkout-data'
import { RootState } from '~domains/redux'
import { setCheckoutDataSaga } from '../set-checkout-data'

describe('checkout/set-checkout-data saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(setCheckoutDataSaga)

    return saga
  }

  describe('when setData is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: checkoutData
        })

        const saga = setup()
        saga.dispatch(setDataTrigger({ deliveryMethod: '7' }))
        await saga.waitFor(setDataFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/checkout/set-data', {
          deliveryMethod: '7'
        })

        expect(saga.getCalledActions()).toContainEqual(
          setDataSuccess(checkoutData)
        )
        expect(saga.getCalledActions()).toContainEqual(setDataFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          message: 'Some unknown error'
        })

        const saga = setup()
        saga.dispatch(setDataTrigger({ deliveryMethod: '7' }))
        await saga.waitFor(setDataFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          setDataFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(setDataFulfill())
      })
    })

    describe('and request fails', () => {
      let windowSpy: jest.SpyInstance
      beforeEach(() => {
        windowSpy = jest.spyOn(window, 'window', 'get')
      })
      afterEach(() => {
        windowSpy.mockRestore()
      })
      it('calls the api then dispatches failure action when the error includes 500 or 502', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          message: 'Some unknown error 500'
        })

        windowSpy.mockImplementation(() => ({
          history: {
            state: {
              url: 'https://atida.com/pt-pt/checkout'
            }
          }
        }))

        jest.setTimeout(90000)
        const saga = setup()
        saga.dispatch(setDataTrigger({ deliveryMethod: '7' }))
        await saga.waitFor(setDataFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          setDataFailure({
            message: 'Api request failed after several attempts'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(setDataFulfill())
      })

      it('calls the api then dispatches success action when the second call is made', async () => {
        ;(axios.post as jest.Mock).mockRejectedValueOnce({
          message: 'Some unknown error 500'
        })
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: checkoutData
        })

        windowSpy.mockImplementation(() => ({
          history: {
            state: {
              url: 'https://atida.com/pt-pt/checkout'
            }
          }
        }))

        const saga = setup()
        saga.dispatch(setDataTrigger({ deliveryMethod: '7' }))
        await saga.waitFor(setDataFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          setDataSuccess(checkoutData)
        )
        expect(saga.getCalledActions()).toContainEqual(setDataFulfill())
      })

      it('calls the api then dispatches failure action when the user navigates away from the checkout', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          message: 'Some unknown error 500'
        })

        windowSpy.mockImplementation(() => ({
          history: {
            state: {
              url: 'https://atida.com/pt-pt/basket'
            }
          }
        }))

        const saga = setup()
        saga.dispatch(setDataTrigger({ deliveryMethod: '7' }))
        await saga.waitFor(setDataFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          setDataFailure({
            message: 'Some unknown error 500'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(setDataFulfill())
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
        saga.dispatch(setDataTrigger({ deliveryMethod: '7' }))
        await saga.waitFor(setDataFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          setDataFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(setDataFulfill())
      })
    })
  })
})
