import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, getContext, select, take, takeEvery } from 'redux-saga/effects'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportProductListFiltered
} from '..'
import { ReportProductListFilteredLoad } from '../types'
import { getAlgoliaIndex } from '~domains/algolia'

export function* doReportProductListFilteredSaga({
  payload
}: PayloadAction<ReportProductListFilteredLoad>): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)
  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)
  const products: unknown[] = []
  const locale: string = yield getContext('locale')
  const indexName = getAlgoliaIndex(locale, 'productIndexes')

  payload.products?.forEach(item => {
    products.push(
      removeUndefinedPropertiesFromObject({
        product_id: item?.id,
        name: item?.name,
        brand: item?.brand?.label,
        brand_code: item?.brand?.code,
        price: (item?.price?.value ?? 0) / 100,
        rrp_price: (item?.rrp?.value ?? 0) / 100,
        position: item?.position,
        objectID: item?.sku
      })
    )
  })

  typeof analytics !== 'undefined' &&
    analytics.track('Product List Filtered', {
      list_id: 'filtered',
      products,
      filters: payload.filters,
      index: indexName,
      nonInteraction: 1
    })
}

export function* reportProductListFilteredSaga(): SagaIterator {
  yield all([
    takeEvery(triggerReportProductListFiltered, doReportProductListFilteredSaga)
  ])
}
