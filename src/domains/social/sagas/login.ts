import { ACCOUNT_TYPE_PERSONAL } from './../../../config/constants/account-types'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  delay,
  getContext,
  put,
  race,
  select,
  take,
  takeLatest
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  socialLoginFailure,
  socialLoginFulfill,
  socialLoginRequest,
  socialLoginSuccess,
  socialLoginTrigger
} from '../slices'
import { getErrorMessage } from '~helpers/error'
import {
  CustomerToken,
  getCustomerTrigger,
  triggerReadCustomer,
  triggerShowCustomerNotification
} from '~domains/account'
import { SocialLoginAndSignUpServiceTypes } from '~components/atoms/SocialLoginAndSignUp'
import { resetBasket } from '~domains/basket'
import {
  selectCustomerEmail,
  selectCustomerReference
} from '~domains/account/selectors/customer'
import {
  triggerReportAccountCreatedAttempted,
  triggerReportEmailSubscription,
  triggerReportIdentifyUser,
  triggerReportUserInteraction
} from '~domains/analytics'
import { AxiosResponse } from 'axios'
import getConfig from 'next/config'
import { customerSlice } from '~domains/account/slices/customer'

function* doSocialLoginSaga({
  payload
}: PayloadAction<{
  code: string
  serviceType: SocialLoginAndSignUpServiceTypes
}>) {
  try {
    const { publicRuntimeConfig } = getConfig()
    yield put(socialLoginRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
    const redirectUri = `${publicRuntimeConfig.host}/${publicRuntimeConfig.socialAuthenticate.redirectUri}`
    const apiResponse: AxiosResponse<CustomerToken> = yield call(
      client.post,
      `/api/social/login`,
      { ...payload, redirectUri }
    )
    if (
      apiResponse.data?.social &&
      apiResponse.data?.social?.needsVerification
    ) {
      yield put(
        socialLoginSuccess({
          ...apiResponse.data,
          redirectUri,
          serviceType: payload.serviceType
        })
      )
    } else {
      const isNew = apiResponse?.data?.social?.isNew
      yield all([
        put(socialLoginSuccess()),
        put(resetBasket()),
        put(triggerReadCustomer())
      ])
      yield put(
        triggerReportUserInteraction({
          event: apiResponse?.data?.social?.isNew
            ? 'Account Created'
            : 'Signed In',
          is_social: true,
          social_platform: payload.serviceType.toLowerCase(),
          ...(apiResponse?.data?.social?.isNew && {
            account_type: ACCOUNT_TYPE_PERSONAL
          })
        })
      )
      if (isNew) {
        yield put(triggerShowCustomerNotification())
        yield put(
          triggerReportAccountCreatedAttempted({
            is_social: true,
            social_platform: payload.serviceType.toLowerCase(),
            account_type: ACCOUNT_TYPE_PERSONAL
          })
        )
      }
      // Email dependant actions. If no customer reference or email after 5 seconds, it continues
      yield race({
        readCustomer: take(customerSlice.actions.readCustomer.type.toString()),
        timeout: delay(5000)
      })
      const ref: string = yield select(selectCustomerReference)
      yield put(getCustomerTrigger({ customerReference: ref }))
      yield race({
        getCustomerSuccess: take(customerSlice.actions.success.type.toString()),
        timeout: delay(5000)
      })
      const email: string = yield select(selectCustomerEmail)
      if (email) {
        yield put(
          triggerReportIdentifyUser({
            email
          })
        )
        if (isNew) {
          yield put(
            triggerReportEmailSubscription({
              email,
              subscribed_from: 'account_creation',
              email_list: 'newsletter'
            })
          )
        }
      }
    }
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      socialLoginFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(socialLoginFulfill())
  }
}

export function* socialLoginSaga(): SagaIterator {
  yield all([takeLatest(socialLoginTrigger, doSocialLoginSaga)])
}
