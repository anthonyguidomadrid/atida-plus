import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'

import { createClient, logger } from '~helpers'
import {
  pageContentFailure,
  pageContentFulfill,
  pageContentRequest,
  pageContentSuccess,
  pageContentTrigger
} from '../slices'
import { PageContent } from '../types'
import { getErrorMessage, getErrorStatus } from '~helpers/error'

const dispatchPageContentFetchRequest = async (
  locale: string,
  slug: string,
  preview?: boolean
): Promise<PageContent> => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetchPageContent } = require('../services/fetch-page-content')
    return fetchPageContent(locale, slug, preview)
  } else {
    const client = createClient({ locale })
    const response = await client.get<PageContent>(
      `/api/page/page-content?slug=${slug}`
    )
    return response.data
  }
}

function* getPageContent({ payload }: ReturnType<typeof pageContentTrigger>) {
  const { slug, preview = false } = payload

  try {
    yield put(pageContentRequest())
    const locale: string = yield getContext('locale')
    const response: PageContent = yield call(
      dispatchPageContentFetchRequest,
      locale,
      slug,
      preview
    )
    yield put(pageContentSuccess(response))
  } catch (error) {
    logger.error(getErrorMessage(error))

    yield put(
      pageContentFailure({
        message: getErrorMessage(error),
        code: getErrorStatus(error)
      })
    )
  } finally {
    yield put(pageContentFulfill())
  }
}

export function* pageContentSaga(): SagaIterator {
  yield all([takeLatest(pageContentTrigger, getPageContent)])
}
