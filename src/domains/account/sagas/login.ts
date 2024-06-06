import type { PayloadAction } from '@reduxjs/toolkit'
import Router from 'next/router'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  select,
  takeLatest
} from 'redux-saga/effects'
import { StrictEffect } from '@redux-saga/types'

import { DEFAULT_LOGIN_REDIRECT } from '~config/constants/default-redirects'
import {
  triggerReportIdentifyUser,
  triggerReportUserInteraction
} from '~domains/analytics'
import { resetBasket } from '~domains/basket'
import { createClient, logger } from '~helpers'

import {
  loginClearError,
  loginClearNotification,
  loginFailure,
  loginFulfill,
  loginRequest,
  loginSetEmail,
  loginSuccess,
  loginTrigger,
  orderDetailsResetState,
  triggerReadCustomer
} from '../slices'
import {
  addFavouritesFulfill,
  selectAddFavouritesIsLoading
} from '~domains/favourites'
import type { CustomerToken, LoginTriggerPayload } from '../types'
import { AxiosResponse } from 'axios'
import {
  createMultiplePaymentsResetState,
  createOrderResetState,
  createPaymentMethodClearDetails,
  getOrderResetState,
  mbWayPaymentClearDetails,
  sibsMultibancoPaymentClearDetails
} from '~domains/checkout'
import { getErrorMessage } from '~helpers/error'
import { socialLoginResetErrors } from '~domains/social'

function* doLoginSaga({
  payload
}: PayloadAction<LoginTriggerPayload>): Generator<StrictEffect, void, any> {
  try {
    yield put(loginRequest())
    yield all([
      put(socialLoginResetErrors()),
      put(loginClearNotification()),
      put(loginClearError())
    ])
    yield put(loginSetEmail({ email: payload.email }))
    const locale = yield getContext('locale')
    const addFavouritesIsLoading: ReturnType<
      typeof selectAddFavouritesIsLoading
    > = yield select(selectAddFavouritesIsLoading)
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })

    const apiResponse: AxiosResponse<CustomerToken> = yield call(
      client.post,
      '/api/account/login',
      {
        email: payload.email,
        password: payload.password
      }
    )

    yield all([
      put(loginSuccess(apiResponse.data.messages ?? [{}])),
      put(resetBasket())
    ])
    if (
      typeof payload.redirect !== 'undefined' &&
      (payload.redirect?.includes('/confirmation/') ||
        payload.redirect?.includes('/unsuccessful/'))
    ) {
      yield all([
        put(createPaymentMethodClearDetails()),
        put(mbWayPaymentClearDetails()),
        put(sibsMultibancoPaymentClearDetails()),
        put(createMultiplePaymentsResetState()),
        put(createOrderResetState()),
        put(getOrderResetState()),
        put(orderDetailsResetState())
      ])
    }
    yield put(triggerReadCustomer())
    if (addFavouritesIsLoading) yield put(addFavouritesFulfill()) // This is used to manage the add to wishlist notification on the login page
    yield put(triggerReportIdentifyUser({ email: payload.email }))
    yield put(triggerReportUserInteraction({ event: 'Signed In' }))
    if (payload.redirect) {
      const pathAndQuery = payload.redirect?.split('?')
      const pathname = pathAndQuery[0]
      let query = {}

      if (pathAndQuery[1]) {
        query = pathAndQuery[1].split('&').reduce((memo, params) => {
          const keyVal = params.split('=')

          // @ts-ignore
          memo[keyVal[0]] = keyVal[1]

          return memo
        }, {})
      }

      Router.push({ pathname, query })
    } else {
      /* Default redirect
        Currently set to homepage
        Can be changed in the future to be my account area if required
      */
      Router.push(DEFAULT_LOGIN_REDIRECT)
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    Array.isArray(errorMessages)
      ? yield put(
          loginFailure({
            message: errorMessages[0]
          })
        )
      : yield put(
          loginFailure({
            message: getErrorMessage(error)
          })
        )
  } finally {
    yield put(loginFulfill())
  }
}

export function* loginSaga(): SagaIterator {
  yield put(triggerReadCustomer())
  yield all([takeLatest(loginTrigger, doLoginSaga)])
}
