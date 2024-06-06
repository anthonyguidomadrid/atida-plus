import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  deleteAddressFailure,
  deleteAddressFulfill,
  deleteAddressSuccess,
  deleteAddressTrigger,
  deleteAddressItemIsLoading,
  deleteAddressItemWasError,
  deleteAddressItemWasSuccess
} from '~domains/address/slices'
import { loginTrigger } from '~domains/account/slices'
import { RootState } from '~domains/redux'
import { deleteAddressSaga } from '../delete-address'

describe('address/delete-address saga', () => {
  const defaultBillingAddress = {
    id: 'some-default-billing-addressId',
    salutation: 'Mr',
    firstName: 'test firstname',
    lastName: 'test lastname',
    address1: 'test address',
    zipCode: 'some zip-code',
    city: 'some city',
    country: 'some country',
    iso2Code: 'some iso2code',
    isDefaultShipping: false,
    isDefaultBilling: true,
    isTaxExempt: false
  }

  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: {
        ...initialState,
        client: {
          address: {
            'delete-address': {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              items: []
            }
          },
          account: {
            customer: {
              addresses: [
                {
                  ...defaultBillingAddress
                }
              ]
            }
          }
        }
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(deleteAddressSaga)

    return saga
  }

  describe('when deleteAddress is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})
        const saga = setup()
        saga.dispatch(
          deleteAddressTrigger({
            reference: 'some-id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(deleteAddressFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/address/delete-address', {
          reference: 'some-id',
          addressId: 'some-addressId'
        })

        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasSuccess({
            id: 'some-addressId',
            wasSuccess: false
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasError({ id: 'some-addressId', wasError: false })
        )
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemIsLoading({ id: 'some-addressId', isLoading: true })
        )
        expect(saga.getCalledActions()).toContainEqual(deleteAddressSuccess())
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasSuccess({
            id: 'some-addressId',
            wasSuccess: true
          })
        )
        expect(saga.getCalledActions()).toContainEqual(deleteAddressFulfill())
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemIsLoading({ id: 'some-addressId', isLoading: false })
        )
      })

      it('sets default billing address if that one was deleted', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})
        const saga = setup()
        saga.dispatch(
          deleteAddressTrigger({
            reference: 'some-id',
            addressId: 'some-default-billing-addressId'
          })
        )
        await saga.waitFor(deleteAddressFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/address/delete-address', {
          reference: 'some-id',
          addressId: 'some-default-billing-addressId'
        })

        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasSuccess({
            id: 'some-default-billing-addressId',
            wasSuccess: false
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasError({
            id: 'some-default-billing-addressId',
            wasError: false
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemIsLoading({
            id: 'some-default-billing-addressId',
            isLoading: true
          })
        )
        expect(saga.getCalledActions()).toContainEqual(deleteAddressSuccess())
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasSuccess({
            id: 'some-default-billing-addressId',
            wasSuccess: true
          })
        )
        expect(saga.getCalledActions()).toContainEqual(deleteAddressFulfill())
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemIsLoading({
            id: 'some-default-billing-addressId',
            isLoading: false
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
          deleteAddressTrigger({
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(deleteAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasSuccess({
            id: 'some-addressId',
            wasSuccess: false
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasError({ id: 'some-addressId', wasError: true })
        )
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressFailure({
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
          deleteAddressTrigger({
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(deleteAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasSuccess({
            id: 'some-addressId',
            wasSuccess: false
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressItemWasError({ id: 'some-addressId', wasError: true })
        )
        expect(saga.getCalledActions()).toContainEqual(
          deleteAddressFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
