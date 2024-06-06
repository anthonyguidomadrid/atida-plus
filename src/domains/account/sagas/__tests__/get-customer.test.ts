import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getCustomerFailure,
  getCustomerFulfill,
  getCustomerTrigger,
  readCustomer,
  triggerReadCustomer
} from '~domains/account/slices'
import { RootState } from '~domains/redux'
import { getCustomerSaga } from '../get-customer'
import { sprykerCustomer } from '~domains/account/__mocks__/customer'
// @ts-ignore
import { get } from '~helpers'
import { customerCookie } from '~domains/account/__mocks__/token'
import type { DeepPartial } from '@reduxjs/toolkit'

describe('account/get-customer saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(getCustomerSaga)
    return saga
  }

  describe('when get customer is triggered', () => {
    const creds = {
      customerReference: 'some-ref'
    }

    it('successfully calls the api and dispatches fulfill action', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue(sprykerCustomer)

      const saga = setup()
      saga.dispatch(getCustomerTrigger(creds))
      await saga.waitFor(getCustomerFulfill().type)

      expect(saga.getCalledActions()).toContainEqual(getCustomerFulfill())
    })

    describe('and request fails', () => {
      it('calls the api and dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          message: 'Unknown error'
        })

        const saga = setup()
        saga.dispatch(getCustomerTrigger(creds))
        await saga.waitFor(getCustomerFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getCustomerFailure({ message: 'Unknown error' })
        )
        expect(saga.getCalledActions()).toContainEqual(getCustomerFulfill())
      })
    })
  })

  describe('when read customer is triggered', () => {
    it('successfully dispatches read customer action', async () => {
      get.mockReturnValueOnce(JSON.stringify(customerCookie))

      const saga = setup()
      saga.dispatch(triggerReadCustomer())
      await saga.waitFor(
        readCustomer({
          hasPreviousSuccessfulOrder: false,
          reference: ''
        }).type
      )

      expect(saga.getCalledActions()).toContainEqual(
        readCustomer({
          hasPreviousSuccessfulOrder: false,
          reference: 'some-reference'
        })
      )
    })
  })
})
