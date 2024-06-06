import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportProductRemovedLoad } from '../types'
import { BasketItem } from '~domains/basket/types'
import type { SagaIterator } from 'redux-saga'
import { all, getContext, select, takeLatest } from 'redux-saga/effects'
import {
  selectId,
  selectItems,
  selectBasketCouponData,
  selectCouponData
} from '~domains/basket'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { triggerReportProductRemoved } from '..'
import { getCategoriesPath } from '../helpers/getCategoriesPath'

export function* doReportProductRemovedSaga({
  payload
}: PayloadAction<ReportProductRemovedLoad>): SagaIterator {
  const { sku, quantity, quantity_difference, removed_from } = payload
  const basketId = yield select(selectId)
  const basketItems: ReturnType<typeof selectItems> = yield select(selectItems)
  const couponCodeFromCoupon = yield select(selectCouponData)
  const couponCodeFromBasket = yield select(selectBasketCouponData)
  let reportedItemPosition = 0
  const reportedItem = basketItems.filter(item => item.sku === sku).shift()
  const remainingProducts: (BasketItem & {
    currency: string | undefined
  })[] = []
  const categories = getCategoriesPath(reportedItem?.product?.categories)
  const locale: string = yield getContext('locale')

  basketItems?.map((item, index) => {
    if (item.sku === sku && !quantity_difference && !quantity) return
    if (item.sku === sku) reportedItemPosition = index
    const itemCategories = getCategoriesPath(item.product?.categories)
    remainingProducts.push({
      category: itemCategories,
      brand: item?.product?.brand?.label,
      brand_code: item?.product?.brand?.code,
      image_url: item?.product?.largeImage,
      name: item?.product?.name,
      position: index,
      price: ((item?.unitPrice ?? 0) - (item?.tax ?? 0)) / 100,
      currency: item?.product?.pricePerUnit?.currency,
      product_id: item?.id,
      isPromo: item?.isPromo,
      sku: item?.sku,
      url:
        item?.product?.url &&
        `https://atida.com/${locale}${item?.product?.url}`,
      quantity: item.sku === sku ? quantity : item?.quantity
    })
  })

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Product Removed',
      removeUndefinedPropertiesFromObject({
        cart_id: basketId,
        product_id: reportedItem?.id,
        sku: sku,
        category: categories,
        name: reportedItem?.product?.name,
        brand: reportedItem?.product?.brand?.label,
        brand_code: reportedItem?.product?.brand?.code,
        variant: '', // TODO Pass once it's available from BE
        price:
          ((reportedItem?.unitPrice ?? 0) - (reportedItem?.tax ?? 0)) / 100,
        currency: reportedItem?.product?.pricePerUnit?.currency,
        quantity: quantity_difference || reportedItem?.quantity,
        removed_from: removed_from,
        coupon: couponCodeFromCoupon
          ? couponCodeFromCoupon[0]?.code
          : couponCodeFromBasket[0]?.code,
        position: reportedItemPosition,
        url:
          reportedItem?.product?.url &&
          `https://atida.com/${locale}${reportedItem?.product?.url}`,
        image_url: reportedItem?.product?.largeImage,
        isPromo: reportedItem?.isPromo,
        remaining_products: remainingProducts
      })
    )
}

export function* reportProductRemovedSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportProductRemoved, doReportProductRemovedSaga)
  ])
}
