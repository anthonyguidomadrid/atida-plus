import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeEvery } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  getBrandFailure,
  getBrandFulfill,
  getBrandRequest,
  getBrandSuccess,
  getBrandTrigger
} from '../slices'
import { Brands } from '~domains/contentful'
import { getErrorMessage } from '~helpers/error'

const dispatchBrandsFetchRequest = async (locale: string): Promise<Brands> => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetchBrands } = require('../services/fetch-brands')
    return fetchBrands(locale)
  } else {
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response = await client.get<Brands>('/api/brand/get')
    return response.data
  }
}
function* getBrand() {
  try {
    yield put(getBrandRequest())
    const locale: string = yield getContext('locale')

    const apiResponse: Brands = yield call(dispatchBrandsFetchRequest, locale)
    yield put(getBrandSuccess(apiResponse))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        getBrandFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        getBrandFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(getBrandFulfill())
  }
}

export function* getBrandSaga(): SagaIterator {
  yield all([takeEvery(getBrandTrigger, getBrand)])
}
