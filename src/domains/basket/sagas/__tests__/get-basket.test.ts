import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getBasketFailure,
  getBasketFulfill,
  getBasketSuccess,
  getBasketTrigger,
  getBasketCancel
} from '~domains/basket/slices'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { RootState } from '~domains/redux'
import { createClient } from '~helpers'
import { getBasketSaga } from '../get-basket'

describe('basket/get-basket saga', () => {
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
    saga.start(getBasketSaga)

    return saga
  }

  describe('when getBasket is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          data: basketWithProducts
        })

        const saga = setup()
        saga.dispatch(getBasketTrigger())
        await saga.waitFor(getBasketFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: true,
          locale: 'cimode'
        })
        expect(axios.get).toHaveBeenCalledWith('/api/basket/get?locale=cimode')

        expect(saga.getCalledActions()).toContainEqual(
          getBasketSuccess(basketWithProducts)
        )
        expect(saga.getCalledActions()).toContainEqual(getBasketFulfill())
      })
    })

    describe('and basket has already been fetched', () => {
      it('does not call the api then dispatches cancel and fulfill actions', async () => {
        const saga = setup({
          client: {
            basket: {
              content: {
                wasSuccess: true
              }
            }
          }
        })
        saga.dispatch(getBasketTrigger())
        await saga.waitFor(getBasketFulfill().type)

        expect(createClient).not.toHaveBeenCalled()
        expect(axios.get).not.toHaveBeenCalled()

        expect(saga.getCalledActions()).toContainEqual(getBasketCancel())
        expect(saga.getCalledActions()).toContainEqual(getBasketFulfill())
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
        saga.dispatch(getBasketTrigger())
        await saga.waitFor(getBasketFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getBasketFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getBasketFulfill())
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
        saga.dispatch(getBasketTrigger())
        await saga.waitFor(getBasketFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getBasketFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getBasketFulfill())
      })
    })
  })
})
