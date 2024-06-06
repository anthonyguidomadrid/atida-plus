import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getCustomerFulfill,
  invoiceRequireFailure,
  invoiceRequireTrigger
} from '~domains/account/slices'
import { RootState } from '~domains/redux'
import { sprykerCustomer } from '~domains/account/__mocks__/customer'
// @ts-ignore
import type { DeepPartial } from '@reduxjs/toolkit'
import { customerRequestInvoiceSaga } from '../customer-invoice-required'

describe('account/customer-request-invoice', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(customerRequestInvoiceSaga)
    return saga
  }

  describe('when request invoice is triggered', () => {
    const creds = {
      customerReference: 'some-ref',
      invoiceRequired: true
    }

    it('successfully calls the api and dispatches fulfill action', async () => {
      ;(axios.patch as jest.Mock).mockResolvedValue(sprykerCustomer)

      const saga = setup()
      saga.dispatch(invoiceRequireTrigger(creds))
      await saga.waitFor(getCustomerFulfill().type)

      expect(saga.getCalledActions()).toContainEqual(getCustomerFulfill())
    })

    describe('and request fails', () => {
      it('calls the api and dispatches failure action', async () => {
        ;(axios.patch as jest.Mock).mockRejectedValue({
          message: 'Unknown error'
        })

        const saga = setup()
        saga.dispatch(invoiceRequireTrigger(creds))
        await saga.waitFor(getCustomerFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          invoiceRequireFailure({ message: 'Unknown error' })
        )
        expect(saga.getCalledActions()).toContainEqual(getCustomerFulfill())
      })
    })
  })
})
