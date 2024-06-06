import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  select,
  put,
  takeLatest
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  createAddressTrigger,
  createAddressRequest,
  createAddressSuccess,
  createAddressFailure,
  createAddressFulfill
} from '../slices'
import { getCustomerTrigger } from '~domains/account'
import { CreateAddressTriggerPayload } from '~domains/address'
import {
  selectDefaultBillingAddress,
  selectDefaultShippingAddress
} from '~domains/account/selectors/customer'
import { getErrorMessage } from '~helpers/error'

function* doCreateAddressSaga({
  payload
}: PayloadAction<CreateAddressTriggerPayload>) {
  try {
    const defaultShippingAddress: ReturnType<
      typeof selectDefaultShippingAddress
    > = yield select(selectDefaultShippingAddress)
    const defaultBillingAddress: ReturnType<
      typeof selectDefaultBillingAddress
    > = yield select(selectDefaultBillingAddress)
    yield put(createAddressRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const { ...details } = payload
    yield call(client.post, '/api/address/create-address', details)
    yield put(createAddressSuccess())
    yield put(getCustomerTrigger({ customerReference: details.reference }))
    if (
      typeof payload?.hasValidTaxRegion === 'boolean' &&
      !payload?.hasValidTaxRegion
    ) {
      return window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    if (document.getElementById('address-0')) {
      const addressTileHeight = 300
      let position = 1
      if (payload.isDefaultBilling && !payload.isDefaultShipping) position = 2
      if (!payload.isDefaultBilling && !payload.isDefaultShipping) {
        position =
          defaultBillingAddress?.id === defaultShippingAddress?.id ? 2 : 3
      }

      yield document.body.setAttribute('style', 'overflow: visible')
      window.scrollTo({
        top:
          (document.getElementById('address-0') as HTMLDivElement).offsetTop +
          addressTileHeight * position,
        behavior: 'smooth'
      })
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        createAddressFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        createAddressFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(createAddressFulfill())
  }
}

export function* createAddressSaga(): SagaIterator {
  yield all([takeLatest(createAddressTrigger, doCreateAddressSaga)])
}
