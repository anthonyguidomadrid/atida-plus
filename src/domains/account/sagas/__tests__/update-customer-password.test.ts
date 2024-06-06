import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  updateCustomerPasswordFailure,
  updateCustomerPasswordFulfill,
  updateCustomerPasswordSuccess,
  updateCustomerPasswordTrigger,
  loginTrigger,
  updateCustomerPasswordHideNotification,
  updateCustomerPasswordHideNotificationTrigger
} from '~domains/account/slices'
import { changePassword } from '~domains/account/__mocks__/update-customer-password'
import { RootState } from '~domains/redux'
import {
  updateCustomerPasswordsSaga,
  updatePasswordHideNotificationSaga
} from '../update-customer-password'

describe('account/update-customer-password saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(updateCustomerPasswordsSaga)

    return saga
  }

  describe('when updateCustomerPassword is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        saga.dispatch(
          updateCustomerPasswordTrigger({
            ...changePassword
          })
        )
        await saga.waitFor(updateCustomerPasswordFulfill().type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/account/update-customer-password',
          {
            ...changePassword
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          updateCustomerPasswordSuccess()
        )
        expect(saga.getCalledActions()).toContainEqual(
          updateCustomerPasswordFulfill()
        )
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.patch as jest.Mock).mockRejectedValue({
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
          updateCustomerPasswordTrigger({
            ...changePassword
          })
        )
        await saga.waitFor(updateCustomerPasswordFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateCustomerPasswordFailure({
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
        ;(axios.patch as jest.Mock).mockRejectedValue({
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
          updateCustomerPasswordTrigger({
            ...changePassword
          })
        )
        await saga.waitFor(updateCustomerPasswordFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateCustomerPasswordFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})

describe('account/update-customer-password saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(updatePasswordHideNotificationSaga)

    return saga
  }
  describe('when updateCustomerPasswordHideNotification is triggered', () => {
    it('updates showNotification state', async () => {
      const saga = setup()
      saga.dispatch(updateCustomerPasswordHideNotificationTrigger())

      await saga.waitFor(updateCustomerPasswordHideNotification().type)

      expect(saga.getCalledActions()).toContainEqual(
        updateCustomerPasswordHideNotification()
      )
    })
  })
})
