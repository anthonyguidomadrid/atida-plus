import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import {
  triggerReportIdentifyUser,
  triggerReportUserInteraction
} from '~domains/analytics'
import { createClient, logger } from '~helpers'
import {
  createCustomerTrigger,
  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFailure,
  createCustomerFulfill,
  triggerShowCustomerNotification,
  loginTrigger
} from '../slices'
import { CreateCustomerTriggerPayload } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doCreateCustomerSaga({
  payload
}: PayloadAction<CreateCustomerTriggerPayload>) {
  try {
    yield put(createCustomerRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
    const { redirect, ...details } = payload
    yield call(client.post, '/api/account/create-customer', details)
    yield all([
      put(createCustomerSuccess()),
      put(
        loginTrigger({
          email: payload.email,
          password: payload.password,
          redirect: payload.redirect
        })
      )
    ])
    yield put(triggerShowCustomerNotification())
    yield put(triggerReportIdentifyUser({ email: payload.email }))
    yield put(
      triggerReportUserInteraction({
        event: 'Account Created',
        account_type: payload.accountType
      })
    )
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        createCustomerFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        createCustomerFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(createCustomerFulfill())
  }
}

export function* createCustomerSaga(): SagaIterator {
  yield all([takeLatest(createCustomerTrigger, doCreateCustomerSaga)])
}
