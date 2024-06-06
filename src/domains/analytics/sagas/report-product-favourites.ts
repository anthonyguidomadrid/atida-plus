import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportProductFavourites } from '../types'
import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportProductFavourites } from '..'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { getCategoriesPath } from '~domains/analytics/helpers/getCategoriesPath'

export function* doReportProductFavouritesSaga({
  payload
}: PayloadAction<ReportProductFavourites>): SagaIterator {
  const { event, product, added_from, removed_from } = payload

  const itemCategories: string | undefined = getCategoriesPath(
    product?.categories
  )
  const price: number = product?.price?.value ? product.price.value / 100 : 0
  const brand: string = product?.brand?.label ? product.brand.label : ''

  typeof analytics !== 'undefined' &&
    analytics.track(
      event, // Product Added to Favourites, Product Removed from Favourites
      removeUndefinedPropertiesFromObject({
        brand: brand,
        category: itemCategories,
        price: price,
        product_id: product?.id || product?.sku,
        sku: product?.sku,
        ...(added_from && {
          added_from
        }),
        ...(removed_from && {
          removed_from
        })
      })
    )
}

export function* reportProductFavouritesSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportProductFavourites, doReportProductFavouritesSaga)
  ])
}
