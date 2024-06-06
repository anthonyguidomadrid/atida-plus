import type { PayloadAction } from '@reduxjs/toolkit'

import type { SagaIterator } from 'redux-saga'
import { all, getContext, select, take, takeEvery } from 'redux-saga/effects'
import { selectBasketCouponData, selectItems } from '~domains/basket'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { getCategoriesPath } from '../helpers/getCategoriesPath'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportProductListViewed
} from '..'
import { ReportProductListViewedLoad } from '../types'
import { getAlgoliaIndex } from '~domains/algolia'
import { selectPageContent } from '~domains/page'
import { BasketItem } from '~domains/basket/types'
import { Product } from '~domains/product'

export function* doReportProductListViewedSaga({
  payload
}: PayloadAction<ReportProductListViewedLoad>): SagaIterator {
  if (!payload.type) return
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)
  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)
  const couponCodeFromBasket = yield select(selectBasketCouponData)
  const products: unknown[] = []
  const locale: string = yield getContext('locale')
  const indexName = getAlgoliaIndex(locale, 'productIndexes')
  const pageContent = yield select(selectPageContent)

  const basketItems: (BasketItem & {
    product: Omit<Partial<Product>, 'sku' | 'price'>
  })[] = yield select(selectItems)

  payload.products?.forEach(item => {
    const itemCategories: string | undefined = getCategoriesPath(
      item.categories
    )
    const productInBasket = basketItems.find(
      product => item.sku === product.sku
    )

    products.push(
      removeUndefinedPropertiesFromObject({
        product_id: item?.id,
        sku: item?.sku,
        category: itemCategories,
        name: item?.name,
        brand: item?.brand?.label,
        brand_code: item?.brand?.code,
        format: item?.format?.label,
        format_code: item?.format?.code,
        variant: undefined, // TODO Update when added on the backend
        price: (item?.price?.value ?? 0) / 100,
        rrp_price: (item?.rrp?.value ?? 0) / 100,
        quantity: item?.basketQuantity,
        coupon: couponCodeFromBasket?.[0]?.code,
        position: item?.position,
        objectID: item?.sku,
        isPromo: productInBasket?.isPromo
      })
    )
  })

  const {
    type,
    list_id,
    list_view,
    category,
    recommendation_id,
    algoliaABTestId
  } = payload

  const categoryLvl0 = pageContent?.content?.category?.path.id0
  const categoryLvl1 = pageContent?.content?.category?.path.id1
  const categoryLvl2 = pageContent?.content?.category?.path.id2
  const listId =
    list_id ??
    `${type}/${categoryLvl0 && categoryLvl0}${
      categoryLvl1 !== undefined ? `/${categoryLvl1}` : ''
    }${categoryLvl2 !== undefined ? `/${categoryLvl2}` : ''}`

  typeof analytics !== 'undefined' &&
    analytics.track('Product List Viewed', {
      list_id: listId,
      category: category,
      products,
      index: indexName,
      list_view: list_view,
      nonInteraction: 1,
      algolia_ab_test_id: algoliaABTestId,
      ...(recommendation_id && {
        recommendation_id
      })
    })
}

export function* reportProductListViewedSaga(): SagaIterator {
  yield all([
    takeEvery(triggerReportProductListViewed, doReportProductListViewedSaga)
  ])
}
