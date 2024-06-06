import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { addToBasketSaga } from './add-to-basket'
import { addSeveralToBasketSaga } from './add-several-to-basket'
import { getBasketSaga } from './get-basket'
import { removeFromBasketSaga } from './remove-from-basket'
import { changeItemQuantitySaga } from './change-item-quantity'
import { addCouponSaga } from './add-coupon'
import { removeCouponSaga } from './remove-coupon'
import { addPrescriptionToBasketSaga } from './add-prescription-to-basket'

export function* basketSaga(): SagaIterator {
  yield all(
    [
      addToBasketSaga,
      addSeveralToBasketSaga,
      removeFromBasketSaga,
      changeItemQuantitySaga,
      getBasketSaga,
      addCouponSaga,
      addPrescriptionToBasketSaga,
      removeCouponSaga
    ].map(fork)
  )
}
