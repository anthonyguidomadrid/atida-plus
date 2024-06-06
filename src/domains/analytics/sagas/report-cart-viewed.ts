import type { PayloadAction } from '@reduxjs/toolkit'

import type { SagaIterator } from 'redux-saga'
import { all, delay, race, select, take, takeLatest } from 'redux-saga/effects'
import {
  getBasketFulfill,
  selectBasketCouponData,
  selectId,
  selectItems
} from '~domains/basket'
import { BasketItem } from '~domains/basket/types'
import { Product } from '~domains/product'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { getCategoriesPath } from '../helpers/getCategoriesPath'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportCartViewed
} from '..'

export function* doReportCartViewedSaga({}: PayloadAction): SagaIterator {
  // Reaching the basket page by using the 🗑 icon in the top menu requires
  // the basket content to be fetched (getBasketFulfill) from Spryker.
  // If the basket is reached from the basket modal, the basket contents is
  // already in the store and there is no need to wait for the fulfill.
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)
  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)
  let basketId = yield select(selectId)
  if (!basketId) {
    yield race([take(getBasketFulfill), delay(5000)])
    basketId = yield select(selectId)
  }
  const couponCodeFromBasket = yield select(selectBasketCouponData)
  const basketItems = yield select(selectItems)
  const products: unknown[] = []

  basketItems &&
    basketItems.forEach(
      (
        item: BasketItem & { product: Omit<Product, 'sku' | 'price'> },
        index: number
      ) => {
        const itemCategories = getCategoriesPath(item?.product?.categories)
        products.push(
          removeUndefinedPropertiesFromObject({
            product_id: item?.id,
            sku: item?.sku,
            category: itemCategories,
            name: item?.product?.name,
            brand: item?.product?.brand?.label,
            brand_code: item?.product?.brand?.code,
            format: item?.product?.format?.label,
            format_code: item?.product?.format?.code,
            variant: undefined, // TODO Update when added on the backend
            availability: item?.product?.availability,
            labels: item?.product?.labels,
            price: ((item?.unitPrice ?? 0) - (item?.tax ?? 0)) / 100,
            rrp_price: (item?.product?.rrp?.value ?? 0) / 100,
            currency: item?.product?.pricePerUnit?.currency,
            quantity: item?.quantity,
            coupon: couponCodeFromBasket?.[0]?.code,
            position: index + 1,
            url: item?.product?.url
              ? window.location.origin + item.product.url
              : undefined,
            image_url: item?.product?.largeImage,
            isPromo: item?.isPromo
          })
        )
      }
    )
  typeof analytics !== 'undefined' &&
    analytics.track('Cart Viewed', {
      cart_id: basketId,
      products,
      nonInteraction: 1
    })
}

export function* reportCartViewedSaga(): SagaIterator {
  yield all([takeLatest(triggerReportCartViewed, doReportCartViewedSaga)])
}
