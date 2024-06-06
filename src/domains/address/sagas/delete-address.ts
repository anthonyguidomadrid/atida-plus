import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  select,
  takeEvery
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  deleteAddressTrigger,
  deleteAddressRequest,
  deleteAddressSuccess,
  deleteAddressFailure,
  deleteAddressFulfill,
  deleteAddressItemIsLoading,
  deleteAddressItemWasSuccess,
  deleteAddressItemWasError,
  updateAddressTrigger
} from '../slices'
import { DeleteAddressTriggerPayload } from '../types'
import { getCustomerTrigger } from '~domains/account'
import {
  selectDefaultBillingAddress,
  selectDefaultShippingAddress
} from '~domains/account/selectors/customer'
import { Address } from '~domains/checkout/types'
import { getErrorMessage } from '~helpers/error'

function* doDeleteAddressSaga({
  payload
}: PayloadAction<DeleteAddressTriggerPayload>) {
  try {
    yield put(
      deleteAddressItemWasSuccess({ id: payload.addressId, wasSuccess: false })
    )
    yield put(
      deleteAddressItemWasError({ id: payload.addressId, wasError: false })
    )
    yield put(deleteAddressRequest())
    yield put(
      deleteAddressItemIsLoading({ id: payload.addressId, isLoading: true })
    )
    const locale: string = yield getContext('locale')

    let defaultBillingAddress: Partial<Address> = {}
    let defaultShippingAddress: Partial<Address> = {}
    try {
      defaultBillingAddress = yield select(selectDefaultBillingAddress)
      defaultShippingAddress = yield select(selectDefaultShippingAddress)
    } catch (e) {}

    const client = createClient({ locale })
    const { ...details } = payload
    yield call(client.post, '/api/address/delete-address', details)
    yield put(deleteAddressSuccess())
    yield put(
      deleteAddressItemWasSuccess({ id: payload.addressId, wasSuccess: true })
    )

    try {
      // Set default billing address if that one was deleted
      if (payload?.addressId === defaultBillingAddress?.id) {
        yield put(
          updateAddressTrigger({
            ...defaultShippingAddress,
            isDefaultBilling: true,
            reference: payload.reference,
            addressId: defaultShippingAddress.id,
            forceRefresh: true
          })
        )
      }
    } catch (e) {}

    yield put(getCustomerTrigger({ customerReference: details.reference }))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        deleteAddressFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        deleteAddressFailure({
          message: errorMessages
        })
      )
    }
    yield put(
      deleteAddressItemWasError({ id: payload.addressId, wasError: true })
    )
  } finally {
    yield put(deleteAddressFulfill())
    yield put(
      deleteAddressItemIsLoading({ id: payload.addressId, isLoading: false })
    )
  }
}

export function* deleteAddressSaga(): SagaIterator {
  yield all([takeEvery(deleteAddressTrigger, doDeleteAddressSaga)])
}
