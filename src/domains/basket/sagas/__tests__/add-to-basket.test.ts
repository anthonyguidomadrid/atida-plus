import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  addToBasketFailure,
  addToBasketFulfill,
  addToBasketSuccess,
  addToBasketTrigger
} from '~domains/basket/slices'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { RootState } from '~domains/redux'
import { addToBasketSaga } from '../add-to-basket'

describe('basket/add-to-basket saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(addToBasketSaga)

    return saga
  }

  describe('when addToBasket is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: basketWithProducts
        })

        const saga = setup()
        saga.dispatch(addToBasketTrigger({ sku: 'some-sku', quantity: 7 }))
        await saga.waitFor(
          addToBasketFulfill({ sku: 'some-sku', quantity: 7 }).type
        )

        expect(axios.post).toHaveBeenCalledWith('/api/basket/add', {
          hasPreviousItems: false,
          quantity: 7,
          sku: 'some-sku'
        })

        expect(saga.getCalledActions()).toContainEqual(
          addToBasketSuccess({
            sku: 'some-sku',
            quantity: 7,
            data: basketWithProducts
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addToBasketFulfill({ sku: 'some-sku', quantity: 7 })
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
        saga.dispatch(addToBasketTrigger({ sku: 'some-sku', quantity: 7 }))
        await saga.waitFor(
          addToBasketFulfill({ sku: 'some-sku', quantity: 7 }).type
        )

        expect(saga.getCalledActions()).toContainEqual(
          addToBasketFailure({
            sku: 'some-sku',
            quantity: 7,
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addToBasketFulfill({ sku: 'some-sku', quantity: 7 })
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
        saga.dispatch(addToBasketTrigger({ sku: 'some-sku', quantity: 7 }))
        await saga.waitFor(
          addToBasketFulfill({ sku: 'some-sku', quantity: 7 }).type
        )

        expect(saga.getCalledActions()).toContainEqual(
          addToBasketFailure({
            sku: 'some-sku',
            quantity: 7,
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addToBasketFulfill({ sku: 'some-sku', quantity: 7 })
        )
      })
    })
  })
})
