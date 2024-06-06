import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  select,
  takeLatest
} from 'redux-saga/effects'
import {
  createClient,
  logger,
  cookieStorageMechanism,
  defaultStorageMechanism
} from '~helpers'
import { getUUIDName } from '~domains/account'
import {
  logoutFailure,
  logoutFulfill,
  logoutRequest,
  logoutSuccess,
  logoutTrigger,
  clearDataCustomer
} from '../slices'
import type { LogoutTriggerPayload } from '../types'
import { DEFAULT_LOGOUT_REDIRECT } from '~config/constants/default-redirects'
import { StorageMechanism } from '~types/StorageMechanism'
import {
  triggerReportIdentifyUser,
  triggerReportUserInteraction
} from '~domains/analytics'
import { selectCustomerDetails } from '~domains/account/selectors/customer'
import { getCustomerTokenName } from '../helpers'
import { getErrorMessage } from '~helpers/error'

function* doLogoutSaga({ payload }: PayloadAction<LogoutTriggerPayload>) {
  try {
    yield put(logoutRequest())
    const locale: string = yield getContext('locale')
    const anonymousCustomerUniqueIdStorageMechanism = defaultStorageMechanism() as StorageMechanism
    const cookieStorage = cookieStorageMechanism() as StorageMechanism

    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
    const UUIDName = getUUIDName(locale)
    const customerDetails: ReturnType<
      typeof selectCustomerDetails
    > = yield select(selectCustomerDetails)

    yield call(client.post, '/api/account/logout')

    yield all([
      call(anonymousCustomerUniqueIdStorageMechanism.remove, UUIDName),
      call(cookieStorage.remove, getCustomerTokenName())
    ])
    yield put(clearDataCustomer())
    yield put(triggerReportIdentifyUser({ email: customerDetails?.email }))
    yield put(
      triggerReportUserInteraction({
        event: 'Signed Out'
      })
    )
    yield put(logoutSuccess())
    if (typeof window !== 'undefined') {
      yield put(logoutFulfill())
      yield (window.location.href = payload ? payload : DEFAULT_LOGOUT_REDIRECT)
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        logoutFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        logoutFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(logoutFulfill())
  }
}

export function* logoutSaga(): SagaIterator {
  yield all([takeLatest(logoutTrigger, doLogoutSaga)])
}
