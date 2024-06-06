import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import { getErrorMessage } from '~helpers/error'
import {
  pageRedirectFailure,
  pageRedirectFulfill,
  pageRedirectRequest,
  pageRedirectSuccess,
  pageRedirectTrigger
} from '../slices'
import { PageRedirect } from '../types'

const dispatchPageRedirectFetchRequest = async (
  locale: string
): Promise<PageRedirect> => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetchPageRedirect } = require('../services/fetch-page-redirect')
    return fetchPageRedirect(locale)
  } else {
    const client = createClient({ locale })
    const response = await client.get<PageRedirect>('/api/page/page-redirect')
    return response.data
  }
}

function* getPageRedirect() {
  try {
    yield put(pageRedirectRequest())
    const locale: string = yield getContext('locale')
    const response: PageRedirect = yield call(
      dispatchPageRedirectFetchRequest,
      locale
    )
    yield put(pageRedirectSuccess(response))
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      pageRedirectFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(pageRedirectFulfill())
  }
}

export function* pageRedirectSaga(): SagaIterator {
  yield all([takeLatest(pageRedirectTrigger, getPageRedirect)])
}
