import type { AnyAction, EnhancedStore, Middleware } from '@reduxjs/toolkit'
import { GetServerSidePropsContext } from 'next'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { ElasticSearchUrlMapRecord } from '~domains/page'
import {
  contentTrigger,
  contentFulfill,
  selectProductMainCategory
} from '~domains/product'
import { RootState } from '~domains/redux'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getBrandFulfill, getBrandTrigger } from '~domains/brand'
import {
  expertSignatureFulfill,
  expertSignatureTrigger
} from '~domains/expert-signature'
import { getCookie } from '~helpers/server-only/cookie'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'
import { SessionChannelType } from '~domains/basket/types'

export const getProductDataProps = async (
  _context: GetServerSidePropsContext,
  store: EnhancedStore<RootState, AnyAction, Middleware<RootState>[]>,
  record?: ElasticSearchUrlMapRecord
): Promise<Record<string, unknown>> => {
  const sessionChannelCookie = getCookie(_context.req, getSessionChannelName())
  const sessionChannel =
    sessionChannelCookie !== ''
      ? (JSON.parse(sessionChannelCookie) as SessionChannelType)
      : undefined
  store.dispatch(contentTrigger({ sku: record?.identifier, sessionChannel }))

  const featureFlags = await loadFeatureFlags(_context.locale, [
    FeatureFlag.PRODUCT_PDP_PRODUCT_MEDIA_GALLERY,
    FeatureFlag.PRODUCT_PDP_PROMO_INFORMATION_BOX,
    FeatureFlag.PRODUCT_PDP_ADD_TO_BASKET_CONTROLS_NEW_QUANTITY_SELECTOR,
    FeatureFlag.PRODUCT_PDP_STICKY_ADD_TO_BASKET_CONTROLS,
    FeatureFlag.PDP_RECOMMENDATIONS_BLOCK_IS_UNDER_REVIEWS,
    FeatureFlag.BASKET_NOTIFICATION,
    FeatureFlag.PDP_FREQUENTLY_BOUGHT_TOGETHER,
    FeatureFlag.PDP_SIMILAR_PRODUCTS,
    FeatureFlag.PRODUCT_BACK_IN_STOCK_ENABLED,
    FeatureFlag.PRODUCT_PDP_SHOW_SAVINGS,
    FeatureFlag.PDP_TOOLTIP_PROMOTION_INFO,
    FeatureFlag.PRODUCT_PDP_SHOW_SCARCITY_MESSAGE,
    FeatureFlag.PRODUCT_PDP_PRODUCT_SCARCITY_THRESHOLD,
    FeatureFlag.EXPERIMENT_PDP_SHOW_SAVING_PERCENTAGE,
    FeatureFlag.PDP_LOYALTY_INFO,
    FeatureFlag.PRODUCT_PDP_FETCH_SINGLE_BRAND,
    FeatureFlag.SHOPPING_SHOW_OUR_RECOMMENDATIONS_BEFORE_FBT,
    FeatureFlag.PRODUCT_ON_DEMAND_INFO,
    FeatureFlag.SEO_ADD_NOINDEX_TO_ON_DEMAND_PRODUCTS,
    FeatureFlag.PDP_ALL_NEW_PDP,
    FeatureFlag.PDP_IMPORTANT_INFO_COMPONENT,
    FeatureFlag.PDP_SELECTOR_GERMANY_PDP_TYPE,
    FeatureFlag.PDP_SHOW_GERMAN_PRODUCT_DETAILS,
    FeatureFlag.PDP_REVIEW_POLICY
  ])

  const fetchSingleBrand =
    featureFlags?.[FeatureFlag.PRODUCT_PDP_FETCH_SINGLE_BRAND]

  if (!fetchSingleBrand) {
    store.dispatch(getBrandTrigger())
    await Promise.all([
      store.dispatch({
        type: 'product',
        [WAIT_FOR_ACTION]: contentFulfill().type
      }),
      store.dispatch({
        type: 'brands',
        [WAIT_FOR_ACTION]: getBrandFulfill().type
      })
    ])
  } else {
    await store.dispatch({
      type: 'product',
      [WAIT_FOR_ACTION]: contentFulfill().type
    })
  }

  const productMainCategory = await selectProductMainCategory(store.getState())

  if (productMainCategory !== undefined) {
    store.dispatch(
      expertSignatureTrigger({
        categoryId: productMainCategory
      })
    )

    await store.dispatch({
      type: 'expert-signature',
      [WAIT_FOR_ACTION]: expertSignatureFulfill().type
    })
  }

  return {
    featureFlags
  }
}
