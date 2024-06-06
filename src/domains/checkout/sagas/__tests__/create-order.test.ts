import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  createOrderFailure,
  createOrderFulfill,
  createOrderSuccess,
  createOrderTrigger
} from '~domains/checkout'
import { createOrderData } from '~domains/checkout/__mocks__/create-order'
import { RootState } from '~domains/redux'
import { createOrderSaga } from '../create-order'

describe('checkout/create-order saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: {
        ...initialState,
        client: {
          basket: {
            content: {
              data: {
                id: 'some-basket-id',
                items: [],
                coupons: [],
                discounts: []
              }
            }
          },
          account: {
            customer: {
              details: {
                invoiceRequired: true
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
    saga.start(createOrderSaga)

    return saga
  }

  describe('when setCreateOrder is triggered', () => {
    describe('and the order is not already created and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: createOrderData
        })

        const saga = setup()
        saga.dispatch(createOrderTrigger({ orderId: 'PT--0001' }))
        await saga.waitFor(createOrderFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/checkout/create-order', {
          orderId: 'PT--0001',
          basketId: 'some-basket-id',
          invoiceRequired: true
        })

        expect(saga.getCalledActions()).toContainEqual(
          createOrderSuccess(createOrderData)
        )
        expect(saga.getCalledActions()).toContainEqual(createOrderFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error',
              details: {
                code: 1011,
                detail: '{"error":"Unknown error"}',
                status: 422
              }
            }
          }
        })

        const saga = setup()
        saga.dispatch(createOrderTrigger({ orderId: 'PT--0001' }))
        await saga.waitFor(createOrderFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createOrderFailure({
            errorMessage: 'Some unknown error',
            details: { error: 'Unknown error' }
          })
        )
        expect(saga.getCalledActions()).toContainEqual(createOrderFulfill())
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
              ],
              details: {
                code: 1011,
                detail: '{"error":"Some unknown error"}',
                status: 422
              }
            }
          }
        })
        const saga = setup()
        saga.dispatch(createOrderTrigger({ orderId: 'PT--0001' }))
        await saga.waitFor(createOrderFulfill().type)

        const calledActions = saga.getCalledActions()

        expect(calledActions).toContainEqual(
          createOrderFailure({
            errorMessage: 'Some unknown error',
            details: { error: 'Some unknown error' }
          })
        )
        expect(saga.getCalledActions()).toContainEqual(createOrderFulfill())
      })
    })
  })
})
describe('checkout/create-order saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: {
        ...initialState,
        client: {
          basket: {
            content: {
              data: {
                id: 'some-basket-id',
                items: [],
                coupons: [],
                discounts: []
              }
            }
          },
          checkout: {
            createOrder: {
              details: {
                orderId: 'PT--0001'
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
    saga.start(createOrderSaga)

    return saga
  }

  describe('when setCreateOrder is triggered', () => {
    describe('and the order is already created and request succeed', () => {
      it('doesnt call the api and then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: createOrderData
        })

        const saga = setup()
        saga.dispatch(createOrderTrigger({ orderId: 'PT--0001' }))
        await saga.waitFor(createOrderFulfill().type)

        expect(axios.post).toHaveBeenCalledTimes(0)

        expect(saga.getCalledActions()).toContainEqual(
          createOrderSuccess(createOrderData)
        )
        expect(saga.getCalledActions()).toContainEqual(createOrderFulfill())
      })
    })
  })
})
