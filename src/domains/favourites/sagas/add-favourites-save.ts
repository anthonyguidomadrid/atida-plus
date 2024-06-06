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
  addFavouritesSave,
  addFavouritesSuccess,
  addFavouritesFailure,
  addFavouritesFulfill,
  addItemIsLoading,
  addItemIsSaved,
  addItemWasSuccess,
  addItemWasError,
  forceRefreshTrigger,
  getFavouritesFulfill
} from '../slices'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage } from '~helpers/error'
import { StrictEffect } from '@redux-saga/types'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'

function* doAddFavouritesSave({
  payload
}: PayloadAction<{ sku: string }>): Generator<StrictEffect, void, any> {
  try {
    yield put(addItemWasSuccess({ sku: payload.sku, wasSuccess: false }))
    yield put(addItemWasError({ sku: payload.sku, wasError: false }))
    yield put(addItemIsLoading({ sku: payload.sku, isLoading: true }))
    const locale: string = yield getContext('locale')
    const isLoggedIn = yield select(selectIsLoggedIn)

    const client = createClient({
      locale,
      addAnonymousCustomerUniqueId: false
    })
    yield call(client.post, '/api/favourites/add-favourites-save', {
      ...payload
    })
    yield put(addFavouritesSuccess())
    yield put(addItemIsLoading({ sku: payload.sku, isLoading: false }))
    yield put(addItemIsSaved({ sku: payload.sku, isSaved: true }))
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
        addFavouritesFailure({
          message: errorMessages[0]
        })
      )
      yield put(addItemWasError({ sku: payload.sku, wasError: true }))
    } else {
      yield put(
        addFavouritesFailure({
          message: errorMessages
        })
      )
      yield put(addItemWasError({ sku: payload.sku, wasError: true }))
    }
  } finally {
    yield put(addFavouritesFulfill())
  }
}

export function* addFavouritesSaveSaga(): SagaIterator {
  yield all([takeEvery(addFavouritesSave, doAddFavouritesSave)])
}
