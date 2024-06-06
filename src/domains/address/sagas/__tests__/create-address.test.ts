import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  createAddressFailure,
  createAddressFulfill,
  createAddressSuccess,
  createAddressTrigger
} from '~domains/address/slices'
import { loginTrigger } from '~domains/account/slices'
import {
  address,
  addressesList,
  addressesListWithDifferentDefaults
} from '~domains/address/__mocks__/addresses'
import { RootState } from '~domains/redux'
import { createAddressSaga } from '../create-address'
import { CustomerAddress } from '~domains/account'

describe('address/create-address saga', () => {
  const setup = (
    initialState = {},
    addressList = addressesList as CustomerAddress[]
  ): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState,
        client: {
          account: {
            customer: {
              addresses: addressList
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
    saga.start(createAddressSaga)

    return saga
  }

  describe('when createAddress is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})
        const saga = setup()
        saga.dispatch(
          createAddressTrigger({
            ...address,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createAddressFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/address/create-address', {
          ...address,
          reference: 'some-Id'
        })

        expect(saga.getCalledActions()).toContainEqual(createAddressSuccess())
        expect(saga.getCalledActions()).toContainEqual(createAddressFulfill())
      })

      it('scrolls to the first position', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})
        const saga = setup()
        const scrollToMock = jest.fn()
        window.scrollTo = scrollToMock
        jest
          .spyOn(document, 'getElementById')
          .mockImplementation(() => document.createElement('div'))
        saga.dispatch(
          createAddressTrigger({
            ...address,
            hasValidTaxRegion: true,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createAddressFulfill().type)
        expect(scrollToMock).toHaveBeenCalled()
        expect(scrollToMock).toHaveBeenCalledWith({
          top: 300,
          behavior: 'smooth'
        })
      })
      it('scrolls to the second position - default billing', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})
        const saga = setup()
        const scrollToMock = jest.fn()
        window.scrollTo = scrollToMock
        jest
          .spyOn(document, 'getElementById')
          .mockImplementation(() => document.createElement('div'))
        saga.dispatch(
          createAddressTrigger({
            ...address,
            isDefaultShipping: false,
            hasValidTaxRegion: true,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createAddressFulfill().type)
        expect(scrollToMock).toHaveBeenCalled()
        expect(scrollToMock).toHaveBeenCalledWith({
          top: 600,
          behavior: 'smooth'
        })
      })
      it('scrolls to the second position - no default billing and no default shipping', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})
        const saga = setup()
        const scrollToMock = jest.fn()
        window.scrollTo = scrollToMock
        jest
          .spyOn(document, 'getElementById')
          .mockImplementation(() => document.createElement('div'))
        saga.dispatch(
          createAddressTrigger({
            ...address,
            isDefaultShipping: false,
            isDefaultBilling: false,
            hasValidTaxRegion: true,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createAddressFulfill().type)
        expect(scrollToMock).toHaveBeenCalled()
        expect(scrollToMock).toHaveBeenCalledWith({
          top: 600,
          behavior: 'smooth'
        })
      })
      it('scrolls to the third position', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})
        const saga = setup(
          {},
          addressesListWithDifferentDefaults as CustomerAddress[]
        )
        const scrollToMock = jest.fn()
        window.scrollTo = scrollToMock
        jest
          .spyOn(document, 'getElementById')
          .mockImplementation(() => document.createElement('div'))
        saga.dispatch(
          createAddressTrigger({
            ...address,
            isDefaultShipping: false,
            isDefaultBilling: false,
            hasValidTaxRegion: true,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createAddressFulfill().type)
        expect(scrollToMock).toHaveBeenCalled()
        expect(scrollToMock).toHaveBeenCalledWith({
          top: 900,
          behavior: 'smooth'
        })
      })
      it('does not scroll - first address created', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})
        const saga = setup()
        const scrollToMock = jest.fn()
        window.scrollTo = scrollToMock
        jest.spyOn(document, 'getElementById').mockImplementation(() => null)
        saga.dispatch(
          createAddressTrigger({
            ...address,
            hasValidTaxRegion: true,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createAddressFulfill().type)
        expect(scrollToMock).not.toHaveBeenCalled()
      })
      it('scrolls to the notification', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})
        const saga = setup()
        const scrollToMock = jest.fn()
        window.scrollTo = scrollToMock
        saga.dispatch(
          createAddressTrigger({
            ...address,
            hasValidTaxRegion: false,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createAddressFulfill().type)
        expect(scrollToMock).toHaveBeenCalled()
        expect(scrollToMock).toHaveBeenCalledWith({
          top: 0,
          behavior: 'smooth'
        })
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
          createAddressTrigger({
            ...address,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createAddressFailure({
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
          createAddressTrigger({
            ...address,
            reference: 'some-Id'
          })
        )
        await saga.waitFor(createAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          createAddressFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
