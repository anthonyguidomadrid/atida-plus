import {
  AtidaCashTransactionsHistoryByDate,
  AtidaCashTransactionTriggerPayload
} from './../types'
import { AxiosResponse } from 'axios'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import {
  getCashTransactionsTrigger,
  getCashTransactionsRequest,
  getCashTransactionsSuccess,
  getCashTransactionsFailure,
  getCashTransactionsFulfill
} from '../slices'
import { createClient, logger } from '~helpers'
import { getErrorMessage } from '~helpers/error'
import type { SagaIterator } from 'redux-saga'
import type { PayloadAction } from '@reduxjs/toolkit'

function* doGetCashTransactionsSaga({
  payload
}: PayloadAction<AtidaCashTransactionTriggerPayload>) {
  try {
    yield put(getCashTransactionsRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const response: AxiosResponse<AtidaCashTransactionsHistoryByDate> = yield call(
      client.get,
      `/api/account/cash-transactions`,
      { params: payload }
    )
    yield put(getCashTransactionsSuccess(response.data))
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      getCashTransactionsFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(getCashTransactionsFulfill())
  }
}

export function* getCashTransactionsSaga(): SagaIterator {
  yield all([takeLatest(getCashTransactionsTrigger, doGetCashTransactionsSaga)])
}
