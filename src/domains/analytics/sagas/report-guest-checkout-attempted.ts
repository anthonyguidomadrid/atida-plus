import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, delay, race, select, take, takeLatest } from 'redux-saga/effects'
import { triggerReportGuestCheckoutAttempted } from '..'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { getCategoriesPath } from '../helpers/getCategoriesPath'
import {
  getBasketFulfill,
  selectData,
  selectId,
  selectItems
} from '~domains/basket'
import { ProductLabelWrapper } from '~domains/product'

export function* doReportGuestCheckoutAttemptedSaga({}: PayloadAction): SagaIterator {
  let basketData = yield select(selectData)
  let basketId = yield select(selectId)
  let basketItems = yield select(selectItems)
  if (!basketId) {
    yield race([take(getBasketFulfill), delay(5000)])
    basketId = yield select(selectId)
    basketItems = yield select(selectItems)
    basketData = yield select(selectData)
  }

  const products: unknown[] = []
  basketItems.forEach(
    (item: {
      product: {
        categories: Record<string, string | string[] | undefined> | undefined
        brand: { label: string; code: string }
        format: { code: string }
        largeImage: string
        labels: ProductLabelWrapper[]
        name: string
        rrp: { value: number }
      }
      unitPrice: number
      tax: number
      sku: number
      id: string
      quantity: number
      isPromo: boolean
    }) => {
      const itemCategories = getCategoriesPath(item?.product?.categories)
      products.push(
        removeUndefinedPropertiesFromObject({
          tax: (item?.tax ?? 0) / 100,
          brand: item?.product?.brand?.label,
          brand_code: item?.product?.brand?.code,
          category: itemCategories,
          format: item?.product?.brand?.label,
          format_code: item?.product?.format?.code,
          image_url: item?.product?.largeImage,
          labels: item?.product?.labels,
          name: item?.product?.name,
          price: (item?.unitPrice - item?.tax ?? 0) / 100,
          product_id: item?.id,
          quantity: item?.quantity,
          rrp_price: (item?.product?.rrp?.value ?? 0) / 100,
          sku: item?.sku,
          isPromo: item?.isPromo
        })
      )
    }
  )

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Guest Checkout Attempted',
      removeUndefinedPropertiesFromObject({
        cart_id: basketId,
        currency: basketData?.currency,
        discount: (basketData?.discountTotal ?? 0) / 100,
        products,
        revenue: (basketData?.grandTotal - basketData?.taxTotal ?? 0) / 100,
        tax: (basketData?.taxTotal ?? 0) / 100,
        total: (basketData?.grandTotal - basketData?.taxTotal ?? 0) / 100
      })
    )
}

export function* reportGuestCheckoutAttemptedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportGuestCheckoutAttempted,
      doReportGuestCheckoutAttemptedSaga
    )
  ])
}
