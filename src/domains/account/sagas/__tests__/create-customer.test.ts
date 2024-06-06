import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  createCustomerFailure,
  createCustomerFulfill,
  createCustomerSuccess,
  createCustomerTrigger,
  loginTrigger,
  triggerShowCustomerNotification
} from '~domains/account/slices'
import {
  sprykerCustomer,
  createCustomer
} from '~domains/account/__mocks__/customer'
import { triggerReportUserInteraction } from '~domains/analytics'
import { RootState } from '~domains/redux'
import { createCustomerSaga } from '../create-customer'

describe('account/create-customer saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(createCustomerSaga)

    return saga
  }

  describe('when createCustomer is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: sprykerCustomer
        })
        const saga = setup()
        saga.dispatch(
          createCustomerTrigger({ ...createCustomer, redirect: '/some-page' })
        )
        await saga.waitFor(createCustomerFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/account/create-customer',
          createCustomer
        )

        expect(saga.getCalledActions()).toContainEqual(createCustomerSuccess())
        expect(saga.getCalledActions()).toContainEqual(
          triggerShowCustomerNotification()
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportUserInteraction({
            event: 'Account Created'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(createCustomerFulfill())
        expect(saga.getCalledActions()).toContainEqual(
          loginTrigger({
            email: createCustomer.email,
            password: createCustomer.password,
            redirect: '/some-page'
          })
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
        saga.dispatch(
          createCustomerTrigger({ ...createCustomer, redirect: '/some-page' })
        )
        await saga.waitFor(createCustomerFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createCustomerFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).not.toContainEqual(
          loginTrigger(expect.any(Object))
        )
      })
    })

    describe('and request fails with multiple error messages', () => {
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
        saga.dispatch(
          createCustomerTrigger({ ...createCustomer, redirect: '/some-page' })
        )
        await saga.waitFor(createCustomerFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createCustomerFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
