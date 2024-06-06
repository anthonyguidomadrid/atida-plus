import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, getContext, select, takeLeading } from 'redux-saga/effects'
import {
  defaultStorageMechanism,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { triggerReportProductClicked } from '..'
import { ReportProductClickedLoad } from '../types'
import { getAlgoliaIndex } from '~domains/algolia'
import { getCategoriesPath } from '../helpers/getCategoriesPath'
import { StorageMechanism } from '~types/StorageMechanism'
import { selectId, selectItems } from '~domains/basket'
import { BasketItem } from '~domains/basket/types'
import { Product } from '~domains/product'

export function* doReportProductClickedSaga({
  payload
}: PayloadAction<ReportProductClickedLoad>): SagaIterator {
  const {
    product,
    positionInTheList,
    basketQuantity,
    list_id,
    recommendation_id
  } = payload

  const basketId = yield select(selectId)
  const locale: string = yield getContext('locale')
  const indexName = getAlgoliaIndex(locale, 'productIndexes')
  const itemCategories: string | undefined = getCategoriesPath(
    product?.categories
  )
  const algoliaQueryIdStorageMechanism = defaultStorageMechanism() as StorageMechanism
  const algoliaQueryId = algoliaQueryIdStorageMechanism.get('algoliaQueryId')

  const price = basketQuantity
    ? product.price?.value && product?.price?.value / 100 / basketQuantity
    : product.price?.value && product?.price?.value / 100

  const basketItems: (BasketItem & {
    product: Omit<Partial<Product>, 'sku' | 'price'>
  })[] = yield select(selectItems)

  const productInBasket = basketItems.find(item => item.sku === product.sku)

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Product Clicked',
      removeUndefinedPropertiesFromObject({
        product_id: product?.sku,
        sku: product?.sku,
        category: itemCategories,
        list_id,
        name: product?.name,
        brand: product?.brand?.label,
        brand_code: product?.brand?.code,
        format: product?.format?.label,
        format_code: product?.format?.code,
        price,
        rrp_price: product?.rrp?.value && product.rrp.value / 100,
        currency: product?.price?.currency,
        quantity: 1,
        position: positionInTheList,
        url: product?.url && window.location.origin + product?.url,
        image_url: product?.largeImage,
        objectID: product?.sku,
        queryID: algoliaQueryId,
        index: indexName,
        cart_id: basketId,
        isPromo: productInBasket?.isPromo,
        ...(recommendation_id && {
          recommendation_id
        })
      })
    )
}

export function* reportProductClickedSaga(): SagaIterator {
  yield all([
    takeLeading(triggerReportProductClicked, doReportProductClickedSaga)
  ])
}
