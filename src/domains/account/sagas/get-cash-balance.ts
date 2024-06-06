import { CashBalanceResponse } from './../types'
import { AxiosResponse } from 'axios'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import {
  getCashBalanceTrigger,
  getCashBalanceRequest,
  getCashBalanceSuccess,
  getCashBalanceFailure,
  getCashBalanceFulfill
} from '../slices'
import { createClient, logger } from '~helpers'
import { getErrorMessage } from '~helpers/error'
import type { SagaIterator } from 'redux-saga'

function* doGetCashBalanceSaga() {
  try {
    yield put(getCashBalanceRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const response: AxiosResponse<CashBalanceResponse> = yield call(
      client.get,
      `/api/account/get-cash-balance`
    )
    yield put(getCashBalanceSuccess(response.data))
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      getCashBalanceFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(getCashBalanceFulfill())
  }
}

export function* getCashBalanceSaga(): SagaIterator {
  yield all([takeLatest(getCashBalanceTrigger, doGetCashBalanceSaga)])
}
