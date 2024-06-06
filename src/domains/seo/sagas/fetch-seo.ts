import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { Seo } from '~domains/contentful'
import { createClient, logger } from '~helpers'
import {
  seoBlockFailure,
  seoBlockFulfill,
  seoBlockRequest,
  seoBlockSuccess,
  seoBlockTrigger
} from '../slices'
import { getErrorMessage, getErrorStatus } from '~helpers/error'

const dispatchSeoBlockFetchRequest = async (
  locale: string,
  slug: string
): Promise<Partial<Seo>> => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetchSeoBlock } = require('../services/fetch-seo')
    return fetchSeoBlock(locale, slug)
  } else {
    const client = createClient({ locale })
    const response = await client.get<Partial<Seo>>(
      `/api/seo/fetch?slug=${slug}`
    )
    return response.data
  }
}

function* getSeoBlock({ payload }: ReturnType<typeof seoBlockTrigger>) {
  try {
    yield put(seoBlockRequest())
    const locale: string = yield getContext('locale')
    const response: Partial<Seo> = yield call(
      dispatchSeoBlockFetchRequest,
      payload.locale || locale,
      payload.slug
    )
    yield put(seoBlockSuccess(response))
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      seoBlockFailure({
        message: getErrorMessage(error),
        code: getErrorStatus(error)
      })
    )
  } finally {
    yield put(seoBlockFulfill())
  }
}

export function* fetchSeoBlockSaga(): SagaIterator {
  yield all([takeLatest(seoBlockTrigger, getSeoBlock)])
}
