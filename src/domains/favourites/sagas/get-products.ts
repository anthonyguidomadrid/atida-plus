import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  getFavouritesProductsTrigger,
  getFavouritesProductsSuccess,
  getFavouritesFulfill,
  getFavouritesProductsFailure
} from '../slices'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  FavouritesItemsIdsPayload,
  FavouritesWithProducts
} from '~domains/favourites/types'
import { getErrorMessage } from '~helpers/error'

function* doGetProducts({ payload }: PayloadAction<FavouritesItemsIdsPayload>) {
  try {
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<FavouritesWithProducts> = yield call(
      client.post,
      '/api/favourites/get-products',
      payload
    )

    yield put(getFavouritesProductsSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        getFavouritesProductsFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        getFavouritesProductsFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(getFavouritesFulfill())
  }
}

export function* getProductsSaga(): SagaIterator {
  yield all([takeLatest(getFavouritesProductsTrigger, doGetProducts)])
}
