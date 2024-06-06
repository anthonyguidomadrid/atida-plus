import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, getContext, select, takeLatest, call } from 'redux-saga/effects'
import {
  defaultStorageMechanism,
  removeUndefinedPropertiesFromObject,
  cookieStorageMechanism
} from '~helpers'
import {
  selectOrderDetails,
  selectOrderId,
  selectOrderTemporaryBasket
} from '~domains/checkout'
import { getCategoriesPath } from '../helpers/getCategoriesPath'
import { Product } from '~domains/product'
import { triggerReportOrderCompleted } from '..'
import { getAlgoliaIndex } from '~domains/algolia'
import { StorageMechanism } from '~types/StorageMechanism'
import { PayloadProducts } from '~domains/checkout/types'
import { BasketCoupon } from '~domains/basket/types'
import {
  selectWasSuccess,
  selectNumberOfOrdersFromHistory
} from '~domains/account/selectors/order-history'
import {
  selectDefaultShippingAddressIsTaxExempt,
  selectCustomerEmail,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { ReportOrderCompleted } from '~domains/analytics/types'
import { checkIsFirstOrder } from '../helpers/checkIsFirstOrder'
import { getCustomerTokenName } from '~domains/account'

export function* doReportOrderCompletedSaga({
  payload
}: PayloadAction<ReportOrderCompleted>): SagaIterator {
  const { payment_method, is_redirected } = payload
  const orderId = yield select(selectOrderId)
  const locale: string = yield getContext('locale')
  const orderHistoryWasSuccess = yield select(selectWasSuccess)
  const numberOfOrdersFromHistory = yield select(
    selectNumberOfOrdersFromHistory
  )
  const isTaxExempt = yield select(selectDefaultShippingAddressIsTaxExempt)
  const isLoggedIn = yield select(selectIsLoggedIn)
  const customerEmail = yield select(selectCustomerEmail)

  const dataFromTemporaryBasket = yield select(selectOrderTemporaryBasket)
  const dataFromGetOrder = yield select(selectOrderDetails)
  const data = dataFromTemporaryBasket || dataFromGetOrder
  const indexName = getAlgoliaIndex(locale, 'productIndexes')
  const algoliaQueryIdStorageMechanism = defaultStorageMechanism() as StorageMechanism
  const algoliaQueryId = algoliaQueryIdStorageMechanism.get('algoliaQueryId')

  const storageMechanism = cookieStorageMechanism()
  const CUSTOMER_TOKEN_NAME = getCustomerTokenName()
  const customer = yield call(storageMechanism.get, CUSTOMER_TOKEN_NAME)
  const parsedCustomer = yield call(JSON.parse, customer ?? '{}')

  const products: PayloadProducts[] = []
  data?.items?.forEach(
    (
      item: {
        product: Product
        sku: string
        id: string
        unitPrice: number
        tax: number
        quantity: number
        url: string
        coupons?: BasketCoupon[]
        isPromo: boolean
      },
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
          variant: '', // TODO Add on Backend
          price:
            ((isTaxExempt ? item?.unitPrice : item?.unitPrice - item?.tax) ??
              0) / 100,
          quantity: item?.quantity,
          position: index + 1,
          url:
            item?.product?.url &&
            `https://atida.com/${locale}${item?.product?.url}`,
          image_url: item?.product?.largeImage,
          coupon: data?.coupons && data?.coupons[0]?.code,
          objectID: item?.sku,
          isPromo: item?.isPromo
        })
      )
    }
  )

  const revenue = (data?.grandTotal ?? 0) / 100

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Order Completed',
      removeUndefinedPropertiesFromObject({
        order_id: orderId,
        affiliation: orderId.substring(0, 2),
        email: customerEmail,
        total: revenue,
        revenue: revenue && revenue - (data?.taxTotal ?? 0) / 100,
        shipping: (data?.shippingTotal ?? 0) / 100,
        tax: (data?.taxTotal ?? 0) / 100,
        discount: (data?.discountTotal ?? 0) / 100,
        coupon: data?.coupons && data?.coupons[0]?.code,
        currency: data?.currency,
        products: products,
        index: indexName,
        queryID: algoliaQueryId,
        status: 'success',
        payment_method,
        is_first_order: checkIsFirstOrder({
          isLoggedIn,
          isRedirected: is_redirected,
          orderHistoryWasSuccess,
          numberOfOrdersFromHistory
        }),
        nonInteraction: 1,
        is_social: !!parsedCustomer.is_social,
        social_platform: parsedCustomer.social_platform
      })
    )
}

export function* reportOrderCompletedSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportOrderCompleted, doReportOrderCompletedSaga)
  ])
}
