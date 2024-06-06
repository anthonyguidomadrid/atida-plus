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
  addFavouritesTrigger,
  addFavouritesRequest,
  addFavouritesSuccess,
  addFavouritesFailure,
  addFavouritesFulfill,
  addItemWasSuccess,
  addItemWasError,
  addItemIsLoading,
  addItemIsSaved,
  getFavouritesAddItem,
  getFavouritesTrigger
} from '../slices'
import type { PayloadAction } from '@reduxjs/toolkit'
import { selectFavouritesListId } from '~domains/favourites'
import { triggerReportProductFavouritesFailed } from '~domains/analytics'
import { getErrorName, getErrorMessage } from '~helpers/error'
import { StrictEffect } from '@redux-saga/types'

function* doAddFavourites({
  payload
}: PayloadAction<{ sku: string }>): Generator<StrictEffect, void, any> {
  try {
    const favouritesListId: string = yield select(selectFavouritesListId)
    yield put(addItemWasSuccess({ sku: payload.sku, wasSuccess: false }))
    yield put(addItemWasError({ sku: payload.sku, wasError: false }))
    yield put(addFavouritesRequest())
    yield put(addItemIsLoading({ sku: payload.sku, isLoading: true }))
    const locale: string = yield getContext('locale')

    const client = createClient({
      locale,
      addAnonymousCustomerUniqueId: false
    })

    yield call(client.post, '/api/favourites/add-favourites', { ...payload })

    /* Get the favourites list id after adding a product as when the favourites list is empty there is no id returned in the response */
    if (typeof favouritesListId === 'undefined') {
      yield put(getFavouritesTrigger())
    }

    yield put(addFavouritesSuccess())
    yield put(addItemWasSuccess({ sku: payload.sku, wasSuccess: true }))
    yield put(addItemIsSaved({ sku: payload.sku, isSaved: false }))
    yield put(getFavouritesAddItem({ sku: payload.sku }))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    const errorKey = getErrorName(error) ?? 'UnknownError'
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        addFavouritesFailure({
          message: errorMessages[0]
        })
      )
      yield put(addItemWasError({ sku: payload.sku, wasError: true }))
      yield put(
        triggerReportProductFavouritesFailed({
          event: 'Product Added to Favourites Failed',
          error_key: errorKey,
          error_message: errorMessages[0]
        })
      )
    } else {
      yield put(
        addFavouritesFailure({
          message: errorMessages
        })
      )
      yield put(addItemWasError({ sku: payload.sku, wasError: true }))
      yield put(
        triggerReportProductFavouritesFailed({
          event: 'Product Added to Favourites Failed',
          error_key: errorKey,
          error_message: errorMessages
        })
      )
    }
  } finally {
    yield put(addFavouritesFulfill())
    yield put(addItemIsLoading({ sku: payload.sku, isLoading: false }))
  }
}

export function* addFavouritesSaga(): SagaIterator {
  yield all([takeEvery(addFavouritesTrigger, doAddFavourites)])
}
