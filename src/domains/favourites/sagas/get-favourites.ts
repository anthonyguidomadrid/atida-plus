import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  getFavouritesTrigger,
  getFavouritesRequest,
  getFavouritesSuccess,
  getFavouritesFailure,
  getFavouritesFulfill
} from '../slices'
import { GetFavouritesResponse } from '~domains/favourites/types'
import { getErrorMessage } from '~helpers/error'

function* doGetFavourites() {
  try {
    yield put(getFavouritesRequest())
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<GetFavouritesResponse> = yield call(
      client.get,
      '/api/favourites/get-favourites'
    )

    yield put(getFavouritesSuccess(response.data))
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      getFavouritesFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(getFavouritesFulfill())
  }
}

export function* getFavouritesSaga(): SagaIterator {
  yield all([takeLatest(getFavouritesTrigger, doGetFavourites)])
}
