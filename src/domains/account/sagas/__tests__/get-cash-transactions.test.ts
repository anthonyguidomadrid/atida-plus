import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getCashTransactionsFailure,
  getCashTransactionsFulfill,
  getCashTransactionsRequest,
  getCashTransactionsTrigger
} from '~domains/account/slices'
import { RootState } from '~domains/redux'
import { getCashTransactionsSaga } from '../get-cash-transactions'
import type { DeepPartial } from '@reduxjs/toolkit'
import { mockedTransactionHistoryBayDateArray } from '~domains/account/__mocks__/get-cash-transactions'

describe(getCashTransactionsSaga, () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(getCashTransactionsSaga)
    return saga
  }

  describe('when get cash transactions is triggered', () => {
    it('successfully calls the api and dispatches fulfill action', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: mockedTransactionHistoryBayDateArray
      })

      const saga = setup()
      saga.dispatch(getCashTransactionsTrigger({ limit: '8', offset: '0' }))
      await saga.waitFor(getCashTransactionsFulfill().type)

      expect(axios.get).toHaveBeenCalledWith('/api/account/cash-transactions', {
        params: { limit: '8', offset: '0' }
      })

      expect(saga.getCalledActions()).toContainEqual(
        getCashTransactionsRequest()
      )
      expect(saga.getCalledActions()).toContainEqual(
        getCashTransactionsFulfill()
      )
    })

    describe('and request fails', () => {
      it('calls the api and dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          message: 'Unknown error'
        })

        const saga = setup()
        saga.dispatch(getCashTransactionsTrigger({ limit: '8', offset: '0' }))
        await saga.waitFor(getCashTransactionsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getCashTransactionsFailure({ message: 'Unknown error' })
        )
        expect(saga.getCalledActions()).toContainEqual(
          getCashTransactionsFulfill()
        )
      })
    })
  })
})
