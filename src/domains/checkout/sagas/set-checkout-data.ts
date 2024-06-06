import { Customer } from './../../account/types'
import {
  selectCustomerDetails,
  selectIsLoggedIn
} from './../../account/selectors/customer'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  delay,
  takeLatest,
  select
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  setDataTrigger,
  setDataRequest,
  setDataSuccess,
  setDataFailure,
  setDataFulfill
} from '../slices'
import { SetCheckoutDataPayload, CheckoutData } from '../types'
import { API_RESPONSE } from '~config/constants/api-response'
import { getErrorMessage } from '~helpers/error'
import { parseDateOfBirthFormat } from '~domains/account'

function* updateApi(payload: SetCheckoutDataPayload) {
  const locale: string = yield getContext('locale')
  const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
  const numberOfAttempts = 5
  for (let i = 0; i < numberOfAttempts; i++) {
    try {
      const apiResponse: AxiosResponse<CheckoutData> = yield call(
        client.post,
        '/api/checkout/set-data',
        {
          ...payload
        }
      )
      return apiResponse
    } catch (error) {
      if (
        (error as Error).message?.includes('500') ||
        (error as Error).message?.includes('502')
      ) {
        updateApi(payload)
        yield delay(2000 + i * 1000)
        if (i === numberOfAttempts - 1) {
          throw new Error(API_RESPONSE.request_failed_after_several_attempt)
        }
        if (!window.history?.state?.url?.includes('checkout')) {
          throw error
        }
      } else {
        throw error
      }
    }
  }
}

function* doSetCheckoutData({
  payload
}: PayloadAction<SetCheckoutDataPayload>) {
  try {
    /* 
      PLUS-6195 - When FeatureFlag.ACCOUNT_PHONE_TO_CUSTOMER_LEVEL is removed,
      remove customer
    */
    const customer: Customer = yield select(selectCustomerDetails)
    const isLoggedIn: Customer = yield select(selectIsLoggedIn)
    yield put(setDataRequest(payload))
    const { shouldSetLoading, ...restPayload } = payload
    const response: AxiosResponse<CheckoutData> = yield call(updateApi, {
      ...restPayload,
      ...(isLoggedIn &&
        customer &&
        Object.keys(restPayload).length && {
          customer: {
            ...customer,
            salutation: customer?.salutation ?? 'Ms',
            ...(customer.dateOfBirth && {
              dateOfBirth: parseDateOfBirthFormat(customer.dateOfBirth)
            })
          }
        })
    } as SetCheckoutDataPayload)

    yield put(setDataSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        setDataFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        setDataFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield delay(0)
    yield put(setDataFulfill())
  }
}

export function* setCheckoutDataSaga(): SagaIterator {
  yield all([takeLatest(setDataTrigger, doSetCheckoutData)])
}
