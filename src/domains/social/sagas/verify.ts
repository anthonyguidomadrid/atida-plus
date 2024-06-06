import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  socialLoginResetDetails,
  socialVerifyFailure,
  socialVerifyFulfill,
  socialVerifyRequest,
  socialVerifySuccess,
  socialVerifyTrigger
} from '../slices'
import { getErrorMessage } from '~helpers/error'
import { triggerReadCustomer } from '~domains/account'
import { SocialVerifyPayload } from '../types'
import { resetBasket } from '~domains/basket'
import { triggerReportUserInteraction } from '~domains/analytics'

function* doSocialVerifySaga({ payload }: PayloadAction<SocialVerifyPayload>) {
  try {
    yield put(socialVerifyRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
    yield call(client.post, `/api/social/verify`, { ...payload })
    yield all([put(socialVerifySuccess()), put(resetBasket())])
    yield put(socialLoginResetDetails())
    yield put(triggerReadCustomer())
    yield all([
      put(
        triggerReportUserInteraction({
          event: 'Signed In',
          is_social: true,
          social_platform: payload.serviceType
        })
      )
    ])
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      socialVerifyFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(socialVerifyFulfill())
  }
}

export function* socialVerifySaga(): SagaIterator {
  yield put(triggerReadCustomer())
  yield all([takeLatest(socialVerifyTrigger, doSocialVerifySaga)])
}
