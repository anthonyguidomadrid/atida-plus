import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  updateAddressFailure,
  updateAddressFulfill,
  updateAddressSuccess,
  updateAddressTrigger
} from '~domains/address/slices'
import { getCustomerTrigger, loginTrigger } from '~domains/account/slices'
import { address, addressesList } from '~domains/address/__mocks__/addresses'
import { RootState } from '~domains/redux'
import { updateAddressSaga } from '../update-address'
import { CustomerAddress } from '~domains/account'
import { setupMatchMediaMock } from '~domains/breakpoints'
import * as scrollTo from '~helpers/scrollTo'

describe('address/update-address saga', () => {
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
    saga.start(updateAddressSaga)

    return saga
  }

  describe('when updateAddress is triggered', () => {
    describe('and request succeeds', () => {
      const mockScrollToElement = jest
        .spyOn(scrollTo, 'scrollToElement')
        .mockImplementation()
      const element = document.createElement('div')
      jest.spyOn(document, 'getElementById').mockImplementation(() => element)
      jest.spyOn(document.body, 'setAttribute').mockImplementation()
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        saga.dispatch(
          updateAddressTrigger({
            ...address,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateAddressFulfill().type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/address/update-address',
          {
            ...address,
            reference: 'some-Id',
            addressId: 'some-addressId'
          }
        )

        expect(saga.getCalledActions()).toContainEqual(updateAddressSuccess())
        expect(saga.getCalledActions()).toContainEqual(updateAddressFulfill())
      })

      it('scrolls to the first position', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        setupMatchMediaMock(true)
        jest.useFakeTimers()
        saga.dispatch(
          updateAddressTrigger({
            ...address,
            isDefaultBilling: false,
            hasValidTaxRegion: true,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateAddressFulfill().type)
        jest.runAllTimers()
        expect(mockScrollToElement).toHaveBeenCalled()
        expect(mockScrollToElement).toHaveBeenCalledWith(element, 'center')
      })

      it('scrolls to the second position', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        setupMatchMediaMock(true)
        jest.useFakeTimers()
        saga.dispatch(
          updateAddressTrigger({
            ...address,
            isDefaultShipping: false,
            hasValidTaxRegion: true,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateAddressFulfill().type)
        jest.runAllTimers()
        expect(mockScrollToElement).toHaveBeenCalled()
        expect(mockScrollToElement).toHaveBeenCalledWith(element, 'center')
      })

      it('scrolls to the third position', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        setupMatchMediaMock(true)
        jest.useFakeTimers()
        saga.dispatch(
          updateAddressTrigger({
            ...address,
            isDefaultShipping: false,
            isDefaultBilling: true,
            hasValidTaxRegion: true,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateAddressFulfill().type)
        jest.runAllTimers()
        expect(mockScrollToElement).toHaveBeenCalled()
        expect(mockScrollToElement).toHaveBeenCalledWith(element, 'center')
      })

      it('scrolls to the notification', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        setupMatchMediaMock(true)
        jest.useFakeTimers()
        const scrollToMock = jest.fn()
        window.scrollTo = scrollToMock
        saga.dispatch(
          updateAddressTrigger({
            ...address,
            hasValidTaxRegion: false,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateAddressFulfill().type)
        jest.runAllTimers()
        expect(scrollToMock).toHaveBeenCalled()
        expect(scrollToMock).toHaveBeenCalledWith({
          top: 0,
          behavior: 'smooth'
        })
      })

      it('refreshes the customer', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        saga.dispatch(
          updateAddressTrigger({
            ...address,
            reference: 'some-Id',
            addressId: 'some-addressId',
            forceRefresh: true
          })
        )
        await saga.waitFor(updateAddressFulfill().type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/address/update-address',
          {
            ...address,
            reference: 'some-Id',
            addressId: 'some-addressId',
            forceRefresh: true
          }
        )

        expect(saga.getCalledActions()).toContainEqual(updateAddressSuccess())
        expect(saga.getCalledActions()).toContainEqual(updateAddressFulfill())
        expect(saga.getCalledActions()).toContainEqual(
          getCustomerTrigger({ customerReference: 'some-Id' })
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
          updateAddressTrigger({
            ...address,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateAddressFailure({
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
          updateAddressTrigger({
            ...address,
            reference: 'some-Id',
            addressId: 'some-addressId'
          })
        )
        await saga.waitFor(updateAddressFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateAddressFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
