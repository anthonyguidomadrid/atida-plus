import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import { getErrorMessage } from '~helpers/error'
import {
  getCustomerRequest,
  invoiceRequireSuccess,
  invoiceRequireFailure,
  getCustomerFulfill,
  invoiceRequireTrigger
} from '../slices'
import { RequestInvoiceTriggerPayload } from '../types'

function* doUpdateCustomerInvoiceRequired({
  payload
}: PayloadAction<RequestInvoiceTriggerPayload>) {
  try {
    yield put(getCustomerRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const { ...details } = payload
    const response: AxiosResponse<{ invoiceRequired: boolean }> = yield call(
      client.patch,
      '/api/account/invoice-require',
      details
    )
    yield put(invoiceRequireSuccess(response.data.invoiceRequired))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        invoiceRequireFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        invoiceRequireFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(getCustomerFulfill())
  }
}

export function* customerRequestInvoiceSaga(): SagaIterator {
  yield takeLatest(invoiceRequireTrigger, doUpdateCustomerInvoiceRequired)
}
