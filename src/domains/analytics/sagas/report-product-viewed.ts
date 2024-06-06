import type { PayloadAction } from '@reduxjs/toolkit'

import type { SagaIterator } from 'redux-saga'
import { all, getContext, select, take, takeLatest } from 'redux-saga/effects'
import { getAlgoliaIndex } from '~domains/algolia'
import { selectBasketCouponData, selectItems } from '~domains/basket'
import { BasketItem } from '~domains/basket/types'
import { Product } from '~domains/product'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportProductViewed
} from '..'
import { getCategoriesPath } from '../helpers/getCategoriesPath'
import { ReportProductViewedLoad } from '../types'

export function* doReportProductViewedSaga({
  payload
}: PayloadAction<ReportProductViewedLoad>): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)
  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)
  const { product, basketQuantity, positionInBasket } = payload
  const itemCategories: string | undefined = getCategoriesPath(
    product?.categories
  )
  const couponCodeFromBasket = yield select(selectBasketCouponData)
  const locale: string = yield getContext('locale')
  const indexName = getAlgoliaIndex(locale, 'productIndexes')
  const basketItems: (BasketItem & {
    product: Omit<Partial<Product>, 'sku' | 'price'>
  })[] = yield select(selectItems)

  const productInBasket = basketItems.find(item => item.sku === product.sku)

  const price = product?.price?.value / 100
  typeof analytics !== 'undefined' &&
    analytics.track(
      'Product Viewed',
      removeUndefinedPropertiesFromObject({
        product_id: product?.id ?? productInBasket?.id,
        sku: product?.sku,
        category: itemCategories,
        name: product?.name,
        brand: product?.brand?.label,
        brand_code: product?.brand?.code,
        format: product?.format?.label,
        format_code: product?.format?.code,
        variant: undefined, // TODO Update when added on the backend
        price,
        rrp_price: product?.rrp?.value && product.rrp.value / 100,
        currency: product?.price?.currency,
        quantity: basketQuantity,
        position: positionInBasket,
        value: basketQuantity * price,
        coupon: couponCodeFromBasket?.[0]?.code,
        url: product?.url && window.location.origin + product?.url,
        image_url: product?.largeImage,
        objectID: product?.sku,
        index: indexName,
        nonInteraction: 1,
        isPromo: productInBasket?.isPromo
      })
    )
}

export function* reportProductViewedSaga(): SagaIterator {
  yield all([takeLatest(triggerReportProductViewed, doReportProductViewedSaga)])
}
