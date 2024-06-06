import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  orderHistoryFailure,
  orderHistoryFulfill,
  orderHistorySuccess,
  orderHistoryTrigger
} from '../../slices'
import { RootState } from '../../../redux'
import { orderHistorySaga } from '../order-history'
import type { DeepPartial } from '@reduxjs/toolkit'

describe('account/order-history saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(orderHistorySaga)

    return saga
  }

  describe('when order-history is triggered', () => {
    it('successfully retrieves 5 orders and dispatches success and fulfill actions', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: {
          data: [
            {
              date: '2021-21-21',
              unFormattedDate: '2021-21-21',
              orderHistory: []
            }
          ],
          totalPages: 50
        }
      })

      const saga = setup()
      saga.dispatch(orderHistoryTrigger({}))
      await saga.waitFor(orderHistoryFulfill().type)

      expect(axios.get).toHaveBeenCalledWith('/api/account/order-history', {
        params: {}
      })

      expect(saga.getCalledActions()).toContainEqual(
        orderHistorySuccess({
          data: [
            {
              date: '2021-21-21',
              unFormattedDate: '2021-21-21',
              orderHistory: []
            }
          ],
          totalPages: 50
        })
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
        saga.dispatch(orderHistoryTrigger({}))
        await saga.waitFor(orderHistoryFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          orderHistoryFailure({
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
        saga.dispatch(orderHistoryTrigger({}))
        await saga.waitFor(orderHistoryFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          orderHistoryFailure({
            message: 'Some error'
          })
        )
      })
    })
  })
})
