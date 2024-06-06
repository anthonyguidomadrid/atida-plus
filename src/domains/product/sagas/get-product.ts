import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  contentFailure,
  contentFulfill,
  contentRequest,
  contentSuccess,
  contentTrigger
} from '../slices'
import { GetElasticSearchProductPayload, Product } from '../types'
import { getErrorMessage } from '~helpers/error'

const dispatchProductFetchRequest = async (
  locale: string,
  data?: GetElasticSearchProductPayload
): Promise<Product> => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetchProduct } = require('../services/fetch-product')
    return fetchProduct(locale, data)
  } else {
    const client = createClient({ locale })
    const sessionChannel =
      data?.sessionChannel?.channel && data?.sessionChannel?.sku
        ? `&sessionChannel=${data?.sessionChannel?.channel},${data?.sessionChannel?.sku}`
        : ''
    const response = await client.get<Product>(
      `/api/product/get?sku=${data?.sku}${sessionChannel}`
    )
    return response.data
  }
}
function* getProduct({ payload }: ReturnType<typeof contentTrigger>) {
  try {
    yield put(contentRequest())
    const locale: string = yield getContext('locale')
    const response: Product = yield call(
      dispatchProductFetchRequest,
      locale,
      payload
    )
    yield put(contentSuccess(response))
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      contentFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(contentFulfill())
  }
}

export function* getProductSaga(): SagaIterator {
  yield all([takeLatest(contentTrigger, getProduct)])
}
