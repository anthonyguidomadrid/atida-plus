import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportProductFavouritesFailed } from '..'
import { ReportProductFavouritesError } from '../types'

export function* doReportProductFavouritesFailedSaga({
  payload
}: PayloadAction<ReportProductFavouritesError>): SagaIterator {
  const { event, error_key, error_message } = payload

  // Product Added to Favourites Failed, Product Removed from Favourites Failed
  typeof analytics !== 'undefined' &&
    analytics.track(event, {
      error_key: error_key ?? undefined,
      error_message: error_message ?? undefined
    })
}

export function* reportProductFavouritesFailedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportProductFavouritesFailed,
      doReportProductFavouritesFailedSaga
    )
  ])
}
