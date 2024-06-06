import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  commonFailure,
  commonFulfill,
  commonRequest,
  commonSuccess,
  commonTrigger
} from '../slices'
import { Common } from '../types'
import { getErrorMessage } from '~helpers/error'

const dispatchCommonFetchRequest = async (locale: string): Promise<Common> => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetchCommon } = require('../services/fetch-common')
    return fetchCommon(locale)
  } else {
    const client = createClient({ locale })
    const response = await client.get<Common>('/api/page/common')
    return response.data
  }
}

function* getCommon() {
  try {
    yield put(commonRequest())
    const locale: string = yield getContext('locale')
    const response: Common = yield call(dispatchCommonFetchRequest, locale)
    yield put(commonSuccess(response))
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      commonFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(commonFulfill())
  }
}

export function* commonSaga(): SagaIterator {
  yield all([takeLatest(commonTrigger, getCommon)])
}
