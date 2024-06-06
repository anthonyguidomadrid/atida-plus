import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  createNewAddressFailure,
  createNewAddressFulfill,
  createNewAddressSuccess,
  createNewAddressTrigger
} from '~domains/account/slices'
import { createNewAddress } from '~domains/account/__mocks__/create-new-address'
import { RootState } from '~domains/redux'
import { createNewAddressSaga } from '../create-new-address'

describe('account/create-new-address saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(createNewAddressSaga)

    return saga
  }

  describe('when createNewAddress is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        saga.dispatch(
          createNewAddressTrigger({
            ...createNewAddress,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createNewAddressFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/account/create-new-address',
          {
            ...createNewAddress,
            reference: 'some-Id'
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          createNewAddressSuccess()
        )
        expect(saga.getCalledActions()).toContainEqual(
          createNewAddressFulfill()
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
          createNewAddressTrigger({
            ...createNewAddress,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createNewAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createNewAddressFailure({
            message: 'Some unknown error'
          })
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
          createNewAddressTrigger({
            ...createNewAddress,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createNewAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createNewAddressFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
