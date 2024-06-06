import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportProductAddedLoad } from '../types'
import { BasketItem } from '~domains/basket/types'
import type { SagaIterator } from 'redux-saga'
import { all, getContext, select, takeLatest } from 'redux-saga/effects'
import {
  selectBasketCouponData,
  selectCouponData,
  selectId
} from '~domains/basket'
import {
  defaultStorageMechanism,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { triggerReportProductAdded } from '..'
import { getCategoriesPath } from '../helpers/getCategoriesPath'
import { getAlgoliaIndex } from '~domains/algolia'
import { StorageMechanism } from '~types/StorageMechanism'

export function* doReportProductAddedSaga({
  payload
}: PayloadAction<ReportProductAddedLoad>): SagaIterator {
  const { sku, quantity, quantity_difference, data, added_from } = payload
  const basketId = yield select(selectId)
  const { items } = data
  const couponCodeFromCoupon = yield select(selectCouponData)
  const couponCodeFromBasket = yield select(selectBasketCouponData)
  let reportedItemPosition = 0
  const reportedItem = items?.filter(item => item.sku === sku).shift()
  const remainingProducts: BasketItem[] = []
  const categories = getCategoriesPath(reportedItem?.product?.categories)
  const locale: string = yield getContext('locale')
  const indexName = getAlgoliaIndex(locale, 'productIndexes')
  const algoliaQueryIdStorageMechanism = defaultStorageMechanism() as StorageMechanism
  const algoliaQueryId = algoliaQueryIdStorageMechanism.get('algoliaQueryId')

  items?.map((item, index) => {
    if (item.sku === sku) reportedItemPosition = index
    const itemCategories = getCategoriesPath(item.product?.categories)
    remainingProducts.push({
      category: itemCategories,
      brand: item.product?.brand?.label,
      brand_code: item.product?.brand?.code,
      image_url: item.product?.largeImage,
      name: item.product?.name,
      position: index,
      currency: item.product?.pricePerUnit?.currency,
      price: ((item?.unitPrice ?? 0) - (item?.tax ?? 0)) / 100,
      product_id: item.id,
      sku: item.sku,
      url:
        item?.product?.url &&
        `https://atida.com/${locale}${item?.product?.url}`,
      quantity: item.sku === sku ? quantity : item?.quantity,
      rrp_price: item.product?.rrp?.value && item.product?.rrp?.value / 100,
      isPromo: item?.isPromo,
      gift: {}
    })
  })

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Product Added',
      removeUndefinedPropertiesFromObject({
        cart_id: basketId,
        product_id: reportedItem?.id,
        sku: sku,
        isPromo: payload.isPromo ?? false,
        category: categories,
        name: reportedItem?.product?.name,
        brand: reportedItem?.product?.brand?.label,
        brand_code: reportedItem?.product?.brand?.code,
        variant: '', // TODO Pass once it's available from BE
        price:
          ((reportedItem?.unitPrice ?? 0) - (reportedItem?.tax ?? 0)) / 100,
        currency: reportedItem?.product?.pricePerUnit?.currency,
        quantity: quantity_difference || quantity,
        coupon: couponCodeFromCoupon
          ? couponCodeFromCoupon[0]?.code
          : couponCodeFromBasket
          ? couponCodeFromBasket[0]?.code
          : '',
        position: reportedItemPosition,
        added_from: added_from,
        url:
          reportedItem?.product?.url &&
          `https://atida.com/${locale}${reportedItem?.product?.url}`,
        image_url: reportedItem?.product?.largeImage,
        remaining_products: remainingProducts,
        objectID: sku,
        index: indexName,
        queryID: algoliaQueryId ? algoliaQueryId : undefined
      })
    )
}

export function* reportProductAddedSaga(): SagaIterator {
  yield all([takeLatest(triggerReportProductAdded, doReportProductAddedSaga)])
}
