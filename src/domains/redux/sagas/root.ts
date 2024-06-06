import { all, fork } from 'redux-saga/effects'
import type { SagaIterator } from 'redux-saga'
import { pageSaga } from '~domains/page'
import { basketSaga } from '~domains/basket'
import { productSaga } from '~domains/product'
import { checkoutSaga } from '~domains/checkout'
import { accountSaga } from '~domains/account'
import { analyticsSaga } from '~domains/analytics'
import { promotionSaga } from '~domains/promotion'
import { yotpoSaga } from '~domains/yotpo'
import { recommendationsSaga } from '~domains/exponea'
import { brandSaga } from '~domains/brand'
import { pageFilterSaga } from '~domains/page-filter'
import { seoBlockSaga } from '~domains/seo'
import { favouritesSaga } from '~domains/favourites'
import { addressSaga } from '~domains/address'
import { menuSaga } from '~domains/menu'
import { socialSaga } from '~domains/social'
import { staticRecommendationSaga } from '~domains/static-recommendation'
import { expertSignaturesSaga } from '~domains/expert-signature'

const sagas = [
  pageSaga,
  basketSaga,
  promotionSaga,
  checkoutSaga,
  productSaga,
  accountSaga,
  analyticsSaga,
  yotpoSaga,
  recommendationsSaga,
  brandSaga,
  pageFilterSaga,
  seoBlockSaga,
  favouritesSaga,
  addressSaga,
  menuSaga,
  socialSaga,
  staticRecommendationSaga,
  expertSignaturesSaga
]

export function* rootSaga(): SagaIterator {
  yield all(sagas.map(fork))
}
