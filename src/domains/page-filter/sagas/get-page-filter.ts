import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  select,
  takeEvery
} from 'redux-saga/effects'
import {
  createClient,
  logger,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import {
  getPageFilterFailure,
  getPageFilterFulfill,
  getPageFilterRequest,
  getPageFilterSuccess,
  getPageFilterTrigger
} from '../slices'
import { PageFilter } from '~domains/contentful/normalizers/page-filter'
import { selectSlug } from '../selectors'
import { getErrorMessage } from '~helpers/error'

const dispatchPageFiltersFetchRequest = async (
  locale: string,
  slug: string
): Promise<PageFilter> => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetchPageFilter } = require('../services/fetch-page-filter')

    return fetchPageFilter(slug, locale)
  } else {
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })

    const response = await client.get<PageFilter>('/api/page-filter/get', {
      params: removeUndefinedPropertiesFromObject({
        locale,
        slug
      })
    })

    return response.data
  }
}

function* getPageFilter() {
  try {
    yield put(getPageFilterRequest())
    const locale: string = yield getContext('locale')
    const slug: string = yield select(selectSlug)

    const apiResponse: PageFilter = yield call(
      dispatchPageFiltersFetchRequest,
      locale,
      slug
    )
    yield put(getPageFilterSuccess(apiResponse))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        getPageFilterFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        getPageFilterFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(getPageFilterFulfill())
  }
}

export function* getPageFilterSaga(): SagaIterator {
  yield all([takeEvery(getPageFilterTrigger, getPageFilter)])
}
