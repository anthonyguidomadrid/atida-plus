import type { PayloadAction } from '@reduxjs/toolkit'

import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { triggerReportProductsSearched } from '..'
import { ReportProductsSearchedLoad } from '../types'

export function* doReportProductsSearchedSaga({
  payload
}: PayloadAction<ReportProductsSearchedLoad>): SagaIterator {
  const { query, isSearchAsYouType, suggestion, algoliaABTestId } = payload
  typeof analytics !== 'undefined' &&
    query &&
    analytics.track(
      'Products Searched',
      removeUndefinedPropertiesFromObject({
        query,
        is_search_as_you_type: isSearchAsYouType,
        suggestion,
        algolia_ab_test_id: algoliaABTestId
      })
    )
}

export function* reportProductsSearchedSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportProductsSearched, doReportProductsSearchedSaga)
  ])
}
