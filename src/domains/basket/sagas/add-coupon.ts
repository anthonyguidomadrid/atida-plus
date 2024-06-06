import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  select,
  takeEvery
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  addCouponSuccess,
  addCouponFailure,
  addCouponTrigger,
  addCouponFulfill,
  addCouponRequest
} from '../slices'
import { AxiosResponse } from 'axios'
import { selectId } from '~domains/basket'
import type { PayloadAction } from '@reduxjs/toolkit'
import { triggerReportCouponAdded } from '~domains/analytics'
import { getErrorMessage } from '~helpers/error'

function* addCoupon({ payload }: PayloadAction<string | string[]>) {
  try {
    const locale: string = yield getContext('locale')
    const client = createClient({
      locale,
      addAnonymousCustomerUniqueId: true
    })
    const cartId: string = yield select(selectId)

    yield put(addCouponRequest())

    const apiResponse: AxiosResponse = yield call(
      client.post,
      '/api/basket/add-coupon',
      { cartId, coupon: payload }
    )

    yield put(addCouponSuccess(apiResponse.data))

    const coupon =
      typeof payload === 'string' &&
      [...apiResponse.data.coupons, ...apiResponse.data.cartCoupons].find(
        (voucher: { code: string }) =>
          voucher.code.toLowerCase() === payload.toLowerCase()
      )

    if (coupon) {
      yield put(triggerReportCouponAdded(coupon))
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        addCouponFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        addCouponFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(addCouponFulfill())
  }
}

export function* addCouponSaga(): SagaIterator {
  yield all([takeEvery(addCouponTrigger, addCoupon)])
}
