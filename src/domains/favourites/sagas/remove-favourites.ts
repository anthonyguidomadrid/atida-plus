import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  select,
  takeEvery
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  getFavouritesTrigger,
  removeFavouritesTrigger,
  removeFavouritesRequest,
  removeFavouritesSuccess,
  removeFavouritesFailure,
  removeFavouritesFulfill,
  getFavouritesRemoveItem,
  removeItemIsLoading,
  removeItemWasSuccess,
  removeItemWasError,
  removeItemIsSaved
} from '../slices'
import type { PayloadAction } from '@reduxjs/toolkit'
import { selectFavouritesListId } from '~domains/favourites/selectors'
import { triggerReportProductFavouritesFailed } from '~domains/analytics'
import { getErrorMessage, getErrorName } from '~helpers/error'

function* doRemoveFavourites({ payload }: PayloadAction<{ sku: string }>) {
  try {
    const favouritesListId: string = yield select(selectFavouritesListId)
    yield put(removeItemWasSuccess({ sku: payload.sku, wasSuccess: false }))
    yield put(removeItemWasError({ sku: payload.sku, wasError: false }))
    yield put(removeFavouritesRequest())
    yield put(removeItemIsLoading({ sku: payload.sku, isLoading: true }))
    const locale: string = yield getContext('locale')

    if (typeof favouritesListId === 'undefined') {
      yield put(getFavouritesTrigger())
    }

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })

    yield call(client.post, '/api/favourites/remove-favourites', {
      ...payload,
      favouritesListId
    })

    yield put(removeFavouritesSuccess())
    yield put(removeItemWasSuccess({ sku: payload.sku, wasSuccess: true }))
    yield put(removeItemIsSaved({ sku: payload.sku, isSaved: false }))
    yield put(getFavouritesRemoveItem({ sku: payload.sku }))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    const errorKey = getErrorName(error) ?? 'UnknownError'
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        removeFavouritesFailure({
          message: errorMessages[0]
        })
      )
      yield put(removeItemWasError({ sku: payload.sku, wasError: true }))
      yield put(
        triggerReportProductFavouritesFailed({
          event: 'Product Removed from Favourites Failed',
          error_key: errorKey,
          error_message: errorMessages[0]
        })
      )
    } else {
      yield put(
        removeFavouritesFailure({
          message: errorMessages
        })
      )
      yield put(removeItemWasError({ sku: payload.sku, wasError: true }))
      yield put(
        triggerReportProductFavouritesFailed({
          event: 'Product Removed from Favourites Failed',
          error_key: errorKey,
          error_message: errorMessages
        })
      )
    }
  } finally {
    yield put(removeFavouritesFulfill())
    yield put(removeItemIsLoading({ sku: payload.sku, isLoading: false }))
  }
}

export function* removeFavouritesSaga(): SagaIterator {
  yield all([takeEvery(removeFavouritesTrigger, doRemoveFavourites)])
}
