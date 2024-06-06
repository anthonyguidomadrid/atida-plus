import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  updateTaxReferenceTrigger,
  updateTaxReferenceRequest,
  updateTaxReferenceSuccess,
  updateTaxReferenceFailure,
  updateTaxReferenceFulfill,
  getCustomerTrigger
} from '../slices'
import { getErrorMessage } from '~helpers/error'

function* doupdateTaxReferenceSaga({
  payload
}: PayloadAction<{ customerReference: string; taxReference: string }>) {
  try {
    yield put(updateTaxReferenceRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const { ...details } = payload
    yield call(client.patch, '/api/account/update-tax-reference', details)
    yield put(updateTaxReferenceSuccess())
    yield put(
      getCustomerTrigger({ customerReference: details.customerReference })
    )
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        updateTaxReferenceFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        updateTaxReferenceFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(updateTaxReferenceFulfill())
  }
}

export function* updateTaxReferenceSaga(): SagaIterator {
  yield all([takeLatest(updateTaxReferenceTrigger, doupdateTaxReferenceSaga)])
}
