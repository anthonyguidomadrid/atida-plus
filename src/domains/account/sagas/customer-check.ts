import { SagaIterator } from '@redux-saga/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AxiosResponse } from 'axios'
import { call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  customerCheckFailure,
  customerCheckFulfill,
  customerCheckRequest,
  customerCheckSuccess,
  customerCheckTrigger
} from '../slices'
import { CustomerCheckResponse, CustomerCheckTriggerPayload } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doCustomerCheckSaga({
  payload
}: PayloadAction<CustomerCheckTriggerPayload>) {
  try {
    yield put(customerCheckRequest())

    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })

    const apiResponse: AxiosResponse<CustomerCheckResponse> = yield call(
      client.get,
      '/api/account/customer-check',
      { params: payload }
    )

    yield put(customerCheckSuccess(apiResponse.data))

    return apiResponse
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(customerCheckFailure({ message: errorMessages[0] }))
    } else {
      yield put(
        customerCheckFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(customerCheckFulfill())
  }
}

export function* customerCheckSaga(): SagaIterator {
  yield takeLatest(customerCheckTrigger, doCustomerCheckSaga)
}
