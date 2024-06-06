import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  delay,
  getContext,
  put,
  select,
  takeEvery
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  removeFavouritesSave,
  removeFavouritesFailure,
  removeFavouritesFulfill,
  removeItemWasError,
  removeItemWasSuccess,
  removeFavouritesSuccess,
  removeItemIsLoading,
  removeItemIsSaved,
  forceRefreshTrigger,
  getFavouritesFulfill
} from '../slices'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage } from '~helpers/error'
import { StrictEffect } from '@redux-saga/types'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'

function* doRemoveFavouritesSave({
  payload
}: PayloadAction<{ sku: string }>): Generator<StrictEffect, void, any> {
  try {
    yield put(removeItemWasSuccess({ sku: payload.sku, wasSuccess: false }))
    yield put(removeItemWasError({ sku: payload.sku, wasError: false }))
    yield put(removeItemIsLoading({ sku: payload.sku, isLoading: true }))
    const locale: string = yield getContext('locale')
    const isLoggedIn = yield select(selectIsLoggedIn)

    const client = createClient({
      locale,
      addAnonymousCustomerUniqueId: false
    })
    yield call(client.post, '/api/favourites/remove-favourites-save', {
      ...payload
    })
    yield put(removeFavouritesSuccess())
    yield put(removeItemIsLoading({ sku: payload.sku, isLoading: false }))
    yield put(removeItemIsSaved({ sku: payload.sku, isSaved: true }))
    yield put(forceRefreshTrigger())
    if (!isLoggedIn) {
      yield delay(0)
    }
    yield put(getFavouritesFulfill())
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        removeFavouritesFailure({
          message: errorMessages[0]
        })
      )
      yield put(removeItemWasError({ sku: payload.sku, wasError: true }))
    } else {
      yield put(
        removeFavouritesFailure({
          message: errorMessages
        })
      )
      yield put(removeItemWasError({ sku: payload.sku, wasError: true }))
    }
  } finally {
    yield put(removeFavouritesFulfill())
  }
}

export function* removeFavouritesSaveSaga(): SagaIterator {
  yield all([takeEvery(removeFavouritesSave, doRemoveFavouritesSave)])
}
