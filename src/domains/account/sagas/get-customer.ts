import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  takeLatest,
  select
} from 'redux-saga/effects'
import { cookieStorageMechanism, createClient, logger } from '~helpers'
import { getCustomerTokenName } from '../helpers'
import {
  getCustomerTrigger,
  getCustomerRequest,
  getCustomerSuccess,
  getCustomerFailure,
  getCustomerFulfill,
  triggerReadCustomer,
  readCustomer
} from '../slices'
import type { GetCustomerTriggerPayload, Customer } from '../types'
import { getErrorMessage } from '~helpers/error'
import { selectIsLoading } from '~domains/account/selectors/customer'

function* doGetCustomerSaga({
  payload
}: PayloadAction<GetCustomerTriggerPayload>) {
  try {
    const isLoading: boolean = yield select(selectIsLoading)

    if (!isLoading) {
      yield put(getCustomerRequest())
      const locale: string = yield getContext('locale')
      const client = createClient({ locale })
      const response: AxiosResponse<Customer> = yield call(
        client.get,
        `/api/account/get-customer?customerRef=${payload.customerReference}`
      )
      yield put(getCustomerSuccess(response.data))
    }
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      getCustomerFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(getCustomerFulfill())
  }
}

function* doReadCustomerSaga(): SagaIterator {
  const storageMechanism = cookieStorageMechanism()
  const CUSTOMER_TOKEN_NAME = getCustomerTokenName()
  const customer = yield call(storageMechanism.get, CUSTOMER_TOKEN_NAME)

  if (customer) {
    const parsedCustomer = yield call(JSON.parse, customer)
    if (parsedCustomer?.ref) {
      yield put(
        readCustomer({
          hasPreviousSuccessfulOrder:
            parsedCustomer['has-previous-successful-order'],
          reference: parsedCustomer.ref
        })
      )
    }
  }
}

export function* getCustomerSaga(): SagaIterator {
  yield all([
    takeLatest(getCustomerTrigger, doGetCustomerSaga),
    takeLatest(triggerReadCustomer, doReadCustomerSaga)
  ])
}
