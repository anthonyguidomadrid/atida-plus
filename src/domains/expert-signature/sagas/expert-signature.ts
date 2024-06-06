import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeEvery } from 'redux-saga/effects'
import { logger } from '~helpers'
import {
  expertSignatureTrigger,
  expertSignatureRequest,
  expertSignatureSuccess,
  expertSignatureFailure,
  expertSignatureFulfill
} from '../slices'

import { getErrorMessage } from '~helpers/error'
import { ExpertSignatureTrigger, ExpertSignatures } from '../types'

const dispatchExpertSignatureFetchRequest = async (
  locale: string,
  categoryId: string
): Promise<ExpertSignatures> => {
  const {
    fetchExpertSignatures
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require('../services/expert-signatures')

  return fetchExpertSignatures(locale, categoryId)
}

function* getExpertSignature({
  payload
}: PayloadAction<ExpertSignatureTrigger>) {
  try {
    yield put(expertSignatureRequest())
    const locale: string = yield getContext('locale')
    const response: ExpertSignatures = yield call(
      dispatchExpertSignatureFetchRequest,
      locale,
      payload.categoryId
    )
    yield put(expertSignatureSuccess(response))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        expertSignatureFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        expertSignatureFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(expertSignatureFulfill())
  }
}

export function* expertSignatureSaga(): SagaIterator {
  yield all([takeEvery(expertSignatureTrigger, getExpertSignature)])
}
