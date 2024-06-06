import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, getContext, select, takeLatest } from 'redux-saga/effects'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import {
  selectOrderDetails,
  selectOrderId,
  selectOrderTemporaryBasket
} from '~domains/checkout'
import { getCategoriesPath } from '../helpers/getCategoriesPath'
import { Product } from '~domains/product'
import { triggerReportProductOrdered } from '..'
import { getAlgoliaIndex } from '~domains/algolia'
import { checkIsFirstOrder } from '../helpers/checkIsFirstOrder'
import {
  selectWasSuccess,
  selectNumberOfOrdersFromHistory
} from '~domains/account/selectors/order-history'
import {
  selectDefaultShippingAddressIsTaxExempt,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { ReportOrderCompleted } from '~domains/analytics/types'

export function* doReportProductOrderedSaga({
  payload
}: PayloadAction<ReportOrderCompleted>): SagaIterator {
  const { payment_method, is_redirected } = payload
  const orderId = yield select(selectOrderId)
  const locale: string = yield getContext('locale')
  const orderHistoryWasSuccess = yield select(selectWasSuccess)
  const numberOfOrdersFromHistory = yield select(
    selectNumberOfOrdersFromHistory
  )

  const dataFromTemporaryBasket = yield select(selectOrderTemporaryBasket)
  const dataFromGetOrder = yield select(selectOrderDetails)
  const data = dataFromTemporaryBasket || dataFromGetOrder
  const indexName = getAlgoliaIndex(locale, 'productIndexes')
  const isTaxExempt = yield select(selectDefaultShippingAddressIsTaxExempt)
  const isLoggedIn = yield select(selectIsLoggedIn)

  data?.items?.forEach(
    (
      item: {
        product: Product
        sku: string
        unitPrice: number
        unitPriceToPayAggregation: number
        tax: number
        quantity: number
        url: string
        discount: number
        id: string
        isPromo: boolean
      },
      index: number
    ) => {
      const itemCategories = getCategoriesPath(item?.product?.categories)

      typeof analytics !== 'undefined' &&
        analytics.track(
          'Product Ordered',
          removeUndefinedPropertiesFromObject({
            currency: data?.currency,
            discount: (item.discount ?? 0) / 100,
            payment_method,
            index: indexName,
            is_first_order: checkIsFirstOrder({
              isLoggedIn,
              isRedirected: is_redirected,
              orderHistoryWasSuccess,
              numberOfOrdersFromHistory
            }),
            objectID: item?.sku,
            order_id: orderId,
            brand: item?.product?.brand?.label,
            category: itemCategories,
            image_url: item?.product?.largeImage,
            name: item?.product?.name,
            position: index + 1,
            price:
              ((isTaxExempt ? item.unitPrice : item.unitPrice - item.tax) ??
                0) / 100,
            product_id: item?.id,
            quantity: item?.quantity,
            sku: item?.sku,
            url:
              item?.product?.url &&
              `https://atida.com/${locale}${item?.product?.url}`,
            variant: '', // TODO Add on Backend
            revenue:
              ((isTaxExempt
                ? item.unitPriceToPayAggregation
                : item.unitPriceToPayAggregation - item.tax) * item.quantity ??
                0) / 100,
            tax: (item.tax ?? 0) / 100,
            private_label: '', // TODO Add on Backend
            isPromo: item?.isPromo
          })
        )
    }
  )
}

export function* reportProductOrderedSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportProductOrdered, doReportProductOrderedSaga)
  ])
}
