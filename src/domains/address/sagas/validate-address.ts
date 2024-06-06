import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  validateAddressTrigger,
  validateAddressRequest,
  validateAddressSuccess,
  validateAddressFailure,
  validateAddressFulfill
} from '../slices'
import { ValidateAddressTriggerPayload, ValidatedAddress } from '../types'
import { AxiosResponse } from 'axios'
import { getErrorMessage } from '~helpers/error'

function* doValidateAddressSaga({
  payload
}: PayloadAction<ValidateAddressTriggerPayload>) {
  try {
    yield put(validateAddressRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
    const apiResponse: AxiosResponse<{
      items: ValidatedAddress[]
    }> = yield call(client.get, '/api/address/validate-address', {
      params: payload
    })
    yield put(validateAddressSuccess(apiResponse.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        validateAddressFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        validateAddressFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(validateAddressFulfill())
  }
}

export function* validateAddressSaga(): SagaIterator {
  yield all([takeLatest(validateAddressTrigger, doValidateAddressSaga)])
}
