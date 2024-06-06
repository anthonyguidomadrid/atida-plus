import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  select,
  takeLatest
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import { scrollToElement } from '~helpers/scrollTo'
import {
  updateAddressTrigger,
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,
  updateAddressFulfill
} from '../slices'
import { UpdateAddressTriggerPayload } from '../types'
import { getCustomerTrigger } from '~domains/account'
import { selectDefaultShippingAddress } from '~domains/account/selectors/customer'
import { getErrorMessage } from '~helpers/error'

function* doupdateAddressSaga({
  payload
}: PayloadAction<UpdateAddressTriggerPayload>) {
  try {
    const defaultShippingAddress: ReturnType<
      typeof selectDefaultShippingAddress
    > = yield select(selectDefaultShippingAddress)
    yield put(updateAddressRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const { ...details } = payload
    yield call(client.patch, '/api/address/update-address', details)
    yield put(updateAddressSuccess())

    if (payload?.forceRefresh) {
      yield put(getCustomerTrigger({ customerReference: details.reference }))
    }

    if (
      typeof payload?.hasValidTaxRegion === 'boolean' &&
      !payload?.hasValidTaxRegion
    ) {
      return window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    if (
      document.getElementById('address-1') ||
      document.getElementById('address-2')
    ) {
      let addressTile = 'address-0'
      if (
        payload.isDefaultBilling &&
        payload.addressId !== defaultShippingAddress?.id
      )
        addressTile = 'address-1'
      if (!payload.isDefaultBilling && !payload.isDefaultShipping) {
        addressTile = document.getElementById('address-2')
          ? 'address-2'
          : 'address-1'
      }
      yield document.body.setAttribute('style', 'overflow: visible')
      setTimeout(() => {
        scrollToElement(document.getElementById(addressTile), 'center')
      }, 1)
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        updateAddressFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        updateAddressFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(updateAddressFulfill())
  }
}

export function* updateAddressSaga(): SagaIterator {
  yield all([takeLatest(updateAddressTrigger, doupdateAddressSaga)])
}
