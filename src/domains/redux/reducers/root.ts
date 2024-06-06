import { combineReducers } from '@reduxjs/toolkit'
import { translationsReducer as translations } from '~domains/translations'
import { pageReducer as page } from '~domains/page'
import { basketReducer as basket } from '~domains/basket'
import { promotionReducer as promotion } from '~domains/promotion'
import { productReducer as product } from '~domains/product'
import { checkoutReducer as checkout } from '~domains/checkout'
import { accountReducer as account } from '~domains/account'
import { recommendationsReducer as exponea } from '~domains/exponea'
import { brandReducer as brand } from '~domains/brand'
import { seoBlockReducer as seo } from '~domains/seo'
import { analyticsReducer as analytics } from '~domains/analytics'
import { favouritesReducer as favourites } from '~domains/favourites'
import { addressReducer as address } from '~domains/address'
import { menuReducer as menu } from '~domains/menu'
import { pageFilterReducer as pageFilter } from '~domains/page-filter'
import { socialReducer as social } from '~domains/social'
import { recommendationsReducer as staticRecommendation } from '~domains/static-recommendation'
import { expertSignatureReducer as expertSignature } from '~domains/expert-signature'

const server = combineReducers({
  translations,
  page,
  product,
  promotion,
  brand,
  seo,
  menu,
  pageFilter,
  staticRecommendation,
  expertSignature
})

const client = combineReducers({
  address,
  basket,
  checkout,
  account,
  exponea,
  analytics,
  favourites,
  social
})

export const rootReducer = combineReducers({ server, client })

export type RootState = ReturnType<typeof rootReducer>
