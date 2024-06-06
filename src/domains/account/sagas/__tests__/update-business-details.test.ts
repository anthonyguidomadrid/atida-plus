import type { DeepPartial } from '@reduxjs/toolkit'
import Router from 'next/router'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getCustomerTrigger,
  updateBusinessDetailsFailure,
  updateBusinessDetailsFulfill,
  updateBusinessDetailsSuccess,
  updateBusinessDetailsTrigger
} from '~domains/account/slices'
import {
  updateBusinessDetailsPayload,
  updateBusinessDetailsPayloadWithRedirect
} from '~domains/account/__mocks__/update-business-details'
import { RootState } from '~domains/redux'
import { updateBusinessDetailsSaga } from '../update-business-details'

describe('account/update-business-details saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(updateBusinessDetailsSaga)

    return saga
  }

  describe('when updateBusinessDetails is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        axios.patch as jest.Mock
        const saga = setup()
        saga.dispatch(
          updateBusinessDetailsTrigger(updateBusinessDetailsPayload)
        )
        await saga.waitFor(updateBusinessDetailsFulfill().type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/account/update-business-details',
          updateBusinessDetailsPayload
        )

        expect(saga.getCalledActions()).toContainEqual(
          updateBusinessDetailsSuccess()
        )
        expect(saga.getCalledActions()).toContainEqual(
          getCustomerTrigger({ customerReference: 'some-customer-reference' })
        )
        expect(saga.getCalledActions()).toContainEqual(
          updateBusinessDetailsFulfill()
        )
      })

      it('performs a redirect if a redirect is present', async () => {
        axios.patch as jest.Mock
        const saga = setup()
        saga.dispatch(
          updateBusinessDetailsTrigger(updateBusinessDetailsPayloadWithRedirect)
        )
        await saga.waitFor(updateBusinessDetailsFulfill().type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/account/update-business-details',
          updateBusinessDetailsPayloadWithRedirect
        )

        expect(saga.getCalledActions()).toContainEqual(
          updateBusinessDetailsFulfill()
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
          updateBusinessDetailsTrigger(updateBusinessDetailsPayload)
        )
        await saga.waitFor(updateBusinessDetailsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateBusinessDetailsFailure({
            message: 'Some unknown error'
          })
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
          updateBusinessDetailsTrigger(updateBusinessDetailsPayload)
        )
        await saga.waitFor(updateBusinessDetailsFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateBusinessDetailsFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
