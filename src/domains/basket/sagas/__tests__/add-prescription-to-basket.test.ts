import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { RootState } from '~domains/redux'
import {
  addPrescriptionToBasketFailure,
  addPrescriptionToBasketFulfill,
  addPrescriptionToBasketSuccess,
  addPrescriptionToBasketTrigger
} from '../../slices'

import { addPrescriptionToBasketSaga } from '../add-prescription-to-basket'

const mockAxios = axios as jest.Mocked<typeof axios>

describe('basket/add-prescription-to-basket saga', () => {
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
    saga.start(addPrescriptionToBasketSaga)

    return saga
  }

  describe('when addPrescriptionToBasket is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        mockAxios.post.mockResolvedValue({
          data: basketWithProducts
        })

        const saga = setup()
        saga.dispatch(addPrescriptionToBasketTrigger('test-token'))
        await saga.waitFor(addPrescriptionToBasketFulfill().type)

        expect(mockAxios.post).toHaveBeenCalledWith(
          '/api/basket/add-prescription',
          {
            cartId: 'f0849e9c-6712-54b9-8db5-440438d03387',
            prescriptionToken: 'test-token'
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          addPrescriptionToBasketSuccess(basketWithProducts)
        )
        expect(saga.getCalledActions()).toContainEqual(
          addPrescriptionToBasketFulfill()
        )
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure and fulfill actions', async () => {
        mockAxios.post.mockRejectedValue({
          response: {
            data: {
              message: 'test-error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(addPrescriptionToBasketTrigger('test-token'))
        await saga.waitFor(addPrescriptionToBasketFulfill().type)

        expect(mockAxios.post).toHaveBeenCalledWith(
          '/api/basket/add-prescription',
          {
            cartId: 'f0849e9c-6712-54b9-8db5-440438d03387',
            prescriptionToken: 'test-token'
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          addPrescriptionToBasketFailure({ message: 'test-error' })
        )
        expect(saga.getCalledActions()).toContainEqual(
          addPrescriptionToBasketFulfill()
        )
      })
    })
  })
})
