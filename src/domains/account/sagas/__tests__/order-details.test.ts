import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  orderDetailsFailure,
  orderDetailsFulfill,
  orderDetailsSuccess,
  orderDetailsTrigger
} from '../../slices'
import { RootState } from '../../../redux'
import { orderDetailsSaga } from '../order-details'
import { orderDetailsResult } from '../../__mocks__/order-details'
import type { DeepPartial } from '@reduxjs/toolkit'

describe('account/order-details saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(orderDetailsSaga)

    return saga
  }

  describe('when order-details is triggered', () => {
    it('successfully retrieves the order details and dispatches success and fulfill actions', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: orderDetailsResult
      })

      const saga = setup()
      saga.dispatch(orderDetailsTrigger({}))
      await saga.waitFor(orderDetailsFulfill().type)

      expect(axios.get).toHaveBeenCalledWith('/api/account/order-details', {
        params: {}
      })

      expect(saga.getCalledActions()).toContainEqual(
        orderDetailsSuccess(orderDetailsResult)
      )
    })

    describe('and the request fails', () => {
      it('dispatches the failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(orderDetailsTrigger({}))
        await saga.waitFor(orderDetailsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          orderDetailsFailure({
            message: 'Some unknown error'
          })
        )
      })

      it('dispatches the failure action with multiple errors', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: ['Some error', 'Another error', 'Third error']
            }
          }
        })

        const saga = setup()
        saga.dispatch(orderDetailsTrigger({}))
        await saga.waitFor(orderDetailsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          orderDetailsFailure({
            message: 'Some error'
          })
        )
      })
    })
  })
})
