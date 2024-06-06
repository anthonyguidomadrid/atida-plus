import type { DeepPartial } from '@reduxjs/toolkit'
import Router from 'next/router'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  updateCustomerPersonalDetailsFailure,
  updateCustomerPersonalDetailsFulfill,
  updateCustomerPersonalDetailsSuccess,
  updateCustomerPersonalDetailsTrigger,
  loginTrigger,
  updateCustomerPersonalDetailsHideNotification,
  updateCustomerPersonalDetailsHideNotificationTrigger
} from '~domains/account/slices'
import { updatedPersonalDetails } from '~domains/account/__mocks__/update-customer-personal-details'
import { RootState } from '~domains/redux'
import {
  updateCustomerPersonalDetailsSaga,
  updateCustomerPersonalDetailsNotificationSaga
} from '../update-customer-personal-details'

describe('account/update-customer-personal-details saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(updateCustomerPersonalDetailsSaga)

    return saga
  }

  describe('when updateCustomerPersonalDetails is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        saga.dispatch(
          updateCustomerPersonalDetailsTrigger({
            ...updatedPersonalDetails,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateCustomerPersonalDetailsFulfill().type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/account/update-customer-personal-details',
          {
            ...updatedPersonalDetails,
            reference: 'some-Id',
            addressId: 'some-addressId'
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          updateCustomerPersonalDetailsSuccess()
        )
        expect(saga.getCalledActions()).toContainEqual(
          updateCustomerPersonalDetailsFulfill()
        )
      })

      it('performs a redirect if a redirect is present', async () => {
        axios.patch as jest.Mock
        const saga = setup()
        saga.dispatch(
          updateCustomerPersonalDetailsTrigger({
            ...updatedPersonalDetails,
            reference: 'some-Id',
            addressId: 'some-addressId',
            redirect: '/some-page'
          })
        )
        await saga.waitFor(updateCustomerPersonalDetailsFulfill().type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/account/update-customer-personal-details',
          {
            ...updatedPersonalDetails,
            reference: 'some-Id',
            addressId: 'some-addressId',
            redirect: '/some-page'
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          updateCustomerPersonalDetailsFulfill()
        )

        expect(Router.push).toHaveBeenCalledWith('/some-page')
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
          updateCustomerPersonalDetailsTrigger({
            ...updatedPersonalDetails,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateCustomerPersonalDetailsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateCustomerPersonalDetailsFailure({
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
          updateCustomerPersonalDetailsTrigger({
            ...updatedPersonalDetails,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateCustomerPersonalDetailsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateCustomerPersonalDetailsFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})

describe('account/update-customer-personal-details saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(updateCustomerPersonalDetailsNotificationSaga)

    return saga
  }
  describe('when updateCustomerPersonalDetailsHideNotification is triggered', () => {
    it('updates showNotification state', async () => {
      const saga = setup()
      saga.dispatch(updateCustomerPersonalDetailsHideNotificationTrigger())

      await saga.waitFor(updateCustomerPersonalDetailsHideNotification().type)

      expect(saga.getCalledActions()).toContainEqual(
        updateCustomerPersonalDetailsHideNotification()
      )
    })
  })
})
