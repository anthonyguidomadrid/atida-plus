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
  removeCouponTrigger,
  removeCouponFailure,
  removeCouponSuccess,
  removeCouponFulfill,
  removeCouponRequest
} from '../slices'
import { AxiosResponse } from 'axios'
import { selectId } from '~domains/basket'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage } from '~helpers/error'

function* removeCoupon({ payload }: PayloadAction<string>) {
  try {
    const locale: string = yield getContext('locale')
    const client = createClient({
      locale,
      addAnonymousCustomerUniqueId: true
    })
    const cartId: string = yield select(selectId)

    yield put(removeCouponRequest())

    const apiResponse: AxiosResponse = yield call(
      client.delete,
      '/api/basket/remove-coupon',
      {
        data: {
          cartId,
          coupon: payload
        }
      }
    )
    yield put(removeCouponSuccess(apiResponse.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        removeCouponFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        removeCouponFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(removeCouponFulfill())
  }
}

export function* removeCouponSaga(): SagaIterator {
  yield all([takeEvery(removeCouponTrigger, removeCoupon)])
}
