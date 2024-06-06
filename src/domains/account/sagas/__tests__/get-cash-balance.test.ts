import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getCashBalanceFailure,
  getCashBalanceFulfill,
  getCashBalanceTrigger
} from '~domains/account/slices'
import { RootState } from '~domains/redux'
import { getCashBalanceSaga } from '../get-cash-balance'
import { sprykerCustomer } from '~domains/account/__mocks__/customer'
import type { DeepPartial } from '@reduxjs/toolkit'

describe('account/get-cash-balance saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(getCashBalanceSaga)
    return saga
  }

  describe('when get cash balance is triggered', () => {
    it('successfully calls the api and dispatches fulfill action', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue(sprykerCustomer)

      const saga = setup()
      saga.dispatch(getCashBalanceTrigger())
      await saga.waitFor(getCashBalanceFulfill().type)

      expect(saga.getCalledActions()).toContainEqual(getCashBalanceFulfill())
    })

    describe('and request fails', () => {
      it('calls the api and dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          message: 'Unknown error'
        })

        const saga = setup()
        saga.dispatch(getCashBalanceTrigger())
        await saga.waitFor(getCashBalanceFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getCashBalanceFailure({ message: 'Unknown error' })
        )
        expect(saga.getCalledActions()).toContainEqual(getCashBalanceFulfill())
      })
    })
  })
})
