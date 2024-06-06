import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  validateAddressFailure,
  validateAddressFulfill,
  validateAddressSuccess,
  validateAddressTrigger
} from '~domains/address/slices'
import {
  qualifiedQuery,
  validatedAddress
} from '~domains/address/__mocks__/addresses'
import { RootState } from '~domains/redux'
import { validateAddressSaga } from '../validate-address'

describe('address/create-address saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(validateAddressSaga)

    return saga
  }

  describe('when validate address is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({ data: validatedAddress })
        const saga = setup()
        saga.dispatch(validateAddressTrigger(qualifiedQuery))
        await saga.waitFor(validateAddressFulfill().type)

        expect(axios.get).toHaveBeenCalledWith(
          '/api/address/validate-address',
          { params: qualifiedQuery }
        )

        expect(saga.getCalledActions()).toContainEqual(
          validateAddressSuccess(validatedAddress)
        )
        expect(saga.getCalledActions()).toContainEqual(validateAddressFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(validateAddressTrigger(qualifiedQuery))
        await saga.waitFor(validateAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          validateAddressFailure({
            message: 'Some unknown error'
          })
        )
      })
    })

    describe('and request fails with multiple error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
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
        saga.dispatch(validateAddressTrigger(qualifiedQuery))
        await saga.waitFor(validateAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          validateAddressFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
