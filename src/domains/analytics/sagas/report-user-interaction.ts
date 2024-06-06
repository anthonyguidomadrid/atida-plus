import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportUserInteractions, ReportAccountType } from '../types'
import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLatest } from 'redux-saga/effects'
import { triggerReportUserInteraction } from '..'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import {
  selectCustomerReference,
  selectHasPreviousSuccessfulOrder
} from '~domains/account/selectors/customer'
import { analyticsIdentifyCompletedChannel } from './channels'

export function* doReportUserInteractionSaga({
  payload
}: PayloadAction<ReportUserInteractions & ReportAccountType>): SagaIterator {
  const { event } = payload
  yield take(analyticsIdentifyCompletedChannel)
  const userId = yield select(selectCustomerReference)
  const hasPreviousSuccessfulOrder = yield select(
    selectHasPreviousSuccessfulOrder
  )

  typeof analytics !== 'undefined' &&
    analytics.track(
      event, // Signed In, Signed Out or Account Created
      removeUndefinedPropertiesFromObject({
        user_id: userId,
        is_existing_customer:
          event === 'Signed In' ? hasPreviousSuccessfulOrder : undefined,
        is_social: !!payload.is_social,
        social_platform:
          (payload.social_platform && payload.social_platform.toLowerCase()) ??
          '',
        ...(payload.account_type && { account_type: payload.account_type })
      }),
      {},
      () => {
        if (event === 'Signed Out') analytics.reset()
      }
    )
}

export function* reportUserInteractionSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportUserInteraction, doReportUserInteractionSaga)
  ])
}
